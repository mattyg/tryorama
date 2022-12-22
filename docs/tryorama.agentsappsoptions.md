<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [AgentsAppsOptions](./tryorama.agentsappsoptions.md)

## AgentsAppsOptions type

An app and an optional agent pub key for each agent. Optionally a network seed to be used for DNA installation.

<b>Signature:</b>

```typescript
export type AgentsAppsOptions = {
    agentsApps: Array<{
        app: AppBundleSource;
    } & AppOptions>;
    networkSeed?: string;
    installedAppId?: InstalledAppId;
};
```
<b>References:</b> [AppOptions](./tryorama.appoptions.md)
