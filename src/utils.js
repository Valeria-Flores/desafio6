// Función para verificar si un usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

// Función para verificar si un usuario tiene un rol específico
const hasRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.status(403).send('Acceso denegado');
        }
    };
};

module.exports = { isAuthenticated, hasRole };
