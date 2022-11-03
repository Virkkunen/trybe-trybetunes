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
        <span>TrybeTunes</span>
        <nav className="header-nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="header-link"
          >
            Busca
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="header-link"
          >
            Favoritas
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="header-link"
          >
            Perfil
          </Link>
        </nav>
        { loading
          ? <Loading />
          : <span className="header-usr" data-testid="header-user-name">{ user }</span>}
      </div>
    );
  }
}
