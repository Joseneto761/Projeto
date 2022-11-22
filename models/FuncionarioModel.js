const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const funcionarioSchema = Schema({
    codigo : Number,
    nome: String,
    idade : Number
})

module.exports = mongoose.model("funcionario", funcionarioSchema);