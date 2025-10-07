import { Router } from "express";
import controllerCategoria from "./controllers/controller.categoria.js";
import controllerProduto from "./controllers/controller.produtos.js";
import controllerProduto_destaque from "./controllers/controller.produto_destaque.js";
import controllerBanner from "./controllers/controller.banner.js";
import controllerPedido from "./controllers/controller.pedido.js";
import controllerUsuario from "./controllers/controller.usuario.js";

import jwt from "./token.js";

const router = Router();

//usuarios

router.post("/usuarios/login",  controllerUsuario.Login);
router.post("/usuarios", controllerUsuario.Inserir);
router.get("/usuarios/perfil", jwt.ValidateJWT, controllerUsuario.Perfil);
router.get("/usuarios/favoritos",jwt.ValidateJWT,controllerUsuario.Favoritos);

// pedidos
router.get("/pedidos", jwt.ValidateJWT,controllerPedido.Listar);
router.get("/pedidos/:id_pedido", jwt.ValidateJWT, controllerPedido.ListarId);
router.post("/pedidos", jwt.ValidateJWT,controllerPedido.Inserir);

//produtos
router.get("/produtos", jwt.ValidateJWT, controllerProduto.Listar);
router.get("/produtos/destaque", jwt.ValidateJWT, controllerProduto_destaque.Destaque);
router.get("/produtosDestaque", jwt.ValidateJWT, controllerProduto_destaque.Listar);
router.post("/produtos/:id_produto/favoritos", jwt.ValidateJWT, controllerProduto_destaque.InserirFavorito);
router.delete("/produtos/:id_produto/favoritos", jwt.ValidateJWT, controllerProduto_destaque.ExcluirFavorito);
router.get("/produtos/:id_produto/cardapio", jwt.ValidateJWT, controllerProduto_destaque.Cardapio);

router.get("/categorias", jwt.ValidateJWT, controllerCategoria.Listar);
router.get("/banners", jwt.ValidateJWT, controllerBanner.Listar);


export default router;