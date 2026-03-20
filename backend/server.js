const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

let state_on = false;

app.post('/api/toggle', (req, res) => {
  if (req.body && typeof req.body.state === 'boolean') {
    state_on = req.body.state;
  } else {
    state_on = !state_on;
  }
  res.json({ success: true, state_on });
});

app.get('/api/state', (req, res) => {
  res.json({ state_on });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
