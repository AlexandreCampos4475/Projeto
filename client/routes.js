const express = require('express');


const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Ca@44751882',
  database : 'proteto_tcc'
});

const app = express();

 //criptografica sha 256
app.get('/users', function(req,res)

{


    connection.getConnection(function(err,connection){
        connection.query('SELECT * FROM users', function (error, results, fields) {
            // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;
            
            // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
            res.send(results)
          });
        });
      });
      
      // Iniciando o servidor.
      app.listen(3000, () => {
       console.log('Vai no navegador e entra em http://localhost:3000/users pra ver os usuários cadastrados.');
      });

