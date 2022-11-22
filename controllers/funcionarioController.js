// aqui ficam as funções

const FuncionarioModel = require("../models/FuncionarioModel");

class FuncionarioController{

    static async relatorio(req, res){
        const listaFuncionarios = await FuncionarioModel.find();
        res.render("funcionario/relatorio", {listaFuncionarios});
    }

    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const atualizado = req.query.a;
        const listaFuncionarios = await FuncionarioModel.find();
        res.render("funcionario/listar", {listaFuncionarios, salvo, removido, atualizado});
    };

    static async cadastrarGet(req, res){
        const cod = req.params.codigo;
        let funcionario = {};
        let escondido = "";
        if (cod){
            funcionario = await FuncionarioModel.findOne({codigo: cod});
            escondido = "hidden";
        }
        res.render("funcionario/cadastrar", {funcionario, escondido});
    };

    static async cadastrarPost(req, res){
        const funcionario = req.body;
        if (funcionario.id){
            await FuncionarioModel.findOneAndUpdate({codigo: funcionario.codigo},
            {
                nome: funcionario.nome,
                idade: funcionario.idade
            });
            res.redirect("/funcionario?a=1");

        } else{
            const novaFuncionario = new FuncionarioModel({
                codigo: funcionario.codigo,
                nome: funcionario.nome,
                idade: funcionario.idade
            })
            await novaFuncionario.save();
            res.redirect("/funcionario?s=1");
        }

    };

    static async detalhar(req, res){
        const cod = req.params.codigo;
        const resultado = await FuncionarioModel.findOne({codigo: cod});
        res.render("funcionario/detalhar", {resultado});
    };

    static async remover(req,res){
        const cod = req.params.codigo;
        await FuncionarioModel.findOneAndDelete({codigo: cod});
        res.redirect("/funcionario?r=1");
    };

}

module.exports = FuncionarioController;