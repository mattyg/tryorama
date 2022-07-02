<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [AgentHappOptions](./tryorama.agenthappoptions.md)

## AgentHappOptions type

A type that specifies either only the DNAs that the hApp to be installed consists of, or the DNAs and a signal handler to be registered.

<b>Signature:</b>

```typescript
export declare type AgentHappOptions = DnaSource[] | {
    dnas: DnaSource[];
    signalHandler?: AppSignalCb;
    properties?: DnaProperties;
};
```