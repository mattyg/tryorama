<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [Scenario](./tryorama.scenario.md) &gt; [addPlayersWithHappBundles](./tryorama.scenario.addplayerswithhappbundles.md)

## Scenario.addPlayersWithHappBundles() method

Create and add multiple players to the scenario, with a hApp bundle installed for each player.

<b>Signature:</b>

```typescript
addPlayersWithHappBundles(playersHappBundles: Array<{
        appBundleSource: AppBundleSource;
        options?: HappBundleOptions & {
            signalHandler?: AppSignalCb;
        };
    }>): Promise<Player[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  playersHappBundles | Array&lt;{ appBundleSource: AppBundleSource; options?: [HappBundleOptions](./tryorama.happbundleoptions.md) &amp; { signalHandler?: AppSignalCb; }; }&gt; | An array with a hApp bundle for each player, and a signal handler (optional). |

<b>Returns:</b>

Promise&lt;[Player](./tryorama.player.md)<!-- -->\[\]&gt;

