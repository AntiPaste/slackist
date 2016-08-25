import React from 'react';
import Card from '../../Card';

const GuardCard = React.createClass({
  propTypes: {
  },

  getInitialState() {
    return {
      type: 'GUARD',
      value: 1,
      name: 'Guard',
      description: 'This is a guard',
      image: 'black',
    };
  },

  render() {
    return (
      <Card params={this.state} />
    );
  },
});

export default GuardCard;
