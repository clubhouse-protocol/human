import { IMessage } from 'react-native-gifted-chat';
import { Message, MessageType } from '../../db/db';

const parseMessage = (message: Message): IMessage => {
  const result: IMessage = {
    _id: message.id,
    createdAt: new Date(message.received),
    text: 'unknown',
    user: {
      _id: message.sender || 'system',
    },
    system: true,
  };

  if (message instanceof Error) {
    result.text = message.message;
    return result;
  }
  result.system = false;
  if (message.type === MessageType.MESSAGE) {
    result.text = message.data.text;
  }

  return result;
};

export default parseMessage;
