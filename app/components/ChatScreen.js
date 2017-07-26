import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	Dimensions
} from 'react-native';
import { createSelector } from 'reselect';

import {
  history,
  publishMessage,
  publishTypingState,
  subscribe,
} from '../services/pubnub';

import { connectionActions, conversationActions } from '../actions';

import { channel } from '../constants';

import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';

import styles from '../styles';

export default class ChatScreen extends Component {
	constructor () {
		super();

		this.state = {
			subscription: null,
			menuOpen: false,
		}
	}

	render() {
    console.log(this.props);
	  const {
	    history,
	    typingUsers,
	    userId,
	    selectedChannel,
	  } = this.props;

	  const absStretch = {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	  };

	  const containerStyle = Object.assign({}, absStretch, {
	    backgroundColor: 'white',
	  });

	  return (
	    <View style={[styles.flx1, styles.flxCol, styles.selfStretch]}>
	      <View style={containerStyle}>
	        <ChatHistory ref="chatHistory" history={history} fetchHistory={() => this.fetchHistory()} />
          <ChatInput
            user={userId}
            setTypingState={typing => this.onTypingStateChanged(typing)}
            publishMessage={message => this.onPublishMessage(message)} />
	      </View>
	    </View>
	  );
	}

  componentDidMount() {
    this.subscribeToChannel();
    this.fetchHistory();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.state.subscription.unsubscribe();
      this.setState({ subscription: null });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.history.length !== this.props.history.length) {
      return true;
    }

    return false;
  }

  subscribeToChannel() {
    const channel = this.props.selectedChannel.name;

    this.setState({
      subscription: subscribe(
        channel,
        p => this.onPresenceChange(p),
        m => this.onMessageReceived(m)
      )
    });
  }

  fetchHistory() {
    const { lastMessageTimestamp, selectedChannel, addHistory } = this.props;

    history(selectedChannel.name, lastMessageTimestamp).then(response => {
      // make sure we're not duplicating our existing history
      if (response.messages.length > 0 &&
          lastMessageTimestamp !== response.startTimeToken) {
        addHistory(response.messages, response.startTimeToken)
      }
    });
  }

  onTypingStateChanged(typing) {
    const { selectedChannel, userId } = this.props;

    const channel = selectedChannel.name;

    publishTypingState(channel, userId, typing);
  }

  onMessageReceived(obj) {
    this.props.addMessage(obj.message);
  }

  onPresenceChange(presenceData) {
    const { startTyping, stopTyping } = this.props;

    switch (presenceData.action) {
      case 'join':
        break;
      case 'leave':
      case 'timeout':
        break;
      case 'state-change':
        if (presenceData.state) {
          if (presenceData.state.isTyping === true) {
            startTyping(presenceData.state.userId);
          }
          else {
            stopTyping(presenceData.state.userId);
          }
        }
        break;
      default:
        break;
    }
  }

  onPublishMessage(message) {
    const channel = this.props.selectedChannel.name;

    publishMessage(channel, message)
      .catch(error => {
        console.error('Failed to publish message:', error);
      });
  }
}

const getConversation = state => {
  return Object.assign({},
    state.conversation.toJS(),
    {
      typingUsers: state.conversation.get('typingUsers').toArray(),
    }
  )
};

const makeGetConversationState = () => createSelector(
  getConversation,
  (conversation) => conversation
)

const makeMapStateToProps = () => {
  const getConversationState = makeGetConversationState()
  return (state) => getConversationState(state);
}

export const Conversation = connect(
  makeMapStateToProps,
  Object.assign({}, conversationActions, {
    disconnect: connectionActions.disconnect})
  )(ChatScreen);