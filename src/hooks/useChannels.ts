import useDB from "./useDB";

const useChannels = () => {
  const { channels, addChannel, loadChannel } = useDB();

  return {
    channels,
    addChannel,
    loadChannel,
  };
};

export default useChannels;
