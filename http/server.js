const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = '6b5a66b34f4393cc19882d3e458b07bd';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

app.get('/status', async (req, res) => {
  try {
    const city = req.query.city || 'Vitebsk';
    const response = await axios.get(`${baseUrl}weather`, {
      params: {
        q: city,
        appid: apiKey,
      },
    });
    res.json({ status: response.status, data: response.data });
  } catch (error) {
    if (error.response) {
      res.json({ status: error.response.status, data: error.response.data });
    } else {
      res.json({ status: 500, data: 'Internal Server Error' });
    }
  }
});

app.get('/status100', (req, res) => {
  res.status(100).send('Continue');
});

app.get('/status300', (req, res) => {
  res.status(300).send('Multiple Choices');
});

app.get('/status400', (req, res) => {
  res.status(400).send('Bad Request');
});

app.get('/status500', (req, res) => {
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
