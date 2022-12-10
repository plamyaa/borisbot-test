export interface ICoords {
  x: number;
  y: number;
}

interface IFigureState {
  id: number;
  width: number;
  height: number;
  zIndex: number;
  borderRadius: number;
  coords: ICoords;
}

export interface IFiguresState {
  data: IFigureState[];
}

export default {
  state() {
    return {
      data: [],
    };
  },
  getters: {
    getFigures(state: IFiguresState) {
      return state.data;
    },
    getFigureParams: (state: IFiguresState) => (id: number) => {
      return state.data.find((figure) => figure.id === id);
    },
    getLastFigure(state: IFiguresState) {
      return state.data[state.data.length - 1];
    },
  },
  mutations: {
    addFigure(state: IFiguresState) {
      const newId =
        state.data[state.data.length - 1]?.id === undefined
          ? 1
          : state.data[state.data.length - 1].id + 1;
      return state.data.push({
        id: newId,
        width: 100,
        height: 100,
        zIndex: 0,
        borderRadius: 0,
        coords: { x: 0, y: 0 },
      });
    },
    deleteFigure(state: IFiguresState, id: number) {
      state.data = state.data.filter((figure) => figure.id !== id);
    },

    // SETTERS
    setFigureWidth(
      state: IFiguresState,
      payload: { id: number; width: number }
    ) {
      const { id, width } = payload;
      state.data = state.data.map((figure) => {
        if (figure.id === id) {
          figure.width = width;
        }
        return figure;
      });
    },
    setFigureHeight(
      state: IFiguresState,
      payload: { id: number; height: number }
    ) {
      const { id, height } = payload;
      state.data = state.data.map((figure) => {
        if (figure.id === id) {
          figure.height = height;
        }
        return figure;
      });
    },
    setFigureZIndex(
      state: IFiguresState,
      payload: { id: number; zIndex: number }
    ) {
      const { id, zIndex } = payload;
      state.data = state.data.map((figure) => {
        if (figure.id === id) {
          figure.zIndex = zIndex;
        }
        return figure;
      });
    },
    moveFigure(
      state: IFiguresState,
      payload: { id: number; x: number; y: number }
    ) {
      const { id, x, y } = payload;
      state.data = state.data.map((figure) => {
        if (figure.id === id) {
          figure.coords = { x: x, y: y };
        }
        return figure;
      });
    },
  },
};
