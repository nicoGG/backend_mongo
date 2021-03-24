module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        return res.status(400).json({ mensaje: err });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ mensaje: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
    return res.status(500).json({ mensaje: err.message });
}