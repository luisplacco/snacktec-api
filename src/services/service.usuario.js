import repositoryUsuario from "../repositories/repository.usuario.js";
import bcrypt from "bcrypt";
import jwt from "../token.js";

async function Favoritos(id_usuario) {

    const favoritos = await repositoryUsuario.Favoritos(id_usuario);

    return favoritos;
}

async function Inserir(nome, email, senha, ra) {
    
    const validarUsuario = await repositoryUsuario.ListarByRa(ra);

    if(validarUsuario.id_usuario)
        throw "ja existe uma conta criada com esse RA";
    


    const hashSenha = await bcrypt.hash(senha, 10);
    
    const usuario = await repositoryUsuario.Inserir(nome, email, hashSenha, ra);

    usuario.token = jwt.CreateJWT(usuario.ID_USUARIO);

    return usuario;
}

async function Login(ra, senha) {
    const usuario = await repositoryUsuario.ListarByRa(ra);
    if (usuario.length == 0 )
        return[];
    else{
        if (await bcrypt.compare(senha, usuario.SENHA)) {

            delete usuario.SENHA;
            usuario.token = jwt.CreateJWT(usuario.ID_USUARIO); // Certifique-se que é 'id_usuario'  // Remove a senha do objeto retornado
            return usuario;
        }
        else
            return [];
    }
}

async function Perfil(id_usuario) {

    const usuario = await repositoryUsuario.ListarById(id_usuario);

    return usuario;
}


export default { Favoritos, Inserir, Login, Perfil };