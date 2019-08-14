import { IMessage } from 'react-native-gifted-chat';
import { Message, MessageType } from '../../db/db';

const parseMessage = (message: Message): IMessage => {
  console.log('m', message);
  const result: IMessage = {
    _id: message.id,
    createdAt: new Date(message.received),
    text: 'unknown',
    user: {
      _id: message.sender || 'system',
      name: message.sender,
    },
    system: false,
  };

  if (message.type === MessageType.MESSAGE && message.data.text) {
    result.text = message.data.text;
  } else {
    result.text = JSON.stringify(message.data);
  }

  return result;
};

export default parseMessage;
