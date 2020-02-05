const express = require('express');
const app = express();
const data = require('./data');

app.use(express.json());

const projects = [];

app.post('/projects', (request, response) => {
  const { body } = request;
  data.dataSave( body );
  return response.json(data.listProjects() );

});

app.listen(3000);