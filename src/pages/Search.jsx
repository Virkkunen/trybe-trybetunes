import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    inputDisabled: true,
    loading: false,
    searchInput: '',
    searchResults: [],
  };

  inputValidation = (e) => {
    const minLength = 2; // 🙄 no magic number
    const inputValid = e.target.value.length >= minLength;
    this.setState({ inputDisabled: !inputValid });
  };

  inputLogic = (e) => {
    this.setState({ searchInput: e.target.value }, this.inputValidation(e));
  };

  clearInput = () => {
    const input = document.getElementById('search-input');
    input.innerText = '';
  };

  searchSongs = async () => {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    this.clearInput();
    console.log(this.state);
    const results = await searchAlbumsAPI(searchInput);
    this.setState({ searchResults: results, loading: false });
  };

  render() {
    const { inputDisabled, loading, searchResults, searchInput } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <div className="search-input-container">
            <form>
              <label htmlFor="music-search" className="search-form">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do artista"
                  id="search-input"
                  onChange={ this.inputLogic }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ inputDisabled }
                  onClick={ this.searchSongs }
                  className="blue"
                >
                  Pesquisar
                </button>
              </label>
            </form>
          </div>
          <span className="results-text">
            {`Resultados de álbuns de: ${searchInput}`}
          </span>
          <div className="songs-container">
            { loading && <Loading />}
            <div className="search-results">
              { searchResults.map((item) => (
                <MusicCard
                  artistId={ item.artistId }
                  artistName={ item.artistName }
                  artworkUrl={ item.artworkUrl100 }
                  collectionId={ item.collectionId }
                  collectionName={ item.collectionName }
                  collectionPrice={ item.collectionPrice }
                  releaseDate={ item.releaseDate }
                  trackCount={ item.trackCount }
                  key={ item.collectionId }
                />
              )) }
            </div>
          </div>
        </div>

      </div>
    );
  }
}
