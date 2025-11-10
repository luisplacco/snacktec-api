import repositoryUsuario from "../repositories/repository.usuario.js";

function isAdministrador(tipo, usuarioDoBanco){
  const t = String(tipo ?? usuarioDoBanco?.TIPO ?? usuarioDoBanco?.tipo ?? '').trim().toLowerCase();
  return t === 'administrador';
}

export default async function adminOnly(req, res, next){
  try{
    if (isAdministrador(req.tipo)) return next();

    const id = req.id_usuario;
    if (!id) return res.status(403).json({ message: "Acesso negado" });

    const usuario = await repositoryUsuario.ListarById(id);
    if (!usuario) return res.status(403).json({ message: "Acesso negado" });

    if (!isAdministrador(null, usuario)) return res.status(403).json({ message: "Acesso restrito a administradores" });

    next();
  } catch (err) {
    console.error("adminOnly error:", err);
    return res.status(500).json({ message: "Erro no middleware de autorização" });
  }
}