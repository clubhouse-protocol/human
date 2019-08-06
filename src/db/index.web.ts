import DB from '../useData/DB';

const db: DB = {
  getIdentityKey: async () => localStorage.getItem('__id_key'),
  setIdentityKey: async (key: string) => localStorage.setItem('__id_key', key),
  getChannelKeys: async () => {
    const results: {[name: string]: string} = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      const [, name] = key.split('__channel_');
      if (name) {
        results[name] = localStorage.getItem(key);
      }
    }
    return results;
  },
  setChannelKey: async (name: string, key: string) => {
    localStorage.setItem(`__channel_${name}`, key);
  },
};

export default db;
