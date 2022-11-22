const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
const auth = require("./middlewares/fornecedorAuth")

require('dotenv/config'); 
const session = require("express-session");

app.use(session({
    secret: 'ifpe',
    saveUninitialized:false,
    resave: false
    }));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);


const funcionarioRoutes = require("./routes/funcionarioRoutes");
app.use(funcionarioRoutes);

const fornecedorRoutes = require("./routes/fornecedorRoutes");
app.use(fornecedorRoutes);
 
app.get("/", auth, function(req, res){
    res.render("index");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
});

app.use(function(req,res){
    res.status(404).render("404");
})