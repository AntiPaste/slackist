import React from 'react';

const Card = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
  },

  render() {
    const { type, value, name, description, image } = this.props.params;

    return (
      <div className='Card row' style={{ background: image }}>
        <div className='Card-wrapper col-xs-12'>
          <div className='Card-header row'>
            <div className='Card-header-value col-xs-2'>{value}</div>
            <div className='Card-header-name col-xs-10'>{name}</div>
          </div>

          <div className='Card-footer row'>
            <div className='Card-footer-description col-xs-12'>
              {description}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Card;
