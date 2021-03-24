const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../usuarios/usuario.servicio');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/usuarios/autenticar',
            '/usuarios/registrar'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.obtenerUsuario(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};