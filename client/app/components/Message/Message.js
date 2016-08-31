import React from 'react';
import Linkify from 'react-linkify';
import moment from 'moment';


const Message = React.createClass({

  propTypes: {
    message: React.PropTypes.object.isRequired,
    onFilter: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  },

  _handleFilter(event) {
    const { onFilter, message } = this.props;

    event.preventDefault();
    onFilter(message.label);
  },

  _handleDelete(event) {
    const { onDelete, message } = this.props;

    event.preventDefault();
    onDelete(message.id);
  },

  render() {
    const { message } = this.props;
    const timestampFormat = 'ddd, DD MMM YYYY HH:mm:ss';

    return (
      <div className='Message'>
        <div className='Message-left'>
          <img
            alt='Avatar'
            className='Message-left-avatar'
            src='/images/avatar.png'
          />
        </div>

        <div className='Message-right'>
          <div className='Message-right-top'>
            <div className='Message-right-top-name'>Kasper Koho</div>
            <div className='Message-right-top-timestamp'>
              {moment.utc(message.created, timestampFormat).local().fromNow()}
            </div>
            <div className='Message-right-top-delete'>
              <a href='#' onClick={this._handleDelete}>delete</a>
            </div>
          </div>

          <div className='Message-right-bottom'>
            {message.label &&
              <a
                href='#'
                onClick={this._handleFilter}
                className='Message-right-bottom-label'
              >
                {message.label}
              </a>
            }

            {message.label &&
              <span>&nbsp;</span>
            }

            <span className='Message-right-bottom-content'>
              <Linkify>{message.content}</Linkify>
            </span>
          </div>
        </div>
      </div>
    );
  },

});

export default Message;
