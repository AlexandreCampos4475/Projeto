const express = require('express');
const routes = express.Router();

const UsuariosC = require('./controllers/UsuariosController');

routes.post('/login', UsuariosC.loginUser);
routes.post('/register', UsuariosC.registerUser);
routes.post('/usina', UsuariosC.usina);
routes.post('/inversor', UsuariosC.inversor);
routes.post('/moto_bomba', UsuariosC.moto_bomba);
routes.post('/itens', UsuariosC.itens);
routes.post('/dimensionamento', UsuariosC.dimensionamento);
routes.post('/tamanhousina', UsuariosC.tamanhousina);



module.exports = routes;