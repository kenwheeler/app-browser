import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-wkwebview-reborn';
import { connect } from 'react-redux';

import ProgressBar from './progress-bar';
import {
  updateLocation,
  updateHistory,
  updateBackForward,
} from '../redux/modules/app';

class WebViewWrapper extends Component {
  state = {
    progress: 0,
  };

  webview = null;

  componentDidMount() {
    this.props.exposeRef(this.webview);
  }

  handleProgress = progress => {
    if (progress === 1) {
      this.setState({ progress }, () => {
        setTimeout(() => {
          this.setState({ progress: 0 });
        }, 200);
      });
    } else {
      this.setState({ progress });
    }
  };

  handleNavigation = data => {
    if (data.loading === false) {
      this.props.dispatch(updateLocation(data.url));
      this.props.dispatch(updateHistory(data.url));
      this.props.dispatch(updateBackForward(data));
    }
  };

  handleMessage = e => {
    switch (e.body.type) {
      case 'LOCATION':
        this.props.dispatch(updateLocation(e.body.data));
        break;
      case 'BUNDLE':
        this.props.onBundle(e.body.data);
        break;
      default:
        break;
    }
  };

  handleLoad = e => {
    if (this.state.progress !== 1) {
      this.handleProgress(1);
    }

    this.setState({ loading: false });

    this.webview.evaluateJavaScript(
      `
      (function(history){
        var pushState = history.pushState;
        var replaceState = history.replaceState;
        history.pushState = function(state) {
          let ret = pushState.apply(history, arguments);
          window.webkit.messageHandlers.reactNative.postMessage({ type: 'LOCATION', data: location.href});
          return ret;
        }
        history.replaceState = function(state) {
          let ret = replaceState.apply(history, arguments);
          window.webkit.messageHandlers.reactNative.postMessage({ type: 'LOCATION', data: location.href});
          return ret;
        }
      })(window.history);
      
      window.addEventListener('popstate', function() {
        window.webkit.messageHandlers.reactNative.postMessage({ type: 'LOCATION', data: location.href});
      });
      `
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <WebView
          ref={r => {
            this.webview = r;
          }}
          source={{ uri: this.props.url }}
          style={styles.webview}
          onLoad={this.handleLoad}
          onProgress={this.handleProgress}
          onNavigationStateChange={this.handleNavigation}
          onMessage={this.handleMessage}
        />
        <ProgressBar progress={this.state.progress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default connect(state => ({
  url: state.app.url,
  location: state.app.location,
}))(WebViewWrapper);
