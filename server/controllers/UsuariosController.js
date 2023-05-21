const db = require('../db/dbConfig');
const table = "usuario";
const table_usina = "usina";
const table_inversor = "inversor";
const table_Motobomba ="moto_bomba";
const table_energia = "Energia_I_R";
const table_dimensionamento = "dimensionamento_bateria";
const table_TamanhoUsina = "tamanho_usina";
const table_final = "final_I_R"; 


module.exports = {
  async loginUser(req, res) {
    const { email, senha } = req.body;

    const sqlSearch = `SELECT email, senha FROM ${table} WHERE email = '${email}' AND senha = '${senha}'`;

    db.query(sqlSearch, (err, result) => {
      if(err) throw err;
      if(result.length <= 0) {
        return res.json({status: false});
      } else {
        return res.json({status: true});
      }
    });
  },

  async registerUser(req, res) {
    const { email, senha, nome, cpf, telefone } = req.body;
    
    const sqlRegister = `INSERT INTO ${table} VALUES(null, '${nome}', '${email}', '${cpf}','${senha}', '${telefone}')`;
    
    db.query(sqlRegister, (err, result) => {
      if(err) return res.json({status: false});
      return res.json({status: true});
    });

  }, 
  
  async usina(req, res) {
    const { tensaoMaxima, tensaoSemFuncionamento, correnteDoModulo, correnteFuncionamento } = req.body;
    
    const sqlUsina = `INSERT INTO ${table_usina} VALUES( null,'${tensaoMaxima}', '${tensaoSemFuncionamento}', '${correnteDoModulo}','${correnteFuncionamento}')`;
 
    db.query(sqlUsina, (err, result) => {
      if(err) throw err;
      return res.json({status: false});
    });

  },
  async inversor(req, res) {
    const {unidadePotencia,potenciaMotor,fatorPotencia} = req.body;
    
    const sqlInversor = `INSERT INTO ${table_inversor} VALUES( null,'${unidadePotencia}', '${potenciaMotor}', '${fatorPotencia}')`;
 
    db.query(sqlInversor, (err, result) => {
      if(err) throw err;
      return res.json({status: false});
      });

  },

  async moto_bomba(req, res) {
    const {tipo_bomba, alturasuccao,alturarecalque,nivel_dinamic,comprimentototal, perdacarga} = req.body;
    
    const sqlMotobomba = `INSERT INTO ${table_Motobomba} VALUES(null,'${tipo_bomba}', '${alturasuccao}', '${alturarecalque}','${nivel_dinamic}','${comprimentototal}','${perdacarga}')`;
 
    db.query(sqlMotobomba, (err, result) => {
      if(err) throw err;
      return res.json({status: false});
      });
  

}  ,
async itens(req, res) {
  const {item,potenciaNominal,quantidade, horasUso} = req.body;
  
  const sqlItens = `INSERT INTO ${table_energia} VALUES( null, '${item}', '${potenciaNominal}','${quantidade}','${horasUso}')`;

  db.query(sqlItens, (err, result) => {
    if(err) throw err;
    return res.json({status: false});
    });


}  ,

async dimensionamento(req, res) {
  const {quantidadedias, profundidade, eficiencia} = req.body;
  
  const sqlDimensionamento = `INSERT INTO ${table_dimensionamento} VALUES(null,'${quantidadedias}', '${profundidade}', '${eficiencia}')`;

  db.query(sqlDimensionamento, (err, result) => {
    if(err) throw err;
    return res.json({status: false});
    });


},

async tamanhousina(req, res) {
  const {horasSol} = req.body;
  
  const sqltamanhousina = `INSERT INTO ${table_TamanhoUsina} VALUES( null,'${horasSol}')`;

  db.query(sqltamanhousina, (err, result) => {
    if(err) throw err;
    return res.json({status: false});
    });


}






}