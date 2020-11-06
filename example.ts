
orchestrator.registerScenario('invalid instance', async s => {
  const conductorConfig = {
    // yaml info
  }
  const initialization = [
    {
      id: 'holo-hosting',
      agentId: 'holo-hosting-agent',
      dnas: [
        {
          path: 'path/to/hha.dna.gz',
          nick: 'hosting:hha',  // TODO: this could be autogenerated
          properties: {},
          // membrane_proof: Buffer.alloc(0),
        },
        {
          path: 'path/to/holofuel.dna.gz',
          nick: 'hosting:holofuel',  // TODO: this could be autogenerated
          properties: {},
          // membrane_proof: Buffer.alloc(0),
        }
      ]
    },
    {
      id: 'self-hosted-chat-1',
      agentId: 'holo-hosting-agent',  // NB: same agent
      dnas: [
        {
          nick: 'hosting:chat',  // TODO: this could be autogenerated
          path: 'path/to/elemental-chat.dna.gz',
          properties: {},
          // membrane_proof: Buffer.alloc(0),
        }
      ]
    },
    {
      id: 'self-hosted-chat-2',
      agentId: 'another-agent',  // NB: different agent
      dnas: [
        {
          nick: 'another:chat',  // TODO: this could be autogenerated
          path: 'path/to/elemental-chat.dna.gz',
          properties: {},
          // membrane_proof: Buffer.alloc(0),
        }
      ]
    },
  ]

  // this is sugar, where the key becomes the playerName (as it was before)
  const playerConfigs1 = {
    hp1: conductorConfig,
    hp2: conductorConfig,
    hp3: conductorConfig,
  }

  const playerConfigs2 = {
    hp4: conductorConfig,
    hp5: conductorConfig,
  }

  // initialize 3 players, spawn them with playerConfig
  const { hp1, hp2, hp3 } = await s.players(playerConfigs1, {
    installApps: initialization,
    spawn: true,  // default
  })

  // create two players, unspawned
  const { hp4, hp5 } = await s.players(playerConfigs2, {
    installApps: null,
    spawn: false,
  })

  // A
  await hp4.spawn()
  await hp4.installApps(initialization)

  // B
  await hp4.spawn({ initialization })

  await hp5.spawn()
  await hp5.installApp(initialization[0])
})

