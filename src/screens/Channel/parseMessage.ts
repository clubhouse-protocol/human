import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'clubhouse-protocol/build/babel/Identity';

const parseMessage = (message: Error | Message<any>, index: number): IMessage => {
  const result: IMessage = {
    _id: index,
    createdAt: new Date(),
    text: 'unknown',
    user: {
      _id: 1,
    },
    system: true,
  };

  if (message instanceof Error) {
    result.text = message.message;
    return result;
  }
  result.system = false;
  result.user._id = message.sender.fingerprint;
  result.user.name = message.sender.fingerprint;
  if (message.data.type === 'message') {
    result.text = message.data.text;
  }

  return result;
};

export default parseMessage;
