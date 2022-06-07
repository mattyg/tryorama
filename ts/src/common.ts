import {
  AgentPubKey,
  CallZomeResponse,
  InstalledAppInfo,
  InstalledCell,
} from "@holochain/client";
import {
  AgentHapp,
  CallableCell,
  CellZomeCallRequest,
  IConductor,
} from "./types.js";

export const addAllAgentsToAllConductors = async (conductors: IConductor[]) => {
  await Promise.all(
    conductors.map(async (playerToShareAbout, playerToShareAboutIdx) => {
      const agentInfosToShareAbout = await playerToShareAbout
        .adminWs()
        .requestAgentInfo({
          cell_id: null,
        });
      await Promise.all(
        conductors.map(async (playerToShareWith, playerToShareWithIdx) => {
          if (playerToShareAboutIdx !== playerToShareWithIdx) {
            playerToShareWith.adminWs().addAgentInfo({
              agent_infos: agentInfosToShareAbout,
            });
          }
        })
      );
    })
  );
};

function assertZomeResponse<T>(
  response: CallZomeResponse
): asserts response is T {
  return;
}

export const enableAndGetAgentHapp = async (
  conductor: IConductor,
  agentPubKey: AgentPubKey,
  installedAppInfo: InstalledAppInfo
) => {
  const enableAppResponse = await conductor.adminWs().enableApp({
    installed_app_id: installedAppInfo.installed_app_id,
  });
  if (enableAppResponse.errors.length) {
    throw new Error(`failed to enable app: ${enableAppResponse.errors}`);
  }
  const namedCells = new Map(
    installedAppInfo.cell_data.map((cell) => {
      const callableCell = getCallableCell(conductor, cell, agentPubKey);
      return [cell.role_id, callableCell];
    })
  );
  const cells = installedAppInfo.cell_data.map((cell) =>
    getCallableCell(conductor, cell, agentPubKey)
  );
  const agentHapp: AgentHapp = {
    happId: installedAppInfo.installed_app_id,
    agentPubKey,
    cells,
    namedCells,
  };
  return agentHapp;
};

const getCallableCell = (
  conductor: IConductor,
  cell: InstalledCell,
  agentPubKey: AgentPubKey
) => ({
  ...cell,
  callZome: async <T>(request: CellZomeCallRequest) => {
    const callZomeResponse = await conductor.appWs().callZome({
      ...request,
      cap_secret: request.cap_secret ?? null,
      cell_id: cell.cell_id,
      provenance: request.provenance || agentPubKey,
      payload: request.payload ?? null,
    });
    assertZomeResponse<T>(callZomeResponse);
    return callZomeResponse;
  },
});

export const getZomeCaller =
  (cell: CallableCell, zomeName: string) =>
  <T>(fnName: string, payload: unknown): Promise<T> =>
    cell.callZome<T>({
      zome_name: zomeName,
      fn_name: fnName,
      payload,
    });
