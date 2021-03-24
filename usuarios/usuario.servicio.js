const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('helpers/db');
const User = db.usuarios;

module.exports = {
    autenticar,
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    delete: _eliminarUsuario
};

async function autenticar({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function listarUsuarios() {
    return await User.find().select('-hash');
}

async function obtenerUsuario(id) {
    return await User.findById(id).select('-hash');
}

async function crearUsuario(userParam) {
    // validar usuario
    if (await User.findOne({ usuario: userParam.usuario })) {
        throw 'Usuario "' + userParam.usuario + '" ya existe en la base de datos';
    }
    const user = new User(userParam);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    // guardar usuario
    await user.save();
}

async function actualizarUsuario(id, userParam) {
    const user = await User.findById(id);
    // validar
    if (!user) throw 'Usuario no encontrado';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Usuario "' + userParam.username + '" ya fue creado';
    }
    // hash si la contraseña fue ingresada
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    // copy userParam properties to user
    Object.assign(user, userParam);
    await user.save();
}

async function _eliminarUsuario(id) {
    await User.findOneAndDelete(id);
}