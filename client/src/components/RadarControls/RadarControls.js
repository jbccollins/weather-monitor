import React from 'react';
import './RadarControls.scss';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-player-controls';

class RadarControls extends React.Component {
  incrementSeek = () => {
    const { ticks, currentTick } = this.props;
    this.props.onChange(currentTick === ticks.length ? 0 : currentTick + 1);
  };

  componentDidMount() {
    setInterval(this.incrementSeek, 100000);
  }

  render() {
    const { ticks, currentTick } = this.props;

    return (
      <div className="RadarControls">
        <ProgressBar
          totalTime={ticks.length}
          currentTime={currentTick}
          isSeekable={false}
        />
      </div>
    );
  }
}

RadarControls.propTypes = {
  ticks: PropTypes.array.isRequired,
  currentTick: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadarControls;
