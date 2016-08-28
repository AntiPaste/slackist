// --  STYLES --
import './app.scss';


// -- POLYFILLS --
import 'babel-polyfill';


// --  EXTERNAL LIBRARIES --
import { Dispatcher } from 'flux';
import React from 'react';
import ReactDOM from 'react-dom';
import page from 'page';


// --  UTILITIES --
import ApiUtils from './utils/ApiUtils';


// --  REACT & FLUX COMPONENTS, STORES AND ACTIONS --
import NotFoundView from './components/NotFoundView';

import MessageView from './components/MessageView';
import MessageStore from './stores/MessageStore';
import MessageActionCreators from './actions/MessageActionCreators';

import LabelStore from './stores/LabelStore';
import LabelActionCreators from './actions/LabelActionCreators';


const apiBaseUrl = process.env.API_BASE_PATH;
const dispatcher = new Dispatcher();
const apiUtils = new ApiUtils(apiBaseUrl);

const messageStore = new MessageStore(dispatcher);
const messageActionCreators = new MessageActionCreators(dispatcher, apiUtils);

const labelStore = new LabelStore(dispatcher);
const labelActionCreators = new LabelActionCreators(dispatcher, apiUtils);

const props = {
  messageStore, messageActionCreators,
  labelStore, labelActionCreators,
};


// Log all dispatches when debugging is on.
if (process.env.DEBUG) {
  dispatcher.register((action) => {
    console.log('DISPATCHER', action);
  });
}


// -- ROUTES! --
page.base(process.env.APP_BASE_PATH);


page('/', () => {
  messageActionCreators.getAll();
  labelActionCreators.getAll();

  ReactDOM.render(
    <MessageView {...props} />,
    document.getElementById('slackist-frontend')
  );
});


page('*', () => {
  ReactDOM.render(
    <NotFoundView />,
    document.getElementById('slackist-frontend')
  );
});


page.start();
