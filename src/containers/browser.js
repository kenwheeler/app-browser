import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  NativeModules,
  LayoutAnimation,
  PanResponder,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import UrlBar from '../components/url-bar';
import Content from '../components/content';
import WebView from '../components/web-view';
import Frame from './frame';

const BGCOLOR = '#efefef';

class Browser extends Component {
  state = {
    nativeMode: false,
    bundle: null,
  };

  webview = null;

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({
        nativeMode: false,
        bundle: null,
      });
    }
  }

  handleBack = () => {
    this.setState({
      nativeMode: false,
    });
    this.webview.goBack();
  };

  handleForward = () => {
    this.setState({
      nativeMode: false,
    });
    this.webview.goForward();
  };

  handleBundle = bundle => {
    this.setState({
      nativeMode: true,
      bundle,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={BGCOLOR} />
        <UrlBar onBack={this.handleBack} onForward={this.handleForward} />
        <Content>
          {this.state.nativeMode &&
            <Frame
              style={styles.frame}
              bundle={`${this.state.bundle}?platform=ios&dev=false`}
            />}
          <WebView
            exposeRef={r => {
              this.webview = r;
            }}
            onBundle={this.handleBundle}
            style={this.state.nativeMode ? styles.hidden : {}}
          />
        </Content>
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGCOLOR,
    paddingTop: STATUSBAR_HEIGHT,
  },
  frame: {
    flex: 1,
  },
  hidden: {
    position: 'absolute',
    flex: 0,
    height: 0,
    opacity: 0,
  },
});

export default connect(state => ({
  url: state.app.url,
  history: state.app.history,
}))(Browser);
