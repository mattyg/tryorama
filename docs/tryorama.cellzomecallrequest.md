<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@holochain/tryorama](./tryorama.md) &gt; [CellZomeCallRequest](./tryorama.cellzomecallrequest.md)

## CellZomeCallRequest type

The zome request options adapted to a specific cell.

<b>Signature:</b>

```typescript
export declare type CellZomeCallRequest = Omit<CallZomeRequest, "cap_secret" | "cell_id" | "payload" | "provenance"> & {
    cap_secret?: CapSecret;
    provenance?: AgentPubKey;
    payload?: unknown;
};
```