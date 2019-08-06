interface DB {
  getIdentityKey: () => Promise<string | undefined>;
  setIdentityKey: (key: string) => Promise<void>;
  getChannelKeys: () => Promise<{[name: string]: string}>;
  setChannelKey: (name: string, key: string) => Promise<void>;
}

export default DB;
