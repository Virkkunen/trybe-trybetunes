import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favoriteList: [],
    loading: false,
    songsFetched: false,
  };

  componentDidMount() {
    this.grabFavorites();
  }

  grabFavorites = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteList: favoriteSongs, loading: false, songsFetched: true });
  };

  removeFavorite = async (song) => {
    this.setState({ loading: true });
    await removeSong(song);
    this.setState({ loading: false }, this.grabFavorites);
  };

  render() {
    const { favoriteList, loading, songsFetched } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
        <div className="favorite-songs-list">
          { songsFetched && favoriteList.map((song) => (
            <MusicCard
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              checked={ song.checked }
              favoriteSong={ () => this.removeFavorite(song) }
              key={ song.trackId }
            />
          )) }
        </div>
        <Footer />
      </div>
    );
  }
}
