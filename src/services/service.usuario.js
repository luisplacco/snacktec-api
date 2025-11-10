import repositoryUsuario from "../repositories/repository.usuario.js";
import bcrypt from "bcrypt";
import jwt from "../token.js";

async function Favoritos(id_usuario) {

    const favoritos = await repositoryUsuario.Favoritos(id_usuario);

    return favoritos;
}

async function Inserir(nome, email, senha, ra /*, tipo removed */) {
  const validarUsuario = await repositoryUsuario.ListarByRa(ra);
  if (validarUsuario && (validarUsuario.ID_USUARIO || validarUsuario.id_usuario))
    throw new Error("ja existe uma conta criada com esse RA");

  const hashSenha = await bcrypt.hash(senha, 10);

  // força 'aluno' — o cliente não pode escolher admin
  const tipoFinal = 'aluno';

  const usuario = await repositoryUsuario.Inserir(nome, email, hashSenha, ra, tipoFinal);

  const idUsuario = usuario.ID_USUARIO ?? usuario.id_usuario;
  usuario.token = jwt.CreateJWT(idUsuario, tipoFinal);
  delete usuario.SENHA;
  return usuario;
}

    async function Login(ra, senha) {
  const usuario = await repositoryUsuario.ListarByRa(ra);
  console.log("DEBUG Login - usuario do DB:", usuario); // <-- verifique aqui o campo TIPO

  if (!usuario) return [];

  const hash = usuario.SENHA ?? usuario.senha;
  if (!hash) return [];

  if (await bcrypt.compare(senha, hash)) {
    // garantir que pegamos o tipo do DB, trim e fallback seguro
    const tipoUsuarioRaw = usuario.TIPO ?? usuario.tipo ?? '';
    const tipoUsuario = String(tipoUsuarioRaw).trim() || 'aluno';

    delete usuario.SENHA;
    delete usuario.senha;

    usuario.token = jwt.CreateJWT(usuario.ID_USUARIO ?? usuario.id_usuario, tipoUsuario);
    usuario.TIPO = tipoUsuario;
    return usuario;
  } else {
    return [];
  }
}

async function Perfil(id_usuario) {

    const usuario = await repositoryUsuario.ListarById(id_usuario);

    return usuario;
}


export default { Favoritos, Inserir, Login, Perfil };