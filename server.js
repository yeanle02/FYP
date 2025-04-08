const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/predict', (req, res) => {
  const { home_team, away_team, round, venue, year = 2024, maxtemp = 20, mintemp = 10 } = req.body;

  const python = spawn('python3', ['predict.py', home_team, away_team, round, venue, year, maxtemp, mintemp]);

  let result = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on('close', (code) => {
    try {
      const prediction = JSON.parse(result);
      res.json(prediction);
    } catch (err) {
      console.error('Failed to parse Python output', err);
      res.status(500).json({ error: 'Failed to get prediction' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// fetch('http://localhost:5000/predict', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       home_team: homeTeam,
//       away_team: awayTeam,
//       round: round,
//       venue: venue,
//       year: 2024,
//       maxtemp: 20,
//       mintemp: 10
//     })
//   });