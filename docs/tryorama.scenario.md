<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [Scenario](./tryorama.scenario.md)

## Scenario class

An abstraction of a test scenario to write tests against Holochain hApps, running on a local conductor.

<b>Signature:</b>

```typescript
export declare class Scenario implements IScenario 
```
<b>Implements:</b> [IScenario](./tryorama.iscenario.md)

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(options)](./tryorama.scenario._constructor_.md) |  | Scenario constructor. |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [conductors](./tryorama.scenario.conductors.md) |  | [Conductor](./tryorama.conductor.md)<!-- -->\[\] |  |
|  [uid](./tryorama.scenario.uid.md) |  | string |  |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [addConductor(signalHandler)](./tryorama.scenario.addconductor.md) |  | Create and add a conductor to the scenario. |
|  [addPlayersWithHappBundles(playersHappBundles)](./tryorama.scenario.addplayerswithhappbundles.md) |  | Create and add multiple players to the scenario, with a hApp bundle installed for each player. |
|  [addPlayersWithHapps(agentHappOptions)](./tryorama.scenario.addplayerswithhapps.md) |  | Create and add multiple players to the scenario, with a set of DNAs installed for each player. |
|  [addPlayerWithHapp(agentHappOptions)](./tryorama.scenario.addplayerwithhapp.md) |  | Create and add a single player to the scenario, with a set of DNAs installed. |
|  [addPlayerWithHappBundle(appBundleSource, options)](./tryorama.scenario.addplayerwithhappbundle.md) |  | Create and add a single player to the scenario, with a hApp bundle installed. |
|  [cleanUp()](./tryorama.scenario.cleanup.md) |  | Shut down and delete all conductors in the scenario. |
|  [shareAllAgents()](./tryorama.scenario.shareallagents.md) |  | Register all agents of all passed in conductors to each other. This skips peer discovery through gossip and thus accelerates test runs. |
|  [shutDown()](./tryorama.scenario.shutdown.md) |  | Shut down all conductors in the scenario. |
