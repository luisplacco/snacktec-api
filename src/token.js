import jwt from 'jsonwebtoken';

const secretToken = "MY_SECRET_TOKEN";

function CreateJWT(id_usuario){
    console.log("ID para o token:", id_usuario); // Adicione este log
    const token = jwt.sign({id_usuario}, secretToken, {
        expiresIn: '1h'
    });
    return token;
}
function ValidateJWT(req,res,next){
    const authToken = req.headers.authorization;
    

    if (!authToken) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [aux, token] = authToken.split(' ');

    jwt.verify(token, secretToken, (err, decoded)=>{
        if(err)
            return res.status(401).json({ error: 'Token invalido' });

        // salva id_usuario no request para uso no futuro
        req.id_usuario = decoded.id_usuario;
        next();
    }
 )
}

export default {CreateJWT, ValidateJWT}