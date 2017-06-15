import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Content extends Component {
  render() {
    const style = {
      backgroundColor: '#3498db',
      position: 'absolute',
      top: 0,
      left: 0,
      height: 3,
      width: `${100 * this.props.progress}%`,
    };
    return <View style={style} />;
  }
}
