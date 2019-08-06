import useDB from "./useDB";

const useChannels = () => {
  const { channels, addChannel } = useDB();

  return {
    channels,
    addChannel
  };
};

export default useChannels;
