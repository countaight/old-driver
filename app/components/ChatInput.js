import React, {Component, PropTypes} from 'react';

import {
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import { Button, Icon } from 'react-native-elements';

import styles from '../styles';

export class ChatInput extends Component {
  constructor() {
    super();

    this.reset();
  }

  onChangeText(text) {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }

    const {setTypingState} = this.props;

    if (text == null || text.length === 0) {
      setTypingState(false);
    }
    else {
      this.timeout = setTimeout(() => setTypingState(false), 1500);

      setTypingState(true);
    }

    this.setState({value: text});
  }

  onSubmit(e) {
    const {props, state} = this;
    const value = state.value;
    if (value.length === 0) {
      return;
    }

    const messageObj = {
      Who: props.user,
      What: value,
      When: new Date().valueOf(),
    };

    props.setTypingState(false);
    props.publishMessage(messageObj);

    this.reset();
  }

  render() {
    const containerStyle = [
      styles.flx1,
      styles.flxCol,
      styles.bgBase,
      styles.pv1,
      styles.ph2,
      {maxHeight: 60},
    ];

    const inputStyle = [
      styles.white,
      styles.h3,
      styles.f5,
      styles.p0,
      styles.m0,
      {width: 220, borderBottomWidth: 0},
    ];

    const {user} = this.props;

    return (
      <View style={containerStyle}>
        <View style={[styles.flxRow, styles.jcStart]}>
          <View style={[styles.mt1]}>
            <Icon name="message" size={30} color="white" />
          </View>
          <View style={[styles.h3, styles.mh2, styles.borderBHl]}>
            <TextInput ref="input"
              style={{borderBottomColor: 'white'}}
              placeholder="Type your message" placeholderTextColor="#ccc"
              style={inputStyle}
              onChangeText={text => this.onChangeText(text)}
            />
          </View>
          <Button style={[ {backgroundColor: "#26a69a"}, styles.w3, styles.h3, styles.rounded, styles.border0 ]} onPress={() => this.onSubmit()}>
            <Icon name="send" size={25} color="white" />
          </Button>
        </View>
      </View>
    );
  }

  reset() {
    const initialState = {value: new String().valueOf()};
    if (this.state) {
      this.setState(initialState);
    }
    else {
      this.state = initialState;
    }

    if (this.refs.input) {
      this.refs.input.clear();
    }
  }
}

ChatInput.propTypes = {
  user: PropTypes.string,
  sendMessage: PropTypes.func,
  setTypingState: PropTypes.func,
};