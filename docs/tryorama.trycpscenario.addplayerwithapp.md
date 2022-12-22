<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [TryCpScenario](./tryorama.trycpscenario.md) &gt; [addPlayerWithApp](./tryorama.trycpscenario.addplayerwithapp.md)

## TryCpScenario.addPlayerWithApp() method

Creates and adds a single player with an installed app to the scenario,

<b>Signature:</b>

```typescript
addPlayerWithApp(tryCpClient: TryCpClient, appBundleSource: AppBundleSource, options?: AppOptions): Promise<TryCpPlayer>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  tryCpClient | [TryCpClient](./tryorama.trycpclient.md) | The client connection to the TryCP server on which to create the player. |
|  appBundleSource | AppBundleSource | The bundle or path of the app. |
|  options | [AppOptions](./tryorama.appoptions.md) | <i>(Optional)</i> [AppOptions](./tryorama.appoptions.md) like agent pub key etc. |

<b>Returns:</b>

Promise&lt;[TryCpPlayer](./tryorama.trycpplayer.md)<!-- -->&gt;

The created player instance.
