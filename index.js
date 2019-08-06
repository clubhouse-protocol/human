import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake'; // eslint-disable-line import/no-extraneous-dependencies

import App from './src/App.tsx';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);
