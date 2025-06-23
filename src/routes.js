import { Router } from "express";
import controllerCategoria from "./controllers/controller.categoria.js";
import controllerProduto from "./controllers/controller.produtos.js";
import controllerProduto_destaque from "./controllers/controller.produto_destaque.js";

import controllerPedido from "./controllers/controller.pedido.js";
import controllerUsuario from "./controllers/controller.usuario.js";


const router = Router();

//usuarios

router.post("/usuarios/login", controllerUsuario.Login);
router.post("/usuarios", controllerUsuario.Inserir);
router.get("/usuarios/favoritos",controllerUsuario.Favoritos);

// pedidos
router.get("/pedidos", controllerPedido.Listar);
router.get("/pedidos/:id_pedido", controllerPedido.ListarId);

//produtos
router.get("/produtos", controllerProduto.Listar);
router.get("/produtos/destaque", controllerProduto_destaque.Destaque);
router.get("/categorias", controllerCategoria.Listar);

export default router;