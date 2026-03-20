import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stateOn, setStateOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('http://localhost:4000/api/state');
        if (!response.ok) throw new Error('fetch failed');
        const data = await response.json();
        setStateOn(Boolean(data.state_on));
        setConnected(true);
      } catch (e) {
        setConnected(false);
        setError('Unable to fetch state from backend');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function toggle() {
    try {
      setError('');
      const desiredState = !stateOn;
      const response = await fetch('http://localhost:4000/api/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: desiredState }),
      });
      const data = await response.json();
      setStateOn(Boolean(data.state_on));
    } catch (e) {
      setError('Unable to toggle backend state');
    }
  }

  return (
    <div className="App">
      <div className="AppContainer">
        <h1>React toggle frontend</h1>
        <p className="status">Backend state_on is: <strong>{String(stateOn)}</strong></p>
        <button onClick={toggle}>
          {loading ? 'Loading…' : 'Toggle backend state_on'}
        </button>
        <p>Button is always visible. Click toggles backend value.</p>
        {error && <p className="error">{error}</p>}
        <div className={`connectionIndicator ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? 'Connected to server' : 'Disconnected'}
        </div>
        <pre style={{textAlign: 'left', marginTop: '14px', background: '#f6f8fa', color: '#111', padding: '12px', borderRadius: '8px', fontSize: '0.85rem'}}>
          {JSON.stringify({ loading, connected, error, stateOn }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
