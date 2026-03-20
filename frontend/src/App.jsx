import { useEffect, useState } from 'react';
import './App.css';

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
    <div className="App">
      <div className="AppContainer">
        <h1>React toggle frontend</h1>
        <p className="status">Backend state_on is: <strong>{String(stateOn)}</strong></p>
        <button onClick={toggle}>
          {loading ? 'Loading…' : 'Toggle backend state_on'}
        </button>
        <p>Button is always visible. Click toggles backend value.</p>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
