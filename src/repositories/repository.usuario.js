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

async function Inserir(nome, email, senha, ra) {
   const sql = `insert into USUARIO (NOME, EMAIL, SENHA, RA) values (?, ?, ?, ?) returning id_usuario`;
  let usuario = await execute(sql, [nome, email, senha, ra]);
    
  
 
  
  return usuario[0];
}


async function ListarByRa (ra){


    let sql = `SELECT id_usuario, senha, nome,email,ra FROM USUARIO WHERE RA = ?`;


   const usuarios =  await execute(sql, [ra]);

    if (usuarios.length ==0)
      return[];
    else
      return usuarios[0];

    }


    async function ListarById (id_usuario){


    let sql = `SELECT id_usuario, nome,email,ra FROM USUARIO WHERE id_usuario = ?`;


   const usuarios =  await execute(sql, [id_usuario]);

    if (usuarios.length ==0)
      return[];
    else
      return usuarios[0];

    }


export default {Favoritos, Inserir, ListarByRa,ListarById};