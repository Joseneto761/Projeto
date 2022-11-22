// aqui ficam as funções

const FornecedorModel = require("../models/FornecedorModel");
const  bcrypt = require ("bcryptjs");

class FornecedorController{

    static async relatorio(req, res){
        const listaFornecedores = await FornecedorModel.find();
        res.render("fornecedor/relatorio", {listaFornecedores});
    }

    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const atualizado = req.query.a;
        const listaFornecedores = await FornecedorModel.find();
        res.render("fornecedor/listar", {listaFornecedores, salvo, removido, atualizado});
    };

    static async cadastrarGet(req, res){
        const email = req.params.email;
        const erro = req.query.e;
        let fornecedor = {};
        let escondido = "";
        if (email){
            fornecedor = await FornecedorModel.findOne({email: email});
            escondido = "hidden";
        }
        res.render("fornecedor/cadastrar", {fornecedor, escondido, erro});
    };

    static async cadastrarPost(req, res){
        const fornecedor = req.body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(fornecedor.senha, salt);
        if (fornecedor.id){
            await FornecedorModel.findOneAndUpdate({email: fornecedor.email},
            {
                nome: fornecedor.nome,
                senha: hash
            });
            res.redirect("/fornecedor?a=1");

        } else{
            const email = await FornecedorModel.findOne({email: fornecedor.email});
            if(email){
                res.redirect("/fornecedor/cadastrar?e=1")
            } else{
                const novoFornecedor = new FornecedorModel({
                    email: fornecedor.email,
                    nome: fornecedor.nome,
                    senha: hash
                })
                await novoFornecedor.save();
                res.redirect("/fornecedor?s=1");
            }
        }

    };

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await FornecedorModel.findOne({email: email});
        res.render("fornecedor/detalhar", {resultado});
    };

    static async remover(req, res){
        const email = req.params.email;
        await FornecedorModel.findOneAndDelete({email: email});
        res.redirect("/fornecedor?r=1");
    };

    static async loginGet(req, res){
        const erro = req.query.e;
        res.render("fornecedor/login", ({erro}));
    };
    static async logout(req, res){
        req.session.fornecedor = undefined;
        res.redirect("/fornecedor/login");
    };

    static async loginPost(req, res){
        const fornecedor = req.body;
        const resultado = await FornecedorModel.findOne({email: fornecedor.email});
        if (resultado){
            if (bcrypt.compareSync(fornecedor.senha, resultado.senha)){
                req.session.fornecedor = fornecedor.email;
                res.redirect("/");
            } else{
                res.send("Dados incorretos! Tente novamente.");
            }
        }else{
            res.send("Dados incorretos! Tente novamente.");
        }
    }

}

module.exports = FornecedorController;