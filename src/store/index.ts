import lines, { ILinesState } from './modules/lines';
import { createStore } from 'vuex';
import figures, { IFiguresState } from './modules/figures';
import connectors, { IConnectorsState } from './modules/connectors';

export interface IState {
  figures: IFiguresState;
  connectors: IConnectorsState;
  lines: ILinesState;
}

export default createStore<IState>({
  modules: { figures, connectors, lines },
});
