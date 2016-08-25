import React from 'react';

const Events = React.createClass({
  propTypes: {
    channel: React.PropTypes.string.isRequired,
    handlers: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      source: null,
    };
  },

  componentWillMount() {
    // Create EventSource
    const { channel, handlers } = this.props;
    const source = new EventSource(`/api/stream?channel=${channel}`);

    Object.keys(handlers).forEach((type) => {
      const handler = handlers[type];
      source.addEventListener(type, handler);
    });

    this.setState({ source });
  },

  render() {
    return null;
  },
});

export default Events;
