import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(8081, () => {
  console.log(`Server running on port 8081`);
});

