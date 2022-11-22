function auth(req, res, next){
    if(req.session.fornecedor){
        next();
    } else{
        res.redirect("/fornecedor/login");
    }
}

module.exports = auth;