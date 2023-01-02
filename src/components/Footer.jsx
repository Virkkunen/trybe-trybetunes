import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a
          className="footer-item"
          href="https://github.com/Virkkunen"
        >
          <FontAwesomeIcon icon={ faGithub } size="lg" />
          <span>@Virkkunen</span>
        </a>
        <a
          className="footer-item"
          href="https://github.com/Virkkunen/trybe-trybetunes"
        >
          <FontAwesomeIcon icon={ faCode } size="lg" />
          <span>source</span>
        </a>
      </div>
    );
  }
}
