export interface ISquare {
  width: number;
  height: number;
  zIndex: number;
  borderRadius: number;
}

export default {
  namespaced: true,
  state: () => ({
    figureState: {
      borderRadius: 0,
    },
  }),
  mutations: {
    setWidth(state: ISquare, width: number) {
      state.width = width;
    },
    setHeight(state: ISquare, height: number) {
      state.height = height;
    },
  },
};

// setWidth(state: ISquaresState, width: number, id: number) {
//   state.data[id].figureState.width = width;
// },
// setHeight(state: ISquaresState, height: number, id: number) {
//   state.data[id].figureState.height = height;
// },
// setCoords(
//   state: ISquaresState,
//   coords: { x: number; y: number },
//   id: number
// ) {
//   state.data[id].figureState.coords = coords;
// },
// setConnectors(state: ISquaresState) {
//   state.data[id].connectors = ;
// },
