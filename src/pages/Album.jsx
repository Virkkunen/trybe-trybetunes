import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    songList: [],
    albumArt: '',
    albumName: '',
    artistName: '',
    loading: false,
  };

  componentDidMount() {
    this.grabSongs();
  }

  grabSongs = async () => {
    this.setState({ loading: true });

    const { match } = this.props;
    const { id } = match.params;

    const songs = await getMusics(id);
    this.setState({
      songList: songs,
      albumArt: songs[0].artworkUrl100,
      albumName: songs[0].collectionName,
      artistName: songs[0].artistName,
      loading: false,
    });
  };

  render() {
    const { loading, songList, albumArt, albumName, artistName } = this.state;
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
          <div className="songs-list">a</div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
