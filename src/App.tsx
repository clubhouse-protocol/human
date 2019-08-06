import React from 'react';
import Transporter from 'clubhouse-protocol/build/babel/Transporter';
import { Provider } from './useData';
import Router from './screens/Router';
import db from './db/index.web';

class AppTransporter implements Transporter {
  private _data: {[name: string]: string} = {};

  async get(id) {
    return localStorage.getItem(`msg_${id}`);
  }

  async add(id, value) {
    console.log('save', id, value);
    localStorage.setItem(`msg_${id}`, value);
  }
}

const transporter = new AppTransporter();

export default function App() {
  return (
    <Provider db={db} transporter={transporter}>
      <Router />
    </Provider>
  );
}
