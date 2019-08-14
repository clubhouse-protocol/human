import React, { ReactNode } from 'react';
import { createContext, FunctionComponent, useState, useEffect, useContext } from "react";
import getDB, { DBType, MessageType } from "../db/db";
import { createIdentity, loadIdentity, Identity, loadChannel, Channel, createChannel } from 'clubhouse-protocol';
import Transporter from 'clubhouse-protocol/build/babel/Transporter';
import { Message } from 'clubhouse-protocol/build/babel/Identity';

interface ChannelType {
  name: string;
  channel: Channel;
}

interface ContextType {
  db: DBType;
  identity: Identity;
  channels: ChannelType[];
  addChannel: (name: string) => Promise<void>;
  loadChannel: (name: string, senderKey: string, channelKey: string) => Promise<void>;
}

const context = createContext<ContextType>(undefined);

const { Provider: ContextProvider } = context;

const setupIdentity = async (db: DBType) => {
  const document = await db.identities.findOne({}).exec();
  let key: string;
  if (!document) {
    key = await createIdentity({
      name: 'john doe',
      email: 'john.doe@example.com',
    });
    await db.identities.insert({
      id: 'key',
      key,
    });
  } else {
    key = document.key;
  }
  const identity = await loadIdentity(key);
  return identity;
};

const setupChannels = async (db: DBType, identity: Identity, transporter: Transporter) => {
  const documents = await db.channels.find().exec();
  const tasks = documents.map(async (document) => {
    const channel = await loadChannel(identity, document.key, transporter);
    const update = async () => {
      console.log('updated!1');
      const pack = await channel.pack();
      const entry = await db.channels.findOne({ id: document.id }).exec();
      await entry.update({
        $set: {
          key: pack,
        },
      });
      console.log('updated!');
    }
    channel.startAutoUpdate();
    channel.on('messageError', (err) => {
      console.log('err', err);
    });
    channel.on('message', async (msg: Error | Message<any> & { id: string }) => {
      if (msg instanceof Error) {
        /*await db.messages.insert({
          id: msg.message,
          received: new Date().getTime(),
          type: MessageType.ERROR,
          sender: 'system',
          channel: document.id,
          data: {
            text: msg.message,
          },
        });*/
        await update();
        return;
      }
      const id = `${msg.sender.fingerprint}-${msg.data.text}`;
      const exists = await db.messages.findOne({ id: msg.id }).exec();
      if (exists) {

        console.log('existed')
        return;
      }
      console.log('save', exists, msg.id)
      await db.messages.insert({
        id: msg.id || id,
        received: new Date().getTime(),
        type: MessageType.MESSAGE,
        channel: document.id,
        sender: msg.sender.fingerprint,
        data: {
          ...msg.data,
        },
      });
      await update();
    });
    return {
      name: document.id,
      channel,
    };
  });
  return Promise.all(tasks);
};

const Provider: FunctionComponent<{
  children: ReactNode;
  transporter: Transporter;
}> = ({
  children,
  transporter,
}) => {
  const [db, setDB] = useState<DBType>(undefined);
  const [identity, setIdentity] = useState<Identity>(undefined);
  const [channels, setChannels] = useState<ChannelType[]>(undefined);
  useEffect(() => {
    getDB()
    .then(async (db) => {
      setDB(db);
      const identity = await setupIdentity(db);
      setIdentity(identity);
      return { db, identity };
    })
    .then(async ({ db, identity }) => {
      setChannels(await setupChannels(db, identity, transporter));
    });
  }, []);

  const addChannel = async (name: string) => {
    const channelKey = await createChannel(identity, []);
    await db.channels.insert({
      id: name,
      key: channelKey,
    });
    const channel = await loadChannel(identity, channelKey, transporter);
    setChannels({
      ...channels,
      [name]: channel,
    });
  };

  const loadChannelI = async (name: string, senderKey: string, channelKey: string) => {
    const sender = await loadIdentity(senderKey);
    const channel = await loadChannel(identity, channelKey, transporter, sender);
    const packedKey = await channel.pack(identity)
    await db.channels.insert({
      id: name,
      key: packedKey,
    });
    setChannels({
      ...channels,
      [name]: channel,
    });
  };

  return (
    <ContextProvider
      value={{
        db,
        identity,
        channels,
        addChannel,
        loadChannel: loadChannelI,
      }}
    >
      {db && children}
    </ContextProvider>
  )
}

const useDB = () => {
  const db = useContext(context);
  return db;
}

export {
  Provider,
}

export default useDB;