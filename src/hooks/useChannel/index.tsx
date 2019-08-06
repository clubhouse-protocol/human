import useDB from "../useDB";

const useChannel = (name: string) => {
  const { channels } = useDB();
  const channel = channels.find(channel => channel.name === name);
  return {
    channel: channel.channel,
  }
};

export default useChannel;