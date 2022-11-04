import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';

export default class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checked,
      favoriteSong,
    } = this.props;

    return (
      <div className="music-card">
        <span>{ trackName }</span>
        <div className="music-card-right">
          <AudioPlayer previewUrl={ previewUrl } />
          <label
            htmlFor="favorita"
            className="favorite-check"
          >
            <input
              type="checkbox"
              name="favorita"
              id="favorita"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ favoriteSong }
              checked={ checked }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  checked: false,
  favoriteSong: () => console.log('default favoriteSong'),
  trackId: 0,
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number,
  checked: PropTypes.bool,
  favoriteSong: PropTypes.func,
};
