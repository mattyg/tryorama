# Changelog
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## \[Unreleased\]

### Added
### Removed
### Changed
### Fixed

## 2023-08-07: v0.15.0
### Added
- Export all common helper functions.
### Changed
- Upgrade to Holochain v0.2.1
- Upgrade to JS client v0.16.0

## 2023-07-07: v0.15.0-rc.1
### Changed
- **BREAKING CHANGE**: Upgrade to Holochain v0.3.0-beta-dev.8. `hc` output has changed which lead to local conductor startup refactoring.
- **BREAKING CHANGE**: `runScenario` re-throws caught errors.
- **BREAKING CHANGE**: To imitate a hApp client more closely in a test, App websockets are decoupled from conductors. This change plays out mainly on the conductor level, but a player contains the app agent websocket now too for registering signals. Previously there used to be a single app websocket per conductor for all of its agents. Now there is one app agent websocket connection per agent.
- TryCP scenario: Optimize multi client/multi player installation. All agent app installations for a conductor and all conductor installations for a client are triggered in parallel instead of sequentially.
### Fixed
- **BREAKING CHANGE**: Awaiting DHT sync of multiple players received a more universal API. Scenario methods were removed, so that in all cases the util function must be called.

## 2023-05-08: v0.14.0-rc.0
### Added
- **BREAKING CHANGE**: Command to start local signaling server has changed to spawn local bootstrap server too. Both local and TryCP conductors have been adapted accordingly.
### Changed
- Upgrade to compatibility with Holochain v0.2.1-beta-dev.0.

## 2023-05-08: v0.13.0
### Added
- Utility function to wait until all players' integrated DhtOps are identical for a DNA.
- **BREAKING CHANGE**: Local signal server for both local (required) and TryCP conductors (optional).
### Changed
- `runScenario` catches and outputs error occurring during the test run.
- **BREAKING CHANGE**: Upgrade to Holochain v0.2.0 and compatible JS client.

