import './platform/setup';
import React, { useState, useEffect } from 'react';
import Transporter from 'clubhouse-protocol-transporter-socket';
import { Provider as DBProvider } from './hooks/useDB';
import Router from './screens/Router';

export default function App() {
  const [transporter, setTransporter] = useState<Transporter>();
  useEffect(() => {
    Promise.resolve().then(async () => {
      const t = new Transporter('http://localhost:5000');
      await t.setup();
      setTransporter(t);
    });
  }, []);

  if (!transporter) {
    return null;
  }

  return (
    <DBProvider transporter={transporter}>
        <Router />
    </DBProvider>
  );
}
