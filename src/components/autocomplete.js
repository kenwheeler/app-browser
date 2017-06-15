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
    this.props.dispatch(updateURL(item));
    this.props.dispatch(updateLocation(item));
    this.props.onDone();
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity key={item} onPress={this.handlePress.bind(null, item)}>
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    let data = this.props.history;
    data = data
      .filter((value, index, self) => self.indexOf(value) === index)
      .filter(value => value.indexOf(this.props.value) !== -1);
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyboardShouldPersistTaps="always"
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('window').height - 294,
    backgroundColor: 'white',
  },
  item: {
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    flex: 1,
  },
});

export default connect(state => ({
  history: state.app.history,
}))(AutoComplete);
