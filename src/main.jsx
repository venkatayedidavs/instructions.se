import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <main style={{fontFamily: 'system-ui, sans-serif', padding: '2rem'}}>
      <h1>Hello World</h1>
      <p>instructions</p>
    </main>
  );
}

const rootEl = document.getElementById('root');
createRoot(rootEl).render(<App />);
