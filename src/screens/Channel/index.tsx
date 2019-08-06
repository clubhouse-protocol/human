import React, { FunctionComponent, useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import parseMessage from './parseMessage';
import { NavigationInjectedProps, NavigationParams } from 'react-navigation';
import useMessages from '../../hooks/useMessages';

const HeaderHeight = 64;
const Wrapper = styled.View`
  ${() => (Platform.OS === 'web' ? `min-height: ${Dimensions.get('window').height - HeaderHeight}px;` : '')}
`;

const Channel: FunctionComponent<NavigationInjectedProps<NavigationParams>> = ({
  navigation,
}) => {
  const [text, setText] = useState();
  const { messages, sendMessage, update } = useMessages(navigation.getParam('name'));

  useEffect(() => {
    update();
  }, []);

  const sendMsg = async () => {
    await sendMessage(text);
  };

  return (
    <Wrapper>
      <GiftedChat
        text={text}
        onInputTextChanged={text => setText(text)}
        messages={messages.map(parseMessage)}
        onSend={() => sendMsg()}
        placeholder="Type a message"
        user={{
          _id: 1,
        }}
      />
    </Wrapper>
  );
};

export default Channel;
