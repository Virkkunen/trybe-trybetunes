import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div className="music-card">
        <span>{ trackName }</span>
        <AudioPlayer previewUrl={ previewUrl } />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
