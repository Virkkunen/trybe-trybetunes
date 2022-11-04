import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
            data-testid="profile-image"
          />
          <Link
            to="/profile/edit"
            className="link-no-decoration"
          >
            Edit Profile
          </Link>
        </div>
        <div className="user-name">
          <span className="user-card-title">Name</span>
          <span>{name}</span>
        </div>
        <div className="user-email">
          <span className="user-card-title">Email</span>
          <span>{email}</span>
        </div>
        <div className="user-description">
          <span className="user-card-title">Description</span>
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
  // history: PropTypes.instanceOf(Object).isRequired,
};
