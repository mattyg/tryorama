<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [IScenario](./tryorama.iscenario.md) &gt; [addPlayersWithHappBundles](./tryorama.iscenario.addplayerswithhappbundles.md)

## IScenario.addPlayersWithHappBundles() method

<b>Signature:</b>

```typescript
addPlayersWithHappBundles(playersHappBundles: Array<{
        appBundleSource: AppBundleSource;
        options?: HappBundleOptions & {
            signalHandler?: AppSignalCb;
        };
    }>): Promise<IPlayer[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  playersHappBundles | Array&lt;{ appBundleSource: AppBundleSource; options?: [HappBundleOptions](./tryorama.happbundleoptions.md) &amp; { signalHandler?: AppSignalCb; }; }&gt; |  |

<b>Returns:</b>

Promise&lt;[IPlayer](./tryorama.iplayer.md)<!-- -->\[\]&gt;
