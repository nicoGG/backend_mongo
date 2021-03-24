const express = require('express');
const router = express.Router();
const usuarioServicio = require('./usuario.servicio');

//Rutas API
router.post('/autenticar', autenticar);
router.post('/registrar', registrar);
router.get('/', listarUsuarios);
router.get('/actual', getCurrent);
router.get('/:id', getById);
router.put('/:id', actualizarUsuario);
router.delete('/:id', _eliminarUsuario);

module.exports = router;

//AUTENTICAR EL USUARIO
function autenticar(req, res, next) {
    usuarioServicio.autenticar(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Usuario y/o contraseña incorrectos' }))
        .catch(err => next(err));
}

function registrar(req, res, next) {
    usuarioServicio.crearUsuario(req.body)
        .then(() => res.json({ mensaje: "Usuario creado correctamente" }))
        .catch(err => next(err));
}

function listarUsuarios(req, res, next) {
    usuarioServicio.listarUsuarios()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    usuarioServicio.obtenerUsuario(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    usuarioServicio.obtenerUsuario(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function actualizarUsuario(req, res, next) {
    usuarioServicio.actualizarUsuario(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _eliminarUsuario(req, res, next) {
    usuarioServicio.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}