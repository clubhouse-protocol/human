import { createStackNavigator, createAppContainer } from 'react-navigation';
import Channels from './Channels';
import Channel from './Channel';

const AppNavigator = createStackNavigator({
  Channels: {
    screen: Channels,
  },
  Channel: {
    screen: Channel,
  },
});

export default createAppContainer(AppNavigator);
