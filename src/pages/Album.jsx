import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    songList: [],
    albumArt: '',
    albumName: '',
    artistName: '',
    loading: false,
    songsFetched: false,
  };

  componentDidMount() {
    this.grabSongs();
  }

  grabSongs = async () => {
    this.setState({ loading: true });

    const { match } = this.props;
    const { id } = match.params;

    const songs = await getMusics(id);
    const songsWithFavorites = songs.map((song) => ({ ...song, checked: false }));
    this.setState({
      songList: songsWithFavorites,
      albumArt: songs[0].artworkUrl100,
      albumName: songs[0].collectionName,
      artistName: songs[0].artistName,
      loading: false,
      songsFetched: true,
    });
  };

  favoriteSong = async (song) => {
    const { songList } = this.state;
    const selectedSong = songList
      .findIndex(({ trackId }) => trackId === song.trackId);
    songList[selectedSong].checked = true;
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false, songList });
  };

  render() {
    const {
      loading,
      songList,
      albumArt,
      albumName,
      artistName,
      songsFetched,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading && <Loading /> }
        <div className="album-songs-container">
          <div className="album-art-info">
            <img src={ albumArt } alt={ albumName } />
            <span
              className="album-title-detail"
              data-testid="album-name"
            >
              { albumName }
            </span>
            <span
              className="artist-title-detail"
              data-testid="artist-name"
            >
              { artistName }
            </span>
          </div>
          <div className="songs-list">
            { songsFetched && songList.slice(1).map((song) => (
              <MusicCard
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                songInfo={ song }
                favoriteSong={ () => this.favoriteSong(song) }
                checked={ song.checked }
                key={ song.trackId }
              />
            )) }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
