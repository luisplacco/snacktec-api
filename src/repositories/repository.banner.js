import { execute } from '../database/sqlite.js';

async function Listar() {
    const sql = "SELECT * FROM BANNER ORDER BY id_banner DESC";
    const banners = await execute(sql, []);
    return banners;
}

export default { Listar };