import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSearch, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: '',
    loading: false,
  };

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user: user.name, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component" className="header">
        <div className="header-logo">
          <FontAwesomeIcon icon={ faMusic } size="sm" />
          <span>
            trybe
            <span className="header-logo-tunes">
              tunes
            </span>
          </span>
        </div>
        <nav className="header-nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="header-link"
          >
            <FontAwesomeIcon icon={ faSearch } fixedWidth size="xs" />
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="header-link"
          >
            <FontAwesomeIcon icon={ faHeart } fixedWidth size="xs" />
            Favourites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="header-link"
          >
            <FontAwesomeIcon icon={ faUser } fixedWidth size="xs" />
            Profile
          </Link>
        </nav>
        { loading
          ? <Loading />
          : <span className="header-usr" data-testid="header-user-name">{ user }</span>}
      </div>
    );
  }
}
