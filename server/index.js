const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 4000;

const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, (err) => { 
  if(err) throw err;
  console.log(`Servidor foi iniciado na porta ${PORT}!`);
});