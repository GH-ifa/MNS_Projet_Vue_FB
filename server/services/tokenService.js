const jwt = require("jsonwebtoken");

exports.createToken = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}