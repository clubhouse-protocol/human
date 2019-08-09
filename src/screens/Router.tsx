import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Channels from './Channels';
import Channel from './Channel';
import ShowKey from './ShowKey';
import ShareKey from './ShareKey';
import AddChannel from './AddChannel';
import { Button } from 'react-native';

const ChannelStack = createStackNavigator({
  Channels: {
    screen: Channels,
  },
  Channel: {
    screen: Channel,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <Button
          onPress={() => {
            const name = navigation.getParam('name');
            navigation.navigate({
              routeName: 'ShareKey',
              params: {
                name,
              },
            });
          }}
          title="Info"
        />
      ),
    }),
  },
  ShareKey: {
    screen: ShareKey,
  }
})

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: ChannelStack,
  },
  ShowKey: {
    screen: ShowKey,
  },
  AddChannel: {
    screen: AddChannel,
  },
});

export default createAppContainer(AppNavigator);
