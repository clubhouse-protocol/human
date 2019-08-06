import { loadChannel, Identity, Channel } from 'clubhouse-protocol';
import Transporter from 'clubhouse-protocol/build/babel/Transporter';
import DB from './DB';

const setupChannels = async (identity: Identity, transporter: Transporter, db: DB) => {
  const keys = await db.getChannelKeys();
  const channels = await Promise.all(Object.keys(keys).map(async key => ({
    key,
    channel: await loadChannel(identity, keys[key], transporter),
  })));
  return channels.reduce((output, current) => ({
    ...output,
    [current.key]: current.channel,
  }), {} as {[name: string]: Channel});
};

export default setupChannels;
