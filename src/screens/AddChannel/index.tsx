import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import { NavigationInjectedProps, NavigationParams } from 'react-navigation';
import useChannel from '../../hooks/useChannel';
import { loadIdentity } from 'clubhouse-protocol';
import useChannels from '../../hooks/useChannels';

const HeaderHeight = 64;
const Wrapper = styled.View`
  ${() => (Platform.OS === 'web' ? `min-height: ${Dimensions.get('window').height - HeaderHeight}px;` : '')}
`;


const Name = styled.TextInput`
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
  const [name, setName] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [text, setText] = useState('');
  const { loadChannel, addChannel } = useChannels();

  const pack = () => {
    Promise.resolve().then(async () => {
      if (!pubKey || !text) {
        await addChannel(name);
      } else {
        await loadChannel(name, pubKey, text);
      }
    });
  };

  return (
    <Wrapper>
      <Name
        value={name}
        placeholder="Name"
        onChangeText={setName}
      />
      <PublicKey
        value={pubKey}
        placeholder="Sender key"
        multiline
        onChangeText={setPubKey}
      />
      <PackedKey
        value={text}
        placeholder="Invitation"
        multiline
        onChangeText={setText}
      />
      <Button
        title="Add"
        onPress={pack}
      />
    </Wrapper>
  );
};

export default ShareKey;
