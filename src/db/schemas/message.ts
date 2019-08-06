import * as RxDB from 'rxdb';

enum MessageType {
  MESSAGE = 'MESSAGE',
  ERROR = 'ERROR',
};

interface Message<Type = any> {
  id: string;
  type: MessageType;
  received: number;
  sender?: string;
  data: Type;
}

const message: RxDB.RxJsonSchema<Message> = {
  title: 'Message',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    type: {
      type: 'string',
      enum: Object.keys(MessageType),
    },
    sender: {
      type: 'string',
    },
    received: {
      type: 'number',
    },
    data: {
      type: 'object',
    },
  },
};

export {
  MessageType,
  Message,
};

export default message;
