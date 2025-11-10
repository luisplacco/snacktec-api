import jwt from 'jsonwebtoken';

const secretToken = "MY_SECRET_TOKEN";

function CreateJWT(id_usuario, tipo){
    console.log("CreateJWT payload:", { id_usuario, tipo });
    return jwt.sign({ id_usuario, tipo }, secretToken, {
        expiresIn: '1h'
    });
}

function ValidateJWT(req,res,next){
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    const [, token] = authToken.split(' ');
    jwt.verify(token, secretToken, (err, decoded)=>{
        if(err) return res.status(401).json({ error: 'Token invalido' });
        req.id_usuario = decoded.id_usuario;
        req.tipo = decoded.tipo; // agora CreateJWT popula isso
        console.log("ValidateJWT decoded:", decoded);
        next();
    });
}

export default {CreateJWT, ValidateJWT}