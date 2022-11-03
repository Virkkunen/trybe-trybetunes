import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl,
      releaseDate,
      trackCount
    } = this.props;

    return (
      <div className="music-card">
        <img className="album-art" src={ artworkUrl } alt={ collectionName } />
        <div className="album-info">
          <span className="album-title">{ collectionName }</span>
          <span className="artist-name">{ artistName }</span>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};
