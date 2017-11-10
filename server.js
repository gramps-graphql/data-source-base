const express = require('express');
const app = express();

function r() {
  return Math.floor(Math.random() * 10000)
}

let count = 0

app.get('/data/1234', (req, res) => {
  console.log('Request number #' + count);

  res.send(JSON.stringify({
    id: 1234,
    name: 'Example entity with random numbers',
    lucky_numbers: [
      r(),
      r(),
      r(),
      r(),
      r(),
      r(),
      r()
    ],
  }));
  count++;
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

