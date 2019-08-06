import useDB from "./useDB";
import { useEffect, useState } from "react";
import useChannel from "./useChannel";
import { Message } from "../db/db";

const useMessages = (channelName : string) => {
  const {
    db,
  } = useDB();
  const { channel } = useChannel(channelName);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const subscription = db.messages.find({}).$.subscribe((documents) => {
      setMessages(documents.map(message => message.toJSON()))
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = async (text: string) => {
    return channel.send({
      type: 'message',
      text,
    });
  };

  const update = async () => {
    return channel.update();
  }

  return {
    messages,
    channel,
    sendMessage,
    update,
  };
};

export default useMessages;