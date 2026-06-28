'use client';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 EchoPost</h1>
      <p>Privacy-first publishing platform powered by Midnight Protocol</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Features</h2>
        <ul>
          <li>Connect social & content accounts once (OAuth)</li>
          <li>Encrypted credential storage</li>
          <li>Publish to multiple platforms simultaneously</li>
          <li>Privacy-first with Midnight Protocol</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Supported Platforms</h2>
        <ul>
          <li>Medium</li>
          <li>Twitter / X</li>
          <li>LinkedIn</li>
          <li>Devpost</li>
          <li>Notion</li>
        </ul>
      </section>

      <button 
        style={{ 
          padding: '0.5rem 1rem', 
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Connect OAuth accounts')}
      >
        Connect Accounts
      </button>
    </main>
  );
}
