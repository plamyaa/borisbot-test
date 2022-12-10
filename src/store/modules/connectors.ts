interface IConnector {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface IConnectorsState {
  data: IConnector[];
  activeConnector: { x1: number; y1: number };
}

export default {
  state() {
    return {
      data: [],
      activeConnectors: {},
    };
  },
  getters: {
    getConnectors(state: IConnectorsState) {
      return state.data;
    },
    getConnnector: (state: IConnectorsState) => (id: number) => {
      return state.data.find((connector) => connector.id === id);
    },
  },
  mutations: {
    activateConnector(
      state: IConnectorsState,
      payload: { x1: number; y1: number }
    ) {
      const { x1, y1 } = payload;
      console.log(x1, y1);
      const notActivated = state.activeConnector === undefined;
      if (notActivated) state.activeConnector = { x1: x1, y1: y1 };
      else {
        const lastId = state.data[state.data.length - 1]?.id;
        console.log(lastId === undefined)
        state.data.push({
          id: lastId === undefined ? 1 : lastId + 1,
          x1: state.activeConnector.x1,
          y1: state.activeConnector.y1,
          x2: x1,
          y2: y1,
        });
      }
    },
    deactivateConnector(state: IConnectorsState) {
      state.activeConnector = Object.assign({});
    },
    addConnector(
      state: IConnectorsState,
      payload: { x1: number; y1: number; x2: number; y2: number }
    ) {
      const { x1, y1, x2, y2 } = payload;
      const lastId = state.data[state.data.length - 1].id;
      state.data.push({
        id: lastId + 1,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
      });
    },
    deleteConnector(state: IConnectorsState, id: number) {
      state.data = state.data.filter((connector) => connector.id !== id);
    },
    move1coords(
      state: IConnectorsState,
      payload: {
        id: number;
        x1: number;
        y1: number;
      }
    ) {
      const { id, x1, y1 } = payload;
      state.data = state.data.map((connector) => {
        if (connector.id === id) {
          connector.x1 = x1;
          connector.y1 = y1;
        }
        return connector;
      });
    },
    move2coords(
      state: IConnectorsState,
      payload: {
        id: number;
        x2: number;
        y2: number;
      }
    ) {
      const { id, x2, y2 } = payload;
      state.data = state.data.map((connector) => {
        if (connector.id === id) {
          connector.x2 = x2;
          connector.y2 = y2;
        }
        return connector;
      });
    },
  },
};
