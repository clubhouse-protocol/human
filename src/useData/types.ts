import { Identity, Channel } from 'clubhouse-protocol';
import { ReactNode } from 'react';
import Transporter from 'clubhouse-protocol/build/babel/Transporter';
import DB from './DB';

enum LoadState {
  NOT_LOADED = 'LOADING',
  FAILED = 'FAILED',
  LOADED = 'LOADED',
}

interface ContextType {
  status: LoadState;
  identity?: Identity;
  channels?: {[name: string]: Channel};
  addChannel?: (name: string) => Promise<void>;
  error?: Error;
}

type SetData = React.Dispatch<React.SetStateAction<ContextType>>

interface Props {
  db: DB;
  children: ReactNode,
  transporter: Transporter,
}

export {
  LoadState,
  ContextType,
  Props,
  SetData,
};
