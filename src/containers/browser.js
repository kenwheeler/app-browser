import React, { Component } from 'react';
import {
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
  webview = null;

  handleBack = () => {
    this.webview.goBack();
  };

  handleForward = () => {
    this.webview.goForward();
  };

  render() {
    console.log('native', Frame);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={BGCOLOR} />
        <UrlBar onBack={this.handleBack} onForward={this.handleForward} />
        <Frame
          style={{ flex: 1 }}
          bundle="http://localhost:8000/main.jsbundle"
        />
        <Content>
          <WebView
            exposeRef={r => {
              this.webview = r;
            }}
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
});

export default connect(state => ({
  url: state.app.url,
  history: state.app.history,
}))(Browser);
