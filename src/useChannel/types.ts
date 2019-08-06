import { Channel } from 'clubhouse-protocol';
import { ReactNode } from 'react';

interface ContextType {
  channel: Channel;
  update: () => Promise<any>
  name: string;
  send: (text: string) => Promise<any>
  messages: (Error | any)[]
}

interface Props {
  name: string;
  children: ReactNode;
}

export {
  ContextType,
  Props,
};
