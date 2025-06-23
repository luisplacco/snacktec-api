import serviceUsuario from '../services/service.usuario.js';

async function Favoritos(req, res){
    try{
        const id_usuario = 1;
        const favoritos = await serviceUsuario.Favoritos(id_usuario);
        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}


async function Login  (req, res)  {

  //  const email = req.body.email;
//    const senha = req.body.senha;
    const {email, senha} = req.body;
    if (email == "teste@teste.com" && senha == "123456") {
    
        res.status(200).json({ 
            id_usuario: 1,
            email: "luis@placco.com",
            nome: "luis",
    
        });
    
    }
    else{
        res.status(401).json({ 
            error: "Email ou senha inválidos",
        });
    }
}

    async function Inserir (req, res) {

        const {nome, email, senha} = req.body;

        res.status(201).json({ 
            id_usuario: 1,
            email,
            nome,
    
        });
            
        }

export default {Favoritos, Login, Inserir};