import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
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

  submitOnEnter = (e) => {
    e.preventDefault();
    this.sendUser();
  };

  render() {
    const { inputDisabled, loading } = this.state;

    return (
      <div data-testid="page-login" className="login-container">
        <div className="login-logo">
          <FontAwesomeIcon icon={ faMusic } size="2x" />
          <span className="login-title">
            trybe
            <strong>tunes</strong>
          </span>
        </div>

        <form className="login-form" onSubmit={ this.submitOnEnter }>
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
