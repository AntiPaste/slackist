/* eslint-disable max-len */
// --  STYLES --
import './app.scss';


// --  SCRIPTS --
// jQuery first then Bootstrap
// import './static/js/jquery-2.1.4.min.js';
// import './static/js/tether.min.js';
// import './static/js/bootstrap.min.js';


// -- POLYFILLS --
import 'babel-polyfill';

// --  EXTERNAL LIBRARIES --
import { Dispatcher } from 'flux';
import React from 'react';
import ReactDOM from 'react-dom';
// pagejs is a router
import page from 'page';
// import query from './utils/query';


// --  UTILITIES --
import ApiUtils from './utils/ApiUtils';


// --  REACT & FLUX COMPONENTS, STORES AND ACTIONS --
import MessageStore from './stores/MessageStore';
import MessageActionCreators from './actions/MessageActionCreators';

import NotFoundView from './components/NotFoundView';

import AppStore from './stores/AppStore';

import GameView from './components/GameView';
import GameStore from './stores/GameStore';
import GameActionCreators from './actions/GameActionCreators';


const apiBaseUrl = process.env.API_BASE_PATH;
const dispatcher = new Dispatcher();
const apiUtils = new ApiUtils(apiBaseUrl);

const messageStore = new MessageStore(dispatcher);
const messageActionCreators = new MessageActionCreators(dispatcher);

const appStore = new AppStore(dispatcher);

const gameStore = new GameStore(dispatcher);
const gameActionCreators = new GameActionCreators(dispatcher, apiUtils);


const props = {
  appStore,
  gameStore, gameActionCreators,
  messageStore, messageActionCreators,
};

/* eslint-enable max-len */
// Log all dispatches when debugging is on.
if (process.env.DEBUG) {
  dispatcher.register((action) => {
    console.log('DISPATCHER', action);
  });
}

// -- ROUTES! --
page.base(process.env.APP_BASE_PATH);

// Middleware for clearing messages on page change
page((context, next) => {
  messageActionCreators.clearMessages();
  next();
});


page('/games/:id', ({ params }) => {
  const { id: gameId } = params;

  ReactDOM.render(
    <GameView
      gameId={gameId}
      {...props}
    />,
    document.getElementById('love-letter-frontend')
  );
});


page('*', () => {
  ReactDOM.render(
    <NotFoundView />,
    document.getElementById('ilmo-frontend')
  );
});


page.start();
