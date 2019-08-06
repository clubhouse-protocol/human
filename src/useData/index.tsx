import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from 'react';
import { createChannel, loadChannel } from 'clubhouse-protocol';
import setupIdentity from './setupIdentity';
import setupChannels from './setupChannels';
import { LoadState, ContextType, Props } from './types';

const context = createContext<ContextType>({
  status: LoadState.NOT_LOADED,
});

const Provider: FunctionComponent<Props> = ({
  db,
  transporter,
  children,
}) => {
  const { Provider: ProviderContext } = context;
  const [data, setData] = useState<ContextType>({
    status: LoadState.NOT_LOADED,
  });
  useEffect(() => {
    Promise.resolve()
      .then(async () => {
        const identity = await setupIdentity(db);
        const channels = await setupChannels(identity, transporter, db);
        const addChannel = async (name: string) => {
          const channelKey = await createChannel(identity);
          const channel = await loadChannel(identity, channelKey, transporter);
          setData({
            ...data,
            channels: {
              ...data.channels,
              [name]: channel,
            },
          });
          await db.setChannelKey(name, channelKey);
        };
        setData({
          status: LoadState.LOADED,
          identity,
          channels,
          addChannel,
        });
      })
      .catch((err) => {
        setData({
          status: LoadState.FAILED,
          error: err,
        });
      });
  }, []);

  return (
    <ProviderContext
      value={data}
    >
      {children}
    </ProviderContext>
  );
};

const useData = () => {
  const data = useContext(context);
  return data;
};

export {
  ContextType,
  Provider,
};

export default useData;
