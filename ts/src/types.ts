import {
  AdminWebsocket,
  AgentPubKey,
  AppBundleSource,
  AppSignalCb,
  AppWebsocket,
  CallZomeRequest,
  CapSecret,
  DnaProperties,
  DnaSource,
  DnaBundle,
  HoloHash,
  InstalledCell,
  MembraneProof,
  RoleId,
  RegisterDnaRequest,
} from "@holochain/client";

/**
 * @internal
 */
export type _RegisterDnaReqOpts = Omit<
  RegisterDnaRequest,
  "hash" | "path" | "bundle"
> & {
  hash?: HoloHash;
  path?: string;
  bundle?: DnaBundle;
};

/**
 * The zome request options adapted to a specific cell.
 *
 * @public
 */
export type CellZomeCallRequest = Omit<
  CallZomeRequest,
  "cap_secret" | "cell_id" | "payload" | "provenance"
> & {
  cap_secret?: CapSecret;
  provenance?: AgentPubKey;
  payload?: unknown;
};

/**
 * The function for calling a zome from a specific cell.
 *
 * @public
 */
export type CallZomeFn = <T>(
  request: CellZomeCallRequest,
  timeout?: number
) => Promise<T>;

/**
 * Extends an installed cell by a function to call a zome.
 *
 * @public
 */
export interface CallableCell extends InstalledCell {
  callZome: CallZomeFn;
}

/**
 * Provides direct access to cells of a hApp and the agent key.
 *
 * @public
 */
export interface AgentHapp {
  happId: string;
  agentPubKey: Uint8Array;
  cells: CallableCell[];
  namedCells: Map<RoleId, CallableCell>;
}

/**
 * Combines an agent hApp with the conductor they belong to.
 *
 * @public
 */
export interface IPlayer extends AgentHapp {
  conductor: IConductor;
}

/**
 * Optional arguments when installing a hApp bundle.
 *
 * @public
 */
export interface HappBundleOptions {
  agentPubKey?: AgentPubKey;
  installedAppId?: string;
  uid?: string;
  membraneProofs?: Record<string, MembraneProof>;
}

/**
 * Base interface of a Tryorama conductor. Both {@link Conductor} and
 * {@link TryCpConductor} implement this interface.
 *
 * @public
 */
export interface IConductor {
  startUp: () => Promise<void | null>;
  shutDown: () => Promise<number | null>;

  connectAppInterface(signalHandler?: AppSignalCb): void;

  adminWs: () => Omit<
    AdminWebsocket,
    | "_requester"
    | "client"
    | "activateApp"
    | "deactivateApp"
    | "defaultTimeout"
    | "listActiveApps"
  >;
  appWs: () => Pick<AppWebsocket, "callZome" | "appInfo">;

  installAgentsHapps: (options: {
    agentsDnas: DnaSource[][];
    uid?: string;
    properties?: DnaProperties;
    signalHandler?: AppSignalCb;
  }) => Promise<AgentHapp[]>;
}

/**
 * A type that specifies either only the DNAs that the hApp to be installed
 * consists of, or the DNAs and a signal handler to be registered.
 *
 * @public
 */
export type AgentHappOptions =
  | DnaSource[]
  | {
      dnas: DnaSource[];
      signalHandler?: AppSignalCb;
      properties?: DnaProperties;
    };

/**
 * Base interface of a Tryorama test scenario. Both {@link Scenario} and
 * {@link TryCpScenario} implement this interface.
 *
 * @public
 */
export interface IScenario {
  addConductor(signalHandler?: AppSignalCb): Promise<IConductor>;
  addPlayerWithHapp(agentHappOptions: AgentHappOptions): Promise<IPlayer>;
  addPlayersWithHapps(agentHappOptions: AgentHappOptions[]): Promise<IPlayer[]>;
  addPlayerWithHappBundle(
    appBundleSource: AppBundleSource,
    options?: HappBundleOptions & { signalHandler?: AppSignalCb }
  ): Promise<IPlayer>;
  addPlayersWithHappBundles(
    playersHappBundles: Array<{
      appBundleSource: AppBundleSource;
      options?: HappBundleOptions & { signalHandler?: AppSignalCb };
    }>
  ): Promise<IPlayer[]>;
  shareAllAgents(conductors: IConductor[]): Promise<void>;
  shutDown(): Promise<void>;
  cleanUp(): Promise<void>;
}