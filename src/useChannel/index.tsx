import React, {
  createContext,
  FunctionComponent,
  useState,
  useContext,
} from 'react';
import { ContextType, Props } from './types';
import useData from '../useData';

const context = createContext<ContextType | undefined>(undefined);

const Provider: FunctionComponent<Props> = ({
  name,
  children,
}) => {
  const { Provider: ContextProvider } = context;
  const appData = useData();
  if (!appData) return null;
  const channel = appData.channels ? appData.channels[name] : undefined;
  const [messages, setMessages] = useState([]);

  const update = async () => {
    setMessages([
      ...await channel.update(),
      ...messages,
    ]);
  };

  const send = async (text: string) => {
    const newMsg = await channel.send({
      type: 'message',
      text,
    });
    setMessages([
      ...newMsg,
      ...messages,
    ]);
  };

  return (
    <ContextProvider
      value={{
        name,
        channel,
        messages,
        send,
        update,
      }}
    >
      {children}
    </ContextProvider>
  );
};

const useChannel = () => {
  const data = useContext(context);
  return data;
};

export {
  Provider,
};

export default useChannel;
