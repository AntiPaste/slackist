import React from 'react';
import ReactDOM from 'react-dom';

import Loading from '../Loading';
import Message from '../Message';


const MessageList = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool,
    messages: React.PropTypes.array.isRequired,
    onFilter: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  },

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = (
      node.scrollTop + node.offsetHeight === node.scrollHeight
    );
  },

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  },

  render() {
    const { messages, loading, onFilter, onDelete } = this.props;
    if (loading) {
      return (
        <div className='MessageList'>
          <Loading
            size={3}
            color='#3AA3E3'
            loading={loading}
            placeholder='Loading messages...'
          />
        </div>
      );
    }

    return (
      <div className='MessageList'>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            onFilter={onFilter}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  },

});

export default MessageList;
