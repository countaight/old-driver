/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';

import TabsRootContainer from './app/containers/tabsRootContainer';
import store from './app/store';


class NoelDriver extends Component {
  render() {
    return (
      <Provider store={store}>
        <TabsRootContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('NoelDriver', () => NoelDriver);
