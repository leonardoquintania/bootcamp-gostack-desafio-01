const express = require('express');
const app = express();

app.use(express.json());
projects = []; //-- Declaração de array vazio que irá armazenar os projeto na memória
requisitionNumber = 0 //-- Numero de requisições

//============================================================================================
//-- Middleware Global                                                                       |
//============================================================================================
app.use((request, response, next) => {
  console.time("Tempo de requisição");
  console.log(`Método: ${request.method};URL: ${request.url}`);
  console.timeEnd("Tempo de requisição");
  ++requisitionNumber;
  console.log(`Total de requisições até o momento foram ${requisitionNumber}`)
  next()
});

//============================================================================================
//-- Middleware de Rota                                                                       |
//============================================================================================
checkIdExists = (request, response, next) => {
  if (searchById(projects, request.params.id) == -1) { //-- Efetua teste para validar se encontrou o id solicitado.
    return response.status(400).json({ error: 'Id does not exists' });
  }
  return next();
}

//============================================================================================
//-- Inclusão de um projeto                                                                  |
//============================================================================================
app.post('/projects', (request, response) => {
  const { body } = request;
  body.tasks = new Array();
  projects.push(body);
  return response.json(projects);
});

//============================================================================================
//-- Leitura de um projeto                                                                  |
//============================================================================================
app.get('/projects', (request, response) => {
  return response.json(projects);
});

//============================================================================================
//-- Alteração de um projeto                                                                 |
//============================================================================================
app.put('/projects/:id', checkIdExists, (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const index = searchById(projects, id); //-- Procura posição no array de projetos
  projects[index] = body;
  return response.json({ projects });
});

//============================================================================================
//-- Exclusão de um projeto                                                                  |
//============================================================================================
app.delete('/projects/:id', checkIdExists, (request, response) => {
  const { id } = request.params;
  const index = searchById(projects, id); //-- Procura posição no array de projetos
  projects.splice(index, 1);
  return response.json({ projects });
});

//============================================================================================
//-- Inclusão de nova tarefa                                                                 |
//============================================================================================
app.post('/projects/:id/tasks', checkIdExists, (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const index = searchById(projects, id); //-- Procura posição no array de projetos
  projects[index].tasks.push(body);
  return response.json({ projects });
});

//============================================================================================
//-- Função genérica responsável devolver a posição do indice que está um id                 |
//============================================================================================
function searchById(arrayObjects, expression) {
  return arrayObjects.findIndex(object => object.id == expression);
}

app.listen(3000);