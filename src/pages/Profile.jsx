import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: false,
    userInfo: {},
    fetchedUser: false,
  };

  componentDidMount() {
    this.grabUser();
  }

  grabUser = async () => {
    this.setState({ loading: true });
    const info = await getUser();
    console.log('info', info);
    this.setState({ loading: false, userInfo: info, fetchedUser: true });
  };

  render() {
    const { loading, fetchedUser, userInfo } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <div className="user-container">
          { fetchedUser
            && (
              <UserCard
                name={ userInfo.name }
                email={ userInfo.email }
                description={ userInfo.description }
                image={ userInfo.image }
              />
            ) }
        </div>
      </div>
    );
  }
}
