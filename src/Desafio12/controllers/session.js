const loadLogin = async (req, res) => {
    if(req.session.name){
        return res.redirect('./');
    }
    res.render('login');
}

const doLogin = async (req, res) => {
    const { name } = req.body;
    req.session.name = name;
    res.redirect('./');
}

const doLogout = async (req, res) => {
    const { name } = req.session;
    
    req.session.destroy(err => {
        if(err) {
            return res.status(500).json({
                status: 'Logout ERROR',
                body: err
            })
        }
        res.render('logout', { username: name });
    })
}

module.exports = {
    loadLogin,
    doLogin,
    doLogout
}