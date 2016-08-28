import React from 'react';

import LabelMenu from '../LabelMenu';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';


const MessageView = React.createClass({

  propTypes: {
    messageStore: React.PropTypes.object.isRequired,
    messageActionCreators: React.PropTypes.object.isRequired,
    labelStore: React.PropTypes.object.isRequired,
    labelActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return this._getStoreData();
  },

  componentWillMount() {
    // document.addEventListener('keypress', this._handleKey, false);
  },

  componentDidMount() {
    const { messageStore, labelStore } = this.props;

    this._subscriptions.push(messageStore.addListener(this._onStoreChange));
    this._subscriptions.push(labelStore.addListener(this._onStoreChange));
  },

  componentWillUnmount() {
    // document.removeEventListener('keypress', this._handleKey, false);
    this._subscriptions.forEach((subscription) => subscription.remove());
  },

  _getStoreData() {
    const { messageStore, labelStore } = this.props;

    return {
      messageState: messageStore.getState(),
      labelState: labelStore.getState(),
    };
  },

  _onStoreChange() {
    this.setState(this._getStoreData());
  },

  _subscriptions: [],

  _addMessage(text) {
    const { messageActionCreators } = this.props;
    messageActionCreators.create(text);
  },

  _onFilter(label) {
    const { messageActionCreators } = this.props;
    messageActionCreators.setFilterLabel(label);
  },

  _onDelete(identifier) {
    const { messageActionCreators } = this.props;
    messageActionCreators.delete(identifier);
  },

  _handleKey(event) {
    console.log(event.keyCode);
  },

  render() {
    const { messageState, labelState } = this.state;

    const messages = messageState.messages.filter((message) => (
      !messageState.filterLabel ||
      message.label === messageState.filterLabel
    ));

    return (
      <div className='MessageView container'>
        <LabelMenu
          labels={labelState.labels}
          loading={labelState.getAllInProgress}
          onFilter={this._onFilter}
        />

        <MessageList
          messages={messages}
          loading={messageState.getAllInProgress}
          onFilter={this._onFilter}
          onDelete={this._onDelete}
        />

        <MessageInput onSubmit={this._addMessage} />
      </div>
    );
  },

});

export default MessageView;
