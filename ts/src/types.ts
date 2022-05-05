import {
  AdminWebsocket,
  AppSignalCb,
  AppWebsocket,
  CallZomeRequest,
  DnaSource,
  InstalledCell,
} from "@holochain/client";

export type CellZomeCallRequest = Omit<
  CallZomeRequest,
  "cap_secret" | "cell_id" | "provenance"
> & {
  cap_secret?: Uint8Array;
  provenance?: Uint8Array;
};

export type CallZomeFn = <T>(request: CellZomeCallRequest) => Promise<T>;

export interface CallableCell extends InstalledCell {
  callZome: CallZomeFn;
}

export interface AgentHapp {
  happId: string;
  agentPubKey: Uint8Array;
  cells: CallableCell[];
}

export interface Conductor {
  startUp: (options: { signalHandler?: AppSignalCb }) => Promise<void | null>;
  shutDown: () => Promise<number | null>;

  adminWs: () => Pick<
    AdminWebsocket,
    | "addAgentInfo"
    | "attachAppInterface"
    // | "createCloneCell"
    // | "disableApp"
    | "enableApp"
    | "dumpState"
    | "dumpFullState"
    | "generateAgentPubKey"
    | "installApp"
    // | "installAppBundle"
    // | "listAppInterfaces"
    // | "listApps"
    // | "listCellIds"
    // | "listDnas"
    | "registerDna"
    | "requestAgentInfo"
    // | "startApp"
    // | "uninstallApp"
  >;
  appWs: () => Pick<AppWebsocket, "callZome" | "appInfo">;

  installAgentsHapps: (options: {
    agentsDnas: DnaSource[][];
    uid?: string;
  }) => Promise<AgentHapp[]>;
}

export type Player = {
  conductor: Conductor;
  agentPubKey: Uint8Array;
  cells: CallableCell[];
};
