import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import { NavigationInjectedProps, NavigationParams } from 'react-navigation';
import useChannel from '../../hooks/useChannel';
import { loadIdentity } from 'clubhouse-protocol';

const HeaderHeight = 64;
const Wrapper = styled.View`
  ${() => (Platform.OS === 'web' ? `min-height: ${Dimensions.get('window').height - HeaderHeight}px;` : '')}
`;

const PublicKey = styled.TextInput`
  flex: 1;
`;

const PackedKey = styled.TextInput`
  flex: 1;
`;

const Button = styled.Button`
`;

const ShareKey: FunctionComponent<NavigationInjectedProps<NavigationParams>> = ({
  navigation,
}) => {
  const [pubKey, setPubKey] = useState('');
  const [text, setText] = useState('');
  const { channel } = useChannel(navigation.getParam('name'));

  const pack = () => {
    Promise.resolve().then(async () => {
      const identity = await loadIdentity(pubKey);
      await channel.send({
        type: 'ADD_MEMBER',
        key: pubKey,
      })
      setText(await channel.pack(identity));
    });
  };

  return (
    <Wrapper>
      <PublicKey
        value={pubKey}
        multiline
        onChangeText={setPubKey}
      />
      <Button
        title="Generate"
        onPress={pack}
      />
      <PackedKey
        value={text}
        multiline
      />
    </Wrapper>
  );
};

export default ShareKey;
