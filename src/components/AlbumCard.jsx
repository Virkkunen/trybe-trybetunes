import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const {
      // artistId,
      artistName,
      collectionId,
      collectionName,
      // collectionPrice,
      artworkUrl,
      // releaseDate,
      // trackCount
    } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="link-no-decoration"
      >
        <div className="album-card">
          <img className="album-art" src={ artworkUrl } alt={ collectionName } />
          <div className="album-info">
            <span className="album-title">{ collectionName }</span>
            <span className="artist-name">{ artistName }</span>
          </div>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  // artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  // collectionPrice: PropTypes.number.isRequired,
  artworkUrl: PropTypes.string.isRequired,
  // releaseDate: PropTypes.string.isRequired,
  // trackCount: PropTypes.number.isRequired,
};
