import React from 'react';
import WeatherMap from 'containers/WeatherMap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRadarCachebust } from 'actions/radar';
import './app.scss';

class App extends React.Component {
  state = {
    showcaseModeTimeout: null,
    showcasing: true
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

  handleMouseMove = () => {
    const { showcasing, showcaseModeTimeout } = this.state;
    clearTimeout(showcaseModeTimeout);
    const nextState = {
      showcaseModeTimeout: setTimeout(this.beginShowcasing, 2000)
    };
    if (showcasing) {
      nextState['showcasing'] = false;
    }
    this.setState(nextState);
  };

  beginShowcasing = () => {
    this.setState({ showcasing: true });
  };

  render() {
    const { showcasing } = this.state;
    return (
      <div
        onMouseMove={this.handleMouseMove}
        className={`${showcasing ? 'showcasing' : ''}`}>
        <main>
          <WeatherMap />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

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
)(App);
