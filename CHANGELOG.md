# Changelog
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [UNRELEASED]

## [0.2.0]

### Added

- `spawnRemote` added for remotely spawning a conductor via TryCP
- added `dumbWaiter` middleware, which bypasses the Hachiko waiter and causes `s.consistency()` to simply wait for a specified delay
- added `scenarioName` to ConfigSeedArgs, making it possible to use this value in custom conductor configurations
- `makeRemoteConfigSeedArgs` added for creating config generation args obtained from a remote machine
- added `mode` orchestrator config option as a more ergonomic alternative to manually specifying middlewares

### Changed

- **BREAKING**: `globalConfig` argument to Orchestrator is no more. Now this data gets passed into the second argument of the `Config.gen` helper method. See README.
- **BREAKING**: Middlewares now compose in the reverse order! ([fb1e95ef](https://github.com/holochain/tryorama/commit/fb1e95ef78c9025c857310c7ea403c27a07ad42b))
- **BREAKING**: The fundamental structure of `s.players()` config has changed. If using middleware, you must include either `localOnly` or `machinePerPlayer` middleware to convert the player config into the correct structure, or you must manually specify the local or remote machines your tests will run on. See README.
- Orchestrator includes `tapeExecutor` and `localOnly` middleware by default if none specified
- `ConfigSeedArgs` now includes `baseUrl` along with ports, to facilitate remote connections to other than localhost
- `SpawnConductorFn` signature has changed. Now it takes a `Player` and some user data, and returns a fully constructed `Conductor`
- `SpawnConductorFn` now is expected to handle awaiting the Conductor's readiness for websocket connections. Previously that was handled internally during `player.spawn`
- Various internal names have changed, like GenConfigFn -> ConfigSeed
- `player.spawn()` now takes a user-defined argument which gets passed to the spawnConductor function.
- Optional `player.spawn()` function argument now becomes `{handleHook}` in the context of the `spawnConductorLocal` function



## [0.1.2] - 2019-10-17

### Added

- `s.players()` can now accept an array of configs and will return an array of Players. Passing an object of configs has the same effect as previously
- There is now an `Instance` object which represents an instance inside a conductor. It can be accessed like so:
```javascript
const instance = player.instances['instanceId']
 
// the following two lines are equivalent
await instance.call('zome', 'fn', params)
await player.call('instanceId', 'zome', 'fn', params) 
```

### Changed

- When multiple conductors are starting at the same time, a mutex is used to ensure that only one DNA is downloaded at a time. This allows caching to kick in for conductors downloading the same DNA, to prevent a bunch of duplicate downloads.
- Use Memory backend for instance storage, rather than File, by default

### Fixed

- The DNA download functionality would sometimes signal completion before the file was fully downloaded and closed. Fixed that.
- The conductor timeout was getting stuck, causing lots of false positives


### Deprecated

- `s.info` deprecated in favor of `s.instance`. For now they are equivalent.


## [0.1.1] - 2019-10-08

### Added

- Add `TRYORAMA_STATE_DUMP` env var to turn on/off JSON state dump info when conductor encounters an error
- Conductor now self-destructs after 120 seconds of inactivity to allow the tests to complete even if the conductor hangs/deadlocks
- Add `TRYORAMA_STRICT_CONDUCTOR_TIMEOUT` to determine whether or not a conductor will throw an exception when it self-destructs

### Changed

- Default "verbose" logging config is more reasonable, i.e. less verbose
- Zome call timeout now has a "soft timeout" with a warning halfway through the real "hard" timeout

### Fixed

- DNA config generation would fail if `hc hash` produces output on stderr; no more

## [0.1.0] - 2019-09-23

### Added

- Ability to spawn and kill conductors arbitrarily during a test
- New syntax to support this main difference
