import React from 'react';
import Messages from '../Messages';
import Breadcrumbs from '../Breadcrumbs';
import Events from '../Events';

import Hand from '../Hand';

const GameView = React.createClass({
  propTypes: {
    gameId: React.PropTypes.string.isRequired,
    appStore: React.PropTypes.object.isRequired,
    gameStore: React.PropTypes.object.isRequired,
    gameActionCreators: React.PropTypes.object.isRequired,
    messageStore: React.PropTypes.object.isRequired,
    messageActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return this._getStoreData();
  },

  componentWillMount() {
    this.props.gameActionCreators.testSetState({
      players: ['1', '2'],
      hands: {
        '1': ['GUARD', 'GUARD'],
        '2': ['UNKNOWN'],
      },
      final_card: 'GUARD',
      effects: {},
    });
  },

  componentDidMount() {
    this._appStoreSubscription = this.props.appStore.addListener(
      this._onStoreChange
    );

    this._gameStoreSubscription = this.props.gameStore.addListener(
      this._onStoreChange
    );
  },

  componentWillUnmount() {
    this._appStoreSubscription.remove();
    this._gameStoreSubscription.remove();
  },

  onEvent(data) {
    console.log(data);
  },

  getPath() {
    const path = [];
    path.push({ name: 'Home', url: '/' });
    path.push({ name: 'Current game', url: `/games/${this.props.gameId}` });

    return path;
  },

  _getStoreData() {
    return {
      appState: this.props.appStore.getState(),
      gameState: this.props.gameStore.getState(),
    };
  },

  _onStoreChange() {
    this.setState(this._getStoreData());
  },

  render() {
    const { gameId } = this.props;
    const channel = `games:${gameId}`;

    const { appState, gameState } = this.state;
    const roundState = gameState.state;

    return (
      <div className='container'>
        <Messages
          messageActionCreators={this.props.messageActionCreators}
          messageStore={this.props.messageStore}
        />

        <Breadcrumbs path={this.getPath()} />

        {roundState.hands ?
          <Hand
            cards={roundState.hands[appState.self.id]}
          /> : null
        }

        {/*<Events
          channel={channel}
          handlers={{
            myevent: this.onEvent,
          }}
        />*/}
      </div>
    );
  },
});

export default GameView;
