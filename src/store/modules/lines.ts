export interface ILine {
  id: number;
  lineName: string;
}

export interface ILinesState {
  data: ILine[];
  activeConnector: string;
}

export default {
  state() {
    return {
      data: [],
      activeConnector: '',
    };
  },
  getters: {
    getLines(state: ILinesState) {
      return state.data;
    },
    getActiveConnector(state: ILinesState) {
      return state.activeConnector;
    },
    getLinesConnectors(state: ILinesState) {
      const connectors = state.data.map((line) => {
        return line.lineName.split('-');
      });
      return connectors;
    },
  },
  mutations: {
    activateConnector(state: ILinesState, name: string) {
      const active = state.activeConnector;
      const idLen = parseInt(name).toString().length - 1;
      if (state.activeConnector === '') {
        state.activeConnector = name;
      } else if (state.activeConnector[idLen] === name[idLen]) {
        state.activeConnector = name;
      } else if (state.activeConnector !== name) {
        state.activeConnector = '';
        const newId =
          state.data[state.data.length - 1]?.id === undefined
            ? 1
            : state.data[state.data.length - 1].id + 1;
        state.data.push({
          id: newId,
          lineName: active + '-' + name,
        });
      }
    },
    deactivateConnector(state: ILinesState) {
      state.activeConnector = '';
    },
    deleteLine(state: ILinesState, id: number) {
      state.data = state.data.filter((line) => line.id !== id);
    },
  },
};
