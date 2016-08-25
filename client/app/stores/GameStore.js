import { ReduceStore } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

class GameStore extends ReduceStore {
  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      round: null,
      players: [],
      state: null,
    };
  }

  reduce(state, action) {
    if (!this[action.type]) return state;

    this[action.type](state, action);
    return Object.assign({}, state);
  }

  [ActionTypes.GAME_RECEIVE_STATE](state, action) {
    state.state = action.state;
  }

  [ActionTypes.GAME_PLAYER_JOIN](state, action) {
    state.players.push({
      id: action.id,
    });
  }

  [ActionTypes.GAME_PLAYER_LEAVE](state, action) {
    state.players = state.players.filter((player) => {
      return player.id !== action.id;
    });
  }
}

export default GameStore;
