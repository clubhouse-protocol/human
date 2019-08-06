import { RxJsonSchema } from "rxdb";

interface Identity {
  id: string;
  key: string;
}

const identitySchema: RxJsonSchema<Identity> = {
  title: 'Identity',
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
  Identity,
};

export default identitySchema;