## 2023-02-14: v0.11.2
### Changed
- Output Holochain traces at `info` log level by default. Before log level needed to be set to `debug` for traces to appear.
- Switch to Nix flake for develop environment. Run `nix develop` from now on instead of `nix-shell`. Pass on `--extra-experimental-features nix-command --extra-experimental-features flakes` or enable these features for your user in [`~/.config/nix/nix.conf`](https://nixos.org/manual/nix/stable/command-ref/conf-file.html#conf-experimental-features).

## 2023-02-03: v0.11.1
### Changed
- Upgrade JS client to latest minor version (v0.12.0).

## 2023-01-27: v0.11.0
Compatible with Holochain v0.1.0

### Changed
- Upgrade JS client to v0.12.0

## 2023-01-23 [0.10.5]
### Changed
- Update to Holochain 0.1.0-beta-rc.4
- Update to JS client v0.11.15

## 2023-01-15 [0.10.4]
### Changed
- Update to JS client v0.11.13 that fixes a problem with Nodejs v16.

## 2023-01-15 [0.10.3]
### Changed
- Update to JS client v0.11.12 that removes a node scheme import.

## 2023-01-15 [0.10.2]
### Added
- AppAgentWebsocket to local conductor. Available under `conductor.appAgentWs()` after connecting with `conductor.connectAppAgentInterface(appId)` (default now for `Scenario.addPlayerWithApp()`).
### Removed
- Removed `type` and `data` from signals as per client update.

## 2022-12-23 [0.10.1]
### Added
- Support for wildcards in `GrantedFunctions`.
### Changed
- Automatically sign zome calls without manual authorization of signing credentials.

## 2022-12-22 [0.10.0]

### Changed
- **BREAKING CHANGE**: Upgrade to Holochain 0.1.0-beta-rc.1
- **BREAKING CHANGE**: Upgrade to Holochain client v0.11

## 2022-12-12 [0.9.2]

### Added
- Admin API calls "get_dna_definition" & "grant_zome_call_capability" to TryCP conductor.

### Changed
- Upgrade Holochain client to v0.10.3
- Upgrade test zome to Holochain v0.0.175

## 2022-10-26 [0.9.1]

### Added
- TryCP: Add partialConfig parameter to ClientsPlayersOptions.
- TryCP: Add shortcut function `stopAllTryCpServers` to shutdown multiple TryCP servers.

## 2022-09-30 [0.9.0]

### Added
- TryCP: Calls for clone cell management
- Tests of clone cell management for local and TryCP conductors
### Removed
- TryCP: Deprecated Admin API request to create clone cells
### Changed
- **BREAKING CHANGE**: Upgrade to Holochain JS client v0.9.2 with clone cell features
- Upgrade to Holochain v0.0.165

## 2022-09-12 [0.8.0]

### Changed
- **BREAKING CHANGE**: Replace occurrences of `uid` by `network_seed`, in alignment with the renaming in Holochain.

## 2022-09-06 [0.7.0]

### Changed
- **BREAKING CHANGE**: Upgrade to Holochain v0.0.157 and thereby to Lair v0.2.0. **CAUTION**: No backward compatibility to previous versions of Lair. Use Tryorama < v0.7.0 for Lair < v0.2.0.

## [0.6.2]

### Added
- feat(common): add app and role id options to hApp installation 
- feat(common): add mem-proofs to installAgentsHapps (#139)
- feat(trycp): add multiple clients by array of URLs
- feat(trycp): add multiple clients/players

### Fixed
- fix(trycp): allow for multiple hosts in scenario (#136)

## [0.6.1]

### Changed
- Fixture: split zome into integrity and coordinator zomes [PR \#143](https://github.com/holochain/tryorama/pull/143)

## [0.6.0]

### Changed
- Holochain: Upgrade Holochain & @holochain/client & replace Element/Header with Action/Record [PR \#142](https://github.com/holochain/tryorama/pull/142)

## [0.5.9]

### Added
- Common: expose the optional properties field from `RegisterDnaRequest` when installing DNAs through `addPlayerWithHapp` [PR \#135](https://github.com/holochain/tryorama/pull/135)

## [0.5.8]

### Fixed
- Local conductor: bring back stdout debug logs [PR \#132](https://github.com/holochain/tryorama/pull/132)

## [0.5.7]

### Added
- Common: optional timeout for zome calls [PR \#130](https://github.com/holochain/tryorama/pull/130)

### Fixed
- Local conductor: log conductor startup only once and at correct moment [PR \#130](https://github.com/holochain/tryorama/pull/130)

## [0.5.6]

### Fixed
- Local conductor: subscribe to all messages to stderr. [PR \#125](https://github.com/holochain/tryorama/pull/125)
- Local conductor: log as info instead of as error. [PR \#125](https://github.com/holochain/tryorama/pull/125)

## [0.5.5]

### Changed
- Fix error handling during conductor startup (only log error instead of crashing) [issue \#119](https://github.com/holochain/tryorama/issues/119)
- Update Holochain client (ESM only)

## [0.5.4]

### Added
- Export function to add all agents to all conductors.

## [0.5.3]

### Added
- Convenience function getter to call zome of a given cell.

## [0.5.2]

### Added
- Conductor options to runScenario fn.

## [0.5.1]

### Added
- Missing library files.

## [0.5.0]
- Re-write Tryorama

### Added
- Use of `niv` for Holochain revision upgrades
- Complete typings for Tryorama
### Removed
- Middleware
- Conductor configuration
- Implicit usage of `tape` as test harness

## [0.4.10]
### Fixed
- Include missing type declarations for Tryorama

## [0.4.9]
### Fixed
- Upgrade Holochain JS client to version 0.3.2, which fixes ECMA Modules support
## [0.4.8]

### Changed
- Switch to renamed Holochain JS client
## [0.4.5]

### Fixed

- Published version of 0.4.4 did not contain the necessary files

## [0.4.4]

### Added

- `db_sync_level` option to configuration
### Changed

- Updated to support Hlochain v0.0.107

## [0.3.2]

### Fixed

- Config.logger(false) now produces valid logger config
- Fixed some bad logic where certain values, like the interfacePort, were pulled from the ConfigSeedArgs, rather than the actual generated config. i.e., config generation assumed that the user would use the provided values as-is without modifying or ignoring them.


## [0.3.1]

### Changed

- Default storage config for instances is now `lmdb`, before it was `memory`

### Fixed

- When using explicit instance config, it was not possible to set the storage configuration. Now it is.
- Due to default storage config of `memory`, killing and respawning a conductor would cause its persisted state to be wiped out! With the switch to `lmdb`, this is no longer the case.

## [0.3.0]

### Added

- Adds support for experimental Holochain conductor interface config `choose_free_port`, which dynamically assigns an interface port at startup. Tryorama now knows how to listen for this change, but only at initial conductor startup.
- Adds `groupPlayersByMachine` middleware, a generalization of `machinePerPlayer` which allows multiple conductors to be grouped onto each remote machine


### Changed

- **BREAKING:** Now the generated conductor config uses only one admin interface to communicate with all instances as well as perform admin functions, rather than having separate interfaces for admin calls and instance interaction

### Fixed

- Fixed bug in scenarios that contain multiple `s.spawn()` statements, where only the conductors in the most recent spawn would get cleaned up after the test. Now all conductors spawned throughout the test are tracked and cleaned up at the end.

### Removed

- Removed some helper functions around local testing of TryCP, [they now live in @holochain/tryorama-stress-utils](https://github.com/holochain/tryorama-stress-utils/commit/3d47984454215a3a7069c5bc3e7f13db19f5659c)


## [0.2.1]

### Added

- `ScenarioApi.fail` method, used internally to abort a test, can be integrated with third-party harnesses (like tape) to give better errors in the case of an internal error during a test run, e.g. a conductor timeout
- Improved auto-spawning of conductors when using `s.players(..., true)`, which awaits consistency in between each new spawn
- Exposed `s.stateDump()`, which can be used to get the state dump from the conductor during a test, for debugging purposes or even to write tests against.

### Deprecated

- Temporarily deprecated conductor-merging capability, as in the `singleConductor` middleware. The main use case for this functionality also depends on Holochain's in-memory networking, which is currently unsupported. This will remain deprecated until in-memory networking is updated.

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
