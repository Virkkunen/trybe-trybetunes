import React, { Component } from 'react';
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
        Header
        { loading
          ? <Loading />
          : <span className="header-user" data-testid="header-user-name">{ user }</span>}
      </div>
    );
  }
}
