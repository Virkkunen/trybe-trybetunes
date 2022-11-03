import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    inputDisabled: true,
    // loading: false,
  };

  inputValidation = (e) => {
    const minLength = 2; // 🙄 no magic number
    const inputValid = e.target.value.length >= minLength;
    this.setState({ inputDisabled: !inputValid });
  };

  render() {
    const { inputDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <form>
            <label htmlFor="music-search" className="search-form">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Nome do artista"
                onChange={ this.inputValidation }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ inputDisabled }
              >
                Pesquisar
              </button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}
