import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    inputDisabled: true,
    loading: false,
  };

  inputValidation = (e) => {
    const minLength = 3; // 🙄 no magic number
    const inputValid = e.target.value.length >= minLength;
    this.setState({ inputDisabled: !inputValid });
  };

  sendUser = async () => {
    this.setState({ inputDisabled: true, loading: true });
    const input = document.getElementById('login-name').value;
    await createUser({ name: input });
    this.setState({ inputDisabled: false, loading: false });
    // certo?
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { inputDisabled, loading } = this.state;

    return (
      <div data-testid="page-login" className="login-container">
        <span className="login-title">
          trybe
          <strong>tunes</strong>
        </span>
        <form className="login-form">
          <label htmlFor="login-name">
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name"
              onChange={ this.inputValidation }
              placeholder="Nome"
            />
          </label>
          <button
            type="button"
            disabled={ inputDisabled }
            data-testid="login-submit-button"
            onClick={ this.sendUser }
            className="green"
          >
            Entrar
          </button>
        </form>
        <div className="loading-container">
          { loading && <Loading />}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
