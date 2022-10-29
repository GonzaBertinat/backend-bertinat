const loadRoot = async (req, res) => {
    res.render('home', { username: req.user.email });
}

const loadSignUp = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        res.render('signup');
    }
}

const loadLogin = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        res.render('login');
    }
}

const postSignUp = async (req, res) => {
    res.redirect('/');
}

const postLogin = async (req, res) => {
    res.redirect('/');
}

const failSignUp = async (req, res) => {
    res.render('signuperror');
}

const failLogin = async (req, res) => {
    res.render('loginerror');
}

const doLogout = async (req, res) => {
    const { email } = req.user;
    req.logout( err => {
        if(err) {
            return res.status(500).json({
                status: 'Logout ERROR',
                body: err
            })
        }
    });
    res.render('logout', { username: email });
}

module.exports = {
    loadRoot,
    loadSignUp,
    loadLogin,
    postSignUp,
    postLogin,
    failSignUp,
    failLogin,
    doLogout
}