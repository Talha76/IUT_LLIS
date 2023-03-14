const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Access Denied!');
    res.redirect('/');
};

module.exports = ensureAuthenticated;