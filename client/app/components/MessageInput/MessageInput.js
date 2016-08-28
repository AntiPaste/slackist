import React from 'react';


const MessageInput = React.createClass({

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      text: '',
    };
  },

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      const { text } = this.state;

      this.setState({ text: '' });
      event.preventDefault();

      const { onSubmit } = this.props;
      onSubmit(text);
    }
  },

  _handleChange(event) {
    const text = event.target.value;
    this.setState({ text });
  },

  render() {
    const { text } = this.state;

    return (
      <div className='MessageInput'>
        <div className='MessageInput-chooser'></div>

        <input
          className='MessageInput-field'
          type='text'
          name='text'
          onKeyPress={this._handleKeyPress}
          onChange={this._handleChange}
          value={text}
          autoFocus
        />
      </div>
    );
  },

});

export default MessageInput;
