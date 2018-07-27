import React from 'react';
import './ForecastOverlay.scss';
import PropTypes from 'prop-types';

class ForecastOverlay extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.radarCachebust !== this.props.radarCachebust) {
      if (window.__weatherwidget_init) {
        // This function is injected in app.js
        window.__weatherwidget_init();
      }
    }
  }

  render() {
    return (
      <div className="ForecastOverlay">
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/38d91n77d04/washington/?unit=us"
          data-label_1="Washington DC"
          data-theme="dark"
          data-basecolor="#212121"
          data-accent="transparent"
          data-highcolor="#de792d"
          data-lowcolor="#8bc1e5">
          Washington DC
        </a>
      </div>
    );
  }
}

ForecastOverlay.propTypes = {
  radarCachebust: PropTypes.string.isRequired
};

export default ForecastOverlay;
