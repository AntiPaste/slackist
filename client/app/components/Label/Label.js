import React from 'react';


const Label = React.createClass({

  propTypes: {
    label: React.PropTypes.object.isRequired,
    onFilter: React.PropTypes.func.isRequired,
  },

  _handleFilter(event) {
    const { onFilter, label } = this.props;

    event.preventDefault();
    onFilter(label.value);
  },

  render() {
    const { label } = this.props;

    return (
      <div className='Label'>
        <a
          href='#'
          onClick={this._handleFilter}
          className='Label-label'
        >
          {label.value || 'Clear filter'}
        </a>

        <span> </span>

        {label.count &&
          <span className='Label-count'>({label.count})</span>
        }
      </div>
    );
  },

});

export default Label;
