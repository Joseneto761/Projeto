const express = require("express");
const routes = express.Router();

const funcionarioController = require("../controllers/funcionarioController");
const auth = require("../middlewares/fornecedorAuth");

routes.get("/funcionario", auth, funcionarioController.listar);
routes.get("/funcionario/relatorio", auth, funcionarioController.relatorio);
routes.post("/funcionario", auth, funcionarioController.cadastrarPost);
routes.get("/funcionario/cadastrar/:codigo?", auth, funcionarioController.cadastrarGet);
routes.get("/funcionario/:codigo", auth, funcionarioController.detalhar);
routes.get("/funcionario/remover/:codigo",auth, funcionarioController.remover);

module.exports = routes;