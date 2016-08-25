import { ReduceStore } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

class AppStore extends ReduceStore {
  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      // TODO
      self: {
        id: '1',
      },
    };
  }

  reduce(state, action) {
    if (!this[action.type]) return state;

    this[action.type](state, action);
    return Object.assign({}, state);
  }

  [ActionTypes.APP_RECEIVE_SELF](state, action) {
    state.me = action.self;
  }
}

export default AppStore;
