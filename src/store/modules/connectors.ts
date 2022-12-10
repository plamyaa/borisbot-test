import { ICoords } from './figures';

interface IConnectorsGroup {
  id: number;
  top: ICoords;
  right: ICoords;
  bottom: ICoords;
  left: ICoords;
}

export interface IConnectorsState {
  data: IConnectorsGroup[];
}

export default {
  state() {
    return {
      data: [],
    };
  },
  getters: {
    getConnectors(state: IConnectorsState) {
      return state.data;
    },
    getConnectorsGroup: (state: IConnectorsState) => (id: number) => {
      return state.data.find((connector) => connector.id === id);
    },
    getConnectorCoords:
      (state: IConnectorsState) => (id: number, key: string) => {
        const connectorsGroup = state.data.find((group) => group.id === id);
        if (connectorsGroup)
          return connectorsGroup[key as keyof IConnectorsGroup];
      },
  },
  mutations: {
    addConnectorsGroup(
      state: IConnectorsState,
      payload: {
        width: number;
        height: number;
        figurePosition: ICoords;
      }
    ) {
      const {
        width,
        height,
        figurePosition: { x, y },
      } = payload;
      const newId =
        state.data[state.data.length - 1]?.id === undefined
          ? 1
          : state.data[state.data.length - 1].id + 1;
      state.data.push({
        id: newId,
        top: { x: x + width / 2, y: y },
        right: { x: x + width, y: y + height / 2 },
        bottom: { x: x + width / 2, y: y + height },
        left: { x: x, y: y + height / 2 },
      });
    },
    deleteConnectorsGroup(state: IConnectorsState, id: number) {
      state.data = state.data.filter((connector) => connector.id !== id);
    },
    moveConnectorsGroup(
      state: IConnectorsState,
      payload: {
        id: number;
        width: number;
        height: number;
        figurePosition: ICoords;
      }
    ) {
      const {
        id,
        width,
        height,
        figurePosition: { x, y },
      } = payload;
      state.data = state.data.map((connector) => {
        if (connector.id === id) {
          connector.top = { x: x + width / 2, y: y };
          connector.right = { x: x + width, y: y + height / 2 };
          connector.bottom = { x: x + width / 2, y: y + height };
          connector.left = { x: x, y: y + height / 2 };
        }
        return connector;
      });
    },
  },
};
