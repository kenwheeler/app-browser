import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { updateURL, updateLocation } from '../redux/modules/app';

class AutoComplete extends Component {
  handlePress = item => {
    this.props.dispatch(updateURL(item.url));
    this.props.dispatch(updateLocation(item.url));
    this.props.onDone();
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.url}
        onPress={this.handlePress.bind(null, item)}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.url}>{item.url}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    let data = this.props.history;
    let filterCache = [];
    data = data
      .filter(value => {
        if (filterCache.indexOf(value.url) === -1) {
          filterCache.push(value.url);
          return true;
        }
        return false;
      })
      .filter(value => value.url.indexOf(this.props.value) !== -1);
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyboardShouldPersistTaps="always"
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.url}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height - 55,
    backgroundColor: 'white',
    paddingBottom: 228,
  },
  item: {
    padding: 15,
  },
  title: {
    color: '#555',
  },
  url: {
    color: '#226622',
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    flex: 1,
  },
});

export default connect(state => ({
  history: state.app.history,
}))(AutoComplete);
