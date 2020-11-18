# tryorama

An end-to-end/scenario testing framework for Holochain applications, written in TypeScript.

[![Project](https://img.shields.io/badge/project-holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Chat](https://img.shields.io/badge/chat-chat%2eholochain%2enet-blue.svg?style=flat-square)](https://chat.holochain.net)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)


Tryorama allows you to write test suites about the behavior of multiple Holochain nodes which are networked together, while ensuring that test nodes in different tests do not accidentally join a network together.

```bash
npm install @holochain/tryorama
```

Take a look at the sample below, or skip to the [Conceptual Overview](#conceptual-overview) for a more in depth look.

## Sample usage

Check out this heavily commented example for an idea of how to use tryorama

You can also check out the [example](./example) folder.

```javascript
import { Orchestrator, Config, InstallAgentsHapps } from '@holochain/tryorama'
import path from 'path'

// Set up a Conductor configuration using the handy `Conductor.config` helper.
// Read the docs for more on configuration.
const conductorConfig = Config.gen()

// Construct proper paths for your DNAs
const testDna = path.join(__dirname, 'test.dna.gz')
const dnaBlog = path.join(__dirname, 'blog.dna.gz')
const dnaChat = path.join(__dirname, 'chat.dna.gz')

// create an InstallAgentsHapps array with your DNAs to tell tryorama what
// to install into the conductor.
const installation: InstallAgentsHapps = [
  // agent 0
  [
    // happ 0
    [testDna] // contains 1 dna, the "test" dna
  ]
  // agent 1
  [
    // happ 0
    [dnaBlog], // contains 1 dna, the blog dna
    // happ 1
    [dnaChat] // contains 1 dna, the chat dna
  ],
]

// Set up a Conductor configuration using the handy `Conductor.config` helper.
// Read the docs for more on configuration.
const conductorConfig = Config.gen()

// Instatiate your test's orchestrator.
// It comes loaded with a lot default behavior which can be overridden, including:
// * custom conductor startup
// * custom test result reporting
// * scenario middleware, including integration with other test harnesses
const orchestrator = new Orchestrator()

// Register a scenario, which is a function that gets a special API injected in
orchestrator.registerScenario('proper zome call', async (s, t) => {
  // Declare two players using the previously specified config, nicknaming them "alice" and "bob"
  // note that the first argument to players is just an array conductor configs that that will
  // be used to spin up the conductor processes which are returned in a matching array.
  const [alice, bob] = await s.players([conductorConfig, conductorConfig])

  // install your happs into the coductors and destructuring the returned happ data using the same
  // array structure as you created in your installation array.
  const [
    [alice_test_happ],
    [alice_blog_happ, alice_chat_happ]
  ] = await alice.installAgentsHapps(installation)
  const [
    [bob_test_happ],
    [bob_blog_happ, bob_chat_happ]
  ] = await bob.installAgentsHapps(installation)

  // then you can start making zome calls either on the cells in the order in which the dnas
  // where defined, with params: zomeName, fnName, and arguments:
  const res = await alice_blog_happ.cells[0].call('messages', 'list_messages', {})

  // or you can destructure the cells for more semantic references (this is most usefull
  // for multi-dna happs):
  const [bobs_blog_cell] = bob_blog_happ.cells
  const res = await bobs_blog_cell.call('blog', 'post', {body:'hello world'})

  // You can create players with unspawned conductors by passing in false as the second param:
  const [carol] = await s.players([conductorConfig], false)

  // and then start the conductor for them explicitly with:
  await carol.startup()

  // and install a single happ
  const carol_blog_happ = await carol.installHapp([dnaBlog])
  // or a happ with a previously generated key
  const carol_test_happ_with_bobs_test_key = await carol.installHapp([dnaTest], bob_blog_happ.agent)

  // You can also shutdown conductors:
  await alice.shutdown()
  // ...and re-start the same conductor you just stopped
  await alice.startup()

  // and you can make assertions using tape by default
  const messages = await bobs_blog_cell.call('messages', 'list_messages', {})
  t.equal(messages.length, 1)
})

// Run all registered scenarios as a final step, and gather the report,
// if you set up a reporter
const report = await orchestrator.run()

// Note: by default, there will be no report
console.log(report)
```

### How to set networking:

To set networking add it as a commonConfig in gen()

#### Exampe of use for  TransportConfigType `Proxy`
```javascript=
const network = {
  transport_pool: [{
    type: TransportConfigType.Proxy,
    sub_transport: {type: TransportConfigType.Quic},
    proxy_config: {
      type: ProxyConfigType.LocalProxyServer,
      proxy_accept_config: ProxyAcceptConfig.AcceptAll
    }
  }],
  bootstrap_service: "https://bootstrap.holo.host"
}
Config.gen({network})
```
#### Exampe of use for TransportConfigType `Quic`
```javascript=
const network = {
  transport_pool: [{
    type: TransportConfigType.Quic,
  }],
  bootstrap_service: "https://bootstrap.holo.host"
}
Config.gen({network})
```

#### Exampe of use for TransportConfigType `Mem`
```javascript=
const network = {
  transport_pool: [{
    type: TransportConfigType.Mem,
  }]
}
Config.gen({network})
```

# Conceptual overview

To understand Tryorama is to understand its components. Tryorama is a test *Orchestrator* for writing tests about the behavior of multiple Holochain nodes which are networked together. It allows the test writer to write *Scenarios*, which specify a fixed set of actions taken by one or more *Players*, which represent Holochain nodes that may come online or offline at any point in the scenario. Actions taken by Players include making zome calls and turning on or off their Holochain Conductor.

## Orchestrators

Test suites are defined with an `Orchestrator` object. For most cases, you can get very far with an out-of-the-box orchestrator with no additional configuration, like so:

```typescript
import {Orchestrator} from '@holochain/tryorama'
const orchestator = new Orchestrator()
```

The Orchestrator constructor also takes a few parameters which allow you change modes, and in particular allows you to specify Middleware, which can add new features, drastically alter the behavior of your tests, and even integrate with other testing harnesses. We'll get into those different options later.

The default Orchestrator, as shown above, is set to use the local machine for test nodes, and integrates with the [`tape` test harness](https://github.com/substack/tape). The following examples will assume you've created a default orchestrator in this way.

## Scenarios

A Tryorama test is called a *scenario*. Each scenario makes use of a simple API for creating Players, and by default includes an object for making [tape assertions](https://github.com/substack/tape#methods), like `t.equal()`. Here's a very simple scenario which demonstrates the use of both objects.

```typescript

// `s` is an instance of the Scenario API
// `t` is the tape assertion API
orchestrator.registerScenario('description of this scenario', async (s, t) => {
  const config = Config.gen()
  // Use the Scenario API to create two players, alice and bob (we'll cover this more later)
  const [alice, bob] = await s.players([config, config])

  // install happs in the conductors
  const [[the_happ]] = await alice.installAgentsHapps(installation)

  // make a zome call
  const result = await the_happ.cells[0].call('some-zome', 'some-function', 'some-parameters')

  // make a test assertion with tape
  t.equal(result.Ok, 'the expected value')
})
```

Each scenario will automatically shutdown all running conductors as well as automatically end the underlying tape test (no need to run `t.end()`).

## Players

A Player represents a Holochain user running a Conductor. That conductor will run on the same machine as the Tryorama test orchestrator. Either way, the main concern in configuring a Player is providing configuration and initialization for its underlying Conductor.

# Conductor setup

Much of the purpose of Tryorama is to provide ways to setup conductors for tests, which means generating their boot configuration files, and initializing them to known states (installing hApps) for scenarios.

## Goals
1. Common setups should be easy to generate
2. Any conductor setups should be possible
3. Conductors from different scenarios must remain independent and invisible to each other

Setting up a conductor for a test consists of two main parts:
1. Creating a conductor config and starting it up
2. Installing hApps into the running conductor

## Conductor Configuration
You don't have to think about conductor configuration (networking, bootstrap server, lair directory etc) if you don't want to by simply using the `Config.gen()` helper:

``` js
const config = Config.gen()
orchestrator.registerScenario('my scenario dnas', async (s: ScenarioApi, t) => {
  const [alice] = await s.players([config])
}
```

## Happ Installation

Tryoroma's provides the `InstallAgentsHapps` abstraction to making it simple to install any combination of hApps and create agents for them with minimal configuration file building naming.  `InstallAgentsHapps` does this as an agents/happ/dna tree just using DNA paths as the leaves of a nested array.

A simple example:

``` js
const installation: InstallAgentsHapps = [
  // agent 0 ... ) a unique agent key will be generated that will be shared by any happs, and cells under this
  [
    // happ 0
    [
      // dna 0
      path.join(__dirname, 'test.dna.gz')
    ]
  ],
]
```

When this installation is passed into the player `installAgentsHapps` function, what's returned is an identically structured array of installed happs, where tryorama takes care of generating all the agent Ids, happ Ids and cell nicks, so you don't have to manually do that work in a config file, you can simply destructure the results into variables with semantic names relevant to your tests.  E.g, from the initialization above:

``` js
  const [[test_happ]] = await alice.installAgentsHapps(initialization)
```
where `test_happ` is an `InstalledHapp` object that looks like this:

``` js
export type InstalledHapp = {
  hAppId: string,
  // the agent shared by all the Cell instances in `.cells`
  agent: AgentPubKey
  // the instantiated cells, which allow
  // for actual zome calls
  cells: Cell[]
}
```

### Advanced Usage 

```javascript
// for complete control, i.e. if you need to add properties or a membrane-proof to
// you can also install a happ using the holochain-conductor-app InstallAppRequest data structure:
import { InstallAppRequest } from '@holochain/conductor-api'
import * as msgpack from '@msgpack/msgpack';

orchestrator.registerScenario('description of this scenario', async (s, t) => {
  const config = Config.gen()
  // Use the Scenario API to create two players, alice and bob (we'll cover this more later)
  const [alice, bob] = await s.players([config, config])

  const req: InstallAppRequest = {
    app_id: `my_app`,
    agent_key: await carol.admin().generateAgentPubKey(),
    dnas: [{
      path: path.join(__dirname, 'my_app.dna.gz'),
      nick: `my_cell_nick`,
      properties: Array.from(msgpack.encode({my_property:"override_default_value"})),
      membrane_proof: Array.from(msgpack.encode({role:"steward", signature:"..."})),
    }]
  }
  const installedHapp = await carol._installHapp(req)
})
```

# License
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

Copyright (C) 2019-2020, Holochain Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
