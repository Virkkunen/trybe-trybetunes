import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
              trackId={ song.trackId }
              checked={ song.checked }
              key={ song.trackId }
            />
          )) }
        </div>
      </div>
    );
  }
}
