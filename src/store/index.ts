import { createStore } from 'vuex';
import figures, { IFiguresState } from './modules/figures';
import connectors, { IConnectorsState } from './modules/connectors';

export interface IState {
  figures: IFiguresState;
  connectors: IConnectorsState;
}

export default createStore<IState>({
  modules: { figures, connectors },
});
