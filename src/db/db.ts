import * as RxDB from 'rxdb';
import messageSchema, { Message, MessageType } from './schemas/message';
import identitySchema, { Identity } from './schemas/indentity';
import channelSchema, { Channel } from './schemas/channels';
import { RxCollection, RxDatabase } from 'rxdb';

interface DBType {
  db: RxDatabase;
  messages: RxCollection<Message>;
  identities: RxCollection<Identity>;
  channels: RxCollection<Identity>;
}

let dbCache: DBType | undefined;

const getDB = async (): Promise<DBType> => {
  if (!dbCache) {
    const db = await RxDB.create({
      name: 'clubhouse',
      adapter: 'idb',
    });

    const messages = await db.collection<Message>({
      name:'messages',
      schema: messageSchema,
    });

    const identities = await db.collection<Identity>({
      name:'identities',
      schema: identitySchema,
    });

    const channels = await db.collection<Channel>({
      name:'channels',
      schema: channelSchema,
    });

    dbCache = {
      db,
      messages,
      identities,
      channels,
    };
  }
  return dbCache;
}

export {
  MessageType,
  Message,
  Identity,
  DBType,
};

export default getDB;
