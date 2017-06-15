import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';

import Browser from './containers/browser';
import createStore from './redux/create';
import { bootstrapHistory } from './redux/modules/app';

let store = createStore();

export default class Root extends Component {
  async componentWillMount() {
    let history = await AsyncStorage.getItem('@AppBrowser:history');
    if (history) {
      store.dispatch(bootstrapHistory(JSON.parse(history)));
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Browser />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
