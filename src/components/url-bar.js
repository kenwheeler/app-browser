import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { updateURL, updateLocation } from '../redux/modules/app';
import AutoComplete from './autocomplete';

const noop = () => {};

class UrlBar extends Component {
  state = {
    text: this.props.location,
    focused: false,
    editing: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.location,
    });
  }

  handleSubmit = () => {
    let url = this.state.text;
    if (!url.startsWith('http')) {
      if (url.indexOf('.') !== -1) {
        url = `http://${url}`;
      } else {
        url = `https://google.com/search?q=${url}`;
      }
    }
    this.props.dispatch(updateURL(url));
    this.props.dispatch(updateLocation(url));
    this.setState({ editing: false });
  };

  handleFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ focused: true });
  };

  handleBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ focused: false });
  };

  handleChange = text => {
    this.setState({ editing: true, text });
  };

  handleDone = () => {
    this.setState({ editing: false });
    this.input.blur();
  };

  handleCancel = () => {
    this.setState({
      text: this.props.location,
      editing: false,
    });
    this.input.blur();
  };

  render() {
    const { canGoBack, canGoForward, onBack, onForward } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={canGoBack ? 0.2 : 1}
          onPress={canGoBack ? onBack : noop}
        >
          <View style={styles.button}>
            <Icon
              name="chevron-left"
              style={[styles.icon, canGoBack ? {} : styles.disabled]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={canGoForward ? 0.2 : 1}
          onPress={canGoForward ? onForward : noop}
        >
          <View style={styles.button}>
            <Icon
              name="chevron-right"
              style={[styles.icon, canGoForward ? {} : styles.disabled]}
            />
          </View>
        </TouchableOpacity>
        <TextInput
          ref={r => {
            this.input = r;
          }}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={[styles.input, this.state.focused ? styles.inputActive : {}]}
          onChangeText={this.handleChange}
          value={this.state.text}
          selectTextOnFocus
          onSubmitEditing={this.handleSubmit}
        />
        <TouchableOpacity
          onPress={this.handleCancel}
          style={[
            styles.compress,
            this.state.focused ? styles.compressActive : {},
          ]}
        >
          <View style={styles.button}>
            <Icon name="compress" style={styles.icon} />
          </View>
        </TouchableOpacity>
        {this.state.editing &&
          <AutoComplete value={this.state.text} onDone={this.handleDone} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 5,
    flexDirection: 'row',
    position: 'relative',
    shadowColor: '#555',
    shadowOffset: { height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    width: Dimensions.get('window').width,
    zIndex: 100,
  },
  button: {
    height: 40,
    width: 40,
    flex: 0,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  compress: {
    position: 'absolute',
    right: -45,
    top: 5,
  },
  compressActive: {
    right: 0,
  },
  icon: {
    color: '#555',
    textAlign: 'center',
  },
  disabled: {
    color: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
  },
  inputActive: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 50,
    bottom: 5,
    height: '100%',
  },
});

export default connect(state => ({
  url: state.app.url,
  location: state.app.location,
  canGoBack: state.app.canGoBack,
  canGoForward: state.app.canGoForward,
}))(UrlBar);
