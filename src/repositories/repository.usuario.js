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


export default {Favoritos};