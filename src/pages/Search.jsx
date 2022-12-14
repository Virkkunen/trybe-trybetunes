/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Footer from '../components/Footer';

export default class Search extends Component {
  state = {
    inputDisabled: true,
    loading: false,
    searchInput: '',
    searchResults: [],
    searchMade: false,
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
    input.value = '';
  };

  searchSongs = async () => {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    this.clearInput();
    const results = await searchAlbumsAPI(searchInput);
    this.setState({
      searchResults: results,
      loading: false,
      searchMade: true,
    });
  };

  submitOnEnter = (e) => {
    e.preventDefault();
    this.searchSongs();
  };

  render() {
    const { inputDisabled, loading, searchResults, searchInput, searchMade } = this.state;
    const successfulSearchResults = searchMade && searchResults.length > 0;
    const emptySearchResults = searchMade && searchResults.length === 0;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <form onSubmit={ this.submitOnEnter }>
            <label htmlFor="music-search" className="search-form">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Artist name"
                id="search-input"
                onChange={ this.inputLogic }
                onSubmit={ this.inputEnter }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ inputDisabled }
                onClick={ this.searchSongs }
                className="blue"
              >
                Search
                <FontAwesomeIcon icon={ faSearch } size="xs" fixedWidth />
              </button>
            </label>
          </form>
          <span className="results-text" hidden={ !searchMade }>
            {`Album results for: ${searchInput}`}
          </span>
          <div className="songs-container" hidden={ !searchMade }>
            { loading && <Loading />}
            <div className="search-results">
              { successfulSearchResults && searchResults.map((item) => (
                <AlbumCard
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
              ))}
              { emptySearchResults && <span>No albumns found.</span> }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
