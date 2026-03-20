import { useEffect, useState } from 'react';

function App() {
  const [stateOn, setStateOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('http://localhost:4000/api/state');
        const data = await response.json();
        setStateOn(Boolean(data.state_on));
      } catch (e) {
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
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>React toggle frontend</h1>
      <p>Backend state_on is: <strong>{String(stateOn)}</strong></p>
      <button onClick={toggle} disabled={loading}>
        {loading ? 'Loading...' : 'Toggle backend state_on'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
