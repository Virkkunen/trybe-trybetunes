import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserCard extends Component {
  render() {
    const {
      name,
      email,
      description,
      image,
    } = this.props;

    return (
      <div className="user-card">
        <div className="user-image-edit">
          <img
            src={ image }
            alt={ name }
          />
          <button type="button">Edit</button>
        </div>
        <div className="user-name">
          <span>Nome</span>
          <span>{name}</span>
        </div>
        <div className="user-email">
          <span>Email</span>
          <span>{email}</span>
        </div>
        <div className="user-description">
          <span>Descrição</span>
          <span>{description}</span>
        </div>
      </div>
    );
  }
}

UserCard.defaultProps = {
  email: '',
  description: '',
  image: '',
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
