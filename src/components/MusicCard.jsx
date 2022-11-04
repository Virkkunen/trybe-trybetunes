import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, checked, favoriteSong } = this.props;
    return (
      <div className="music-card">
        <span>{ trackName }</span>
        <div className="music-card-right">
          <AudioPlayer previewUrl={ previewUrl } />
          <label
            htmlFor="favorite-check"
            className="favorite-check"
            data-testid={ `checkbox-music-${trackId}` }
          >
            <input
              type="checkbox"
              name="favorite-check"
              onChange={ favoriteSong }
              checked={ checked }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  favoriteSong: PropTypes.func.isRequired,
};
