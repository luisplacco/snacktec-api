import {execute} from '../database/sqlite.js';


async function Favoritos (id_usuario){


    let sql = `SELECT 
  p.id_produto, 
  p.nome, 
  p.icone
FROM USUARIO_FAVORITO f
JOIN PRODUTO p 
  ON p.ID_PRODUTO = f.ID_PRODUTO
WHERE f.ID_USUARIO = ?
`;


   const favoritos =  await execute(sql, [id_usuario]);

    return favoritos;
}

async function Inserir(nome, email, senha, ra, tipo) {
  // usa insert normal e pega last_insert_rowid (mais compatível)
  const sqlInsert = `INSERT INTO USUARIO (NOME, EMAIL, SENHA, RA, TIPO) VALUES (?, ?, ?, ?, ?)`;
  await execute(sqlInsert, [nome, email, senha, ra, tipo]);

  // pega id inserido e retorna o usuário completo (incluindo TIPO)
  const r = await execute(`SELECT last_insert_rowid() AS id`);
  const id = r[0].id;
  const usuario = await execute(`SELECT ID_USUARIO, NOME, EMAIL, RA, TIPO FROM USUARIO WHERE ID_USUARIO = ?`, [id]);
  return usuario[0];
}


async function ListarByRa(ra){
  const sql = `SELECT ID_USUARIO, SENHA, NOME, EMAIL, RA, TIPO FROM USUARIO WHERE RA = ?`;
  const usuarios = await execute(sql, [ra]);
  if (!usuarios || usuarios.length === 0) return null;
  return usuarios[0];
}

async function ListarById(id_usuario){
  const sql = `SELECT ID_USUARIO, NOME, EMAIL, RA, TIPO FROM USUARIO WHERE ID_USUARIO = ?`;
  const usuarios = await execute(sql, [id_usuario]);
  if (!usuarios || usuarios.length === 0) return null;
  return usuarios[0];
}


export default {Favoritos, Inserir, ListarByRa,ListarById};