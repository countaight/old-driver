import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  ListView,
  Dimensions,
  Platform,
} from 'react-native';

import { Icon } from 'react-native-elements';

import styles from '../styles';

import { messageCount } from '../constants';

const renderMessage = (index, data) => {
  const msgDate = new Date(data.When);

  const msgDateTime = msgDate.toLocaleDateString() + ' at ' + msgDate.toLocaleTimeString();

  return (
    <View style={[styles.flx1, styles.flxRow, styles.p1, styles.borderBHl, {borderColor: '#aaa'}]} key={index}>
      <View style={[styles.mt1]}>
        <Text>{data.Who.split('@')[0]}</Text>
      </View>
      <View style={[styles.flxCol, styles.ml2]}>
        <View>
          <Text>{data.Who.split('@')[0]}</Text>
        </View>
        <View style={[styles.flxRow]}>
          <Icon name="alarm" size={14} />
          <Text style={[styles.f6, {marginLeft: 3}]}>{msgDateTime}</Text>
        </View>
        <View style={[styles.mt1]}>
          <Text>{data.What}</Text>
        </View>
      </View>
    </View>
  );
};

export class ChatHistory extends Component {
  constructor() {
    super();

    this.state = {
      loadingHistory: false,
    };
  }

  onScroll(e) {
    if (e.nativeEvent.contentOffset.y === 0) {
      this.setState({
        loadingHistory: true,
      });

      this.props.fetchHistory();
    }
  }

  scrollToNewMessages(contentHeight) {
    this.scrollHeight = contentHeight;

    let scrollOffset;
    if (this.state.loadingHistory) {
      this.setState({
        loadingHistory: false,
      });

      scrollOffset = 0;
    }
    else {
      scrollOffset = this.scrollHeight - this.viewHeight;
    }

    this.refs.scrollView.scrollTo({x: 0, y: scrollOffset, animate: true});
  }

  render() {
    const {history} = this.props;

    const messages = history.filter(h => h.Who && typeof h.Who === 'string');

    return (
      <View style={[styles.flx1, styles.flxRow, styles.selfStretch]}>
        <ScrollView ref="scrollView"
          onLayout={e => this.viewHeight = e.nativeEvent.layout.height}
          onContentSizeChange={(contentWidth, contentHeight) => this.scrollToNewMessages(contentHeight)}
          onScroll={this.onScroll.bind(this)}
          scrollEventThrottle={16}>
          {messages.length === 0 ?
            (<Text style={[styles.italic, styles.p2, styles.center]}>No messages</Text>) :
            messages.map((h, index) => renderMessage(index, h))}
        </ScrollView>
      </View>
    );
  }
}