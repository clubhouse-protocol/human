import { createIdentity, loadIdentity } from 'clubhouse-protocol';
import DB from './DB';


const setupIdentity = async (db: DB) => {
  let key = await db.getIdentityKey();
  if (!key) {
    key = await createIdentity({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await db.setIdentityKey(key);
  }
  const identity = await loadIdentity(key);
  return identity;
};

export default setupIdentity;
