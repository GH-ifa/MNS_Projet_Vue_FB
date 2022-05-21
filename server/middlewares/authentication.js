const tokenService = require('../services/tokenService');

const tokenAuthentication = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = tokenService.verifyToken(token);
        console.log(decodedToken.data);

        return next();
    }
    catch (error) {
        console.log('Pas le bon token');
        res.status(401).json(error);
    }
}

module.exports = tokenAuthentication;