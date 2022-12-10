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
      data: [
        {
          id: 1,
          width: 100,
          height: 100,
          zIndex: 0,
          borderRadius: 0,
          coords: { x: 0, y: 0 },
        },
        {
          id: 2,
          width: 100,
          height: 100,
          zIndex: 0,
          borderRadius: 0,
          coords: { x: 0, y: 0 },
        },
      ],
    };
  },
  getters: {
    getFigures(state: IFiguresState) {
      return state.data;
    },
    getFigureParams: (state: IFiguresState) => (id: number) => {
      return state.data.find((figure) => figure.id === id);
    },
  },
  mutations: {
    addFigure(state: IFiguresState) {
      const lastId = state.data[state.data.length - 1]?.id;
      return state.data.push({
        id: lastId === undefined ? 1 : lastId + 1,
        width: 100,
        height: 100,
        zIndex: 0,
        borderRadius: 0,
        coords: { x: 0, y: 0 },
      });
    },
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
    setFigureCoords(
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
  },
};
