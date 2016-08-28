import React from 'react';

import Loading from '../Loading';
import Label from '../Label';


const LabelMenu = React.createClass({

  propTypes: {
    labels: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool,
    onFilter: React.PropTypes.func.isRequired,
  },

  render() {
    const { labels, loading, onFilter } = this.props;
    if (loading) {
      return (
        <div className='LabelMenu'>
          <Loading
            size={3}
            color='#3AA3E3'
            loading={loading}
            placeholder='Loading labels...'
          />
        </div>
      );
    }

    return (
      <div className='LabelMenu'>
        {labels.map((label, index) => (
          <Label
            key={index}
            label={label}
            onFilter={onFilter}
          />
        ))}

        <Label label={{ value: null, count: null }} onFilter={onFilter} />
      </div>
    );
  },

});

export default LabelMenu;
