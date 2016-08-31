import React from 'react';

import Loading from '../Loading';
import Message from '../Message';


const MessageList = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool,
    messages: React.PropTypes.array.isRequired,
    onFilter: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.hasInitialScrolled = false;
  },

  componentWillUpdate() {
    this.shouldScrollBottom = (
      this.node && (
        !this.hasInitialScrolled ||
        this.node.scrollTop + this.node.offsetHeight === this.node.scrollHeight
      )
    );
  },

  componentDidUpdate() {
    if (this.node && this.shouldScrollBottom) {
      this.hasInitialScrolled = true;
      this.node.scrollTop = this.node.scrollHeight;
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
      <div className='MessageList' ref={node => { this.node = node; }}>
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
