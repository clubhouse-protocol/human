import React, { FunctionComponent, useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import useChannel, { Provider } from '../../useChannel';
import parseMessage from './parseMessage';

const HeaderHeight = 64;
const Wrapper = styled.View`
  ${() => (Platform.OS === 'web' ? `min-height: ${Dimensions.get('window').height - HeaderHeight}px;` : '')}
`;

const ChannelUnbound: FunctionComponent = () => {
  const [text, setText] = useState();
  const channel = useChannel();
  if (!channel) {
    return null;
  }
  const { messages, send, update } = channel;

  useEffect(() => {
    // update();
  });

  const sendMsg = async () => {
    await send(text);
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

const Channel: FunctionComponent = () => (
  <Provider name="test">
    <ChannelUnbound />
  </Provider>
);

export default Channel;
