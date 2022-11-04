import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AudioPlayer extends Component {
  render() {
    const { previewUrl } = this.props;
    return (
      <audio
        data-testid="audio-component"
        src={ previewUrl }
        controls
      >
        <track kind="captions" />
        Your browser does not support this component.
        <code>audio</code>
        .
      </audio>
    );
  }
}

AudioPlayer.propTypes = {
  previewUrl: PropTypes.string.isRequired,
};
