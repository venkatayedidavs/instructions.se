import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const spinnerStyle = {
    width: '80px',
    height: '80px',
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #ff6b35',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '20px auto'
  };

  const containerStyle = {
    fontFamily: 'system-ui, sans-serif',
    textAlign: 'center',
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    color: '#333'
  };

  const titleStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#ff6b35',
    fontWeight: 'bold'
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#666'
  };

  const messageStyle = {
    fontSize: '1.1rem',
    color: '#888',
    maxWidth: '500px',
    lineHeight: '1.6'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <main style={containerStyle}>
        <h1 style={titleStyle}>🚧 Under Construction 🚧</h1>
        <h2 style={subtitleStyle}>instructions.se</h2>
        
        <div style={spinnerStyle}></div>
        
        <p style={messageStyle}>
          We're working hard to bring you something amazing! 
          Our website is currently under construction. 
          Please check back soon for updates.
        </p>
        
        <p style={{...messageStyle, marginTop: '2rem', fontSize: '0.9rem'}}>
          Thank you for your patience! 🛠️
        </p>
      </main>
    </>
  );
}

const rootEl = document.getElementById('root');
createRoot(rootEl).render(<App />);
