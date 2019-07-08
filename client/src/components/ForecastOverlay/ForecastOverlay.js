import React from 'react';
import './ForecastOverlay.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRadarCachebust } from 'actions/radar';
import PropTypes from 'prop-types';

class ForecastOverlay extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.forecast7Data !== this.props.forecast7Data) {
      this.props.setRadarCachebust();
    }
  }
  render() {
    const { forecast7Data } = this.props;
    const { url, name, error } = forecast7Data;
    return (
      <div className="ForecastOverlay">
        <div className="loading-text">
          {error && <span>No forcast information for {name} :(</span>}
          {!error && <span>Loading Forecast...</span>}
        </div>
        <a
          className="weatherwidget-io"
          href={url}
          data-label_1={name}
          data-theme="dark"
          data-basecolor="#212121"
          data-accent="transparent"
          data-highcolor="#de792d"
          data-lowcolor="#8bc1e5">
          {name}
        </a>
      </div>
    );
  }
}

ForecastOverlay.propTypes = {
  radarCachebust: PropTypes.string.isRequired,
  forecast7Data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forecast7Data: state.forecast7Data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setRadarCachebust
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastOverlay);
