const express = require("express");
const routes = express.Router();

const fornecedorController = require("../controllers/fornecedorController");
const auth = require("../middlewares/fornecedorAuth");

routes.get("/fornecedor", auth, fornecedorController.listar);
routes.get("/fornecedor/relatorio", auth, fornecedorController.relatorio);
routes.post("/fornecedor", fornecedorController.cadastrarPost);
routes.get("/fornecedor/cadastrar/:email?", fornecedorController.cadastrarGet);
routes.get("/fornecedor/remover/:email", fornecedorController.remover);
routes.get("/fornecedor/login", fornecedorController.loginGet);
routes.get("/fornecedor/logout", fornecedorController.logout);
routes.post("/fornecedor/login", fornecedorController.loginPost);
routes.get("/fornecedor/remover/:email", auth, fornecedorController.remover);
routes.get("/fornecedor/:email", auth, fornecedorController.detalhar);

module.exports = routes;