import { Setup } from "./setup";
import * as RxDB from 'rxdb';

const adapter = require('pouchdb-adapter-idb').default;
console.log('foo');

const setup: Setup = () => {
  console.log('foo2');
  RxDB.plugin(adapter);
}

setup();
