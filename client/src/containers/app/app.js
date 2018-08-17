import React from 'react';
import WeatherMap from 'containers/WeatherMap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDisplayMode } from 'actions/controls';
import { setRadarCachebust } from 'actions/radar';
import { DARK, LIGHT } from 'common/constants/theme';
import './app.scss';

class App extends React.Component {
  handleDisplayModeChange = () => {
    const { displayMode } = this.props;
    this.props.setDisplayMode(displayMode === LIGHT ? DARK : LIGHT);
  };

  async componentDidMount() {
    // Every 5 minutes
    setInterval(this.props.setRadarCachebust, 300000);
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, 'script', 'weatherwidget-io-js');
  }

  render() {
    const { displayMode } = this.props;
    return (
      <div className={displayMode}>
        <main>
          <WeatherMap />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayMode: state.displayMode
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDisplayMode,
      setRadarCachebust
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
