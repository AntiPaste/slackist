import React from 'react';
import classnames from 'classnames';


const Loading = React.createClass({

  propTypes: {
    size: React.PropTypes.number,
    color: React.PropTypes.string,
    loading: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      size: 1,
      color: '#FFFFFF',
      loading: true,
    };
  },

  render() {
    const { size, color, loading, placeholder } = this.props;

    const loadingClasses = classnames(
      'loading', {
        'hidden-xs-up': !loading,
      }
    );

    const placeholderClasses = classnames({
      invisible: loading,
    });

    const laClasses = classnames(
      'loading-icon', 'la-ball-beat', {
        'la-2x': size === 2,
        'la-3x': size === 3,
      }
    );

    return (
      <div className='Loading'>
        <div className={loadingClasses}>
          <div className='loading-wrapper'>
            <div style={{ color }} className={laClasses}>
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>

        <span className={placeholderClasses}>{placeholder}</span>
      </div>
    );
  },

});

export default Loading;
