import React from 'react';
import CardMapping from '../../models/cards';

const Hand = React.createClass({
  propTypes: {
    cards: React.PropTypes.array.isRequired,
  },

  renderCard(type) {
    const CardComponent = CardMapping[type];

    return (
      <CardComponent />
    );
  },

  render() {
    const { cards } = this.props;
    return (
      <div className='Hand'>
        {cards.map(this.renderCard)}
      </div>
    );
  },
});

export default Hand;
