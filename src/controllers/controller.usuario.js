import serviceUsuario from '../services/service.usuario.js';


async function Favoritos(req, res){
    try{
        const id_usuario = req.id_usuario; 
        const favoritos = await serviceUsuario.Favoritos(id_usuario);
        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}


async function Login  (req, res)  {

  //  const email = req.body.email;
//    const senha = req.body.senha;
    const {ra, senha} = req.body;
    
    const usuario = await serviceUsuario.Login(ra, senha);

    if (usuario.length === 0){
        res.status(401).json({error: "Usuário ou senha inválidos"});
         console.log("RA recebido:", ra);
        console.log("Senha recebida:", senha);
    }else 
            res.status(200).json(usuario);

        
    }

    async function Inserir (req, res) {

        try{
            const {nome, email, senha,ra} = req.body;

                const usuario = await serviceUsuario.Inserir(nome, email, senha,ra);

            // Cria o token JWT para o usuário

                res.status(201).json(usuario);
            } catch (error) {
                res.status(500).json({ error: "Erro ao inserir usuário", details: error.message });

            }
            
        }


        async function Perfil(req, res){
    try{
        const id_usuario = req.id_usuario; 
        const usuario = await serviceUsuario.Perfil(id_usuario);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({error});
    }
}

export default {Favoritos, Login, Inserir, Perfil};