import { RxJsonSchema } from "rxdb";

interface Channel {
  id: string;
  key: string;
}

const channelSchema: RxJsonSchema<Channel> = {
  title: 'Channel',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    key: {
      type: 'string',
    },
  },
};

export {
  Channel,
};

export default channelSchema;
