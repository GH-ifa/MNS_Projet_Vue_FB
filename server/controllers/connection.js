const User = require('../models/User');
const userService = require('../services/usersService');
const passService = require('../services/passwordService');
const tokenService = require('../services/tokenService');

exports.connectUser = async (req, res) => {
    const email = req.body.email;
    const plainPassword = req.body.pass;
    const token = req.body.token;

    if (email && plainPassword) {
        this.connectUserByPassword(req, res);
    }
    else if (token) {
        this.connectUserByToken(req, res);
    }
}

exports.connectUserByPassword = async (req, res) => {
    const email = req.body.email;
    const plainPassword = req.body.pass;

    console.log('test co:', email, plainPassword);

    const userFound = await User.findOne({ email: email });

    if (userFound) {
        const isPasswordCorrect = await passService.comparePasswords(plainPassword, userFound.password);
        if (isPasswordCorrect) {
            console.log('Password correct');
            const token = tokenService.createToken(email);
            res.status(200).json({ message: 'Connection successful!', token: token });
        }
        else {
            console.log('Wrong password.');
            res.status(401).json({ message: 'Wrong password.' });
        }
    }
    else {
        console.log('User doesn\'t exist.');
        res.status(401).json({ message: 'User doesn\'t exist.' });
    }
}

exports.connectUserByToken = async (req, res) => {
    if (req.body.token) {
        console.log('log par token');
        let email = null;
        try {
            email = tokenService.verifyToken(req.body.token).data;
        }
        catch(jwtError) {
            console.log('JWT Error:', jwtError.message);
            res.status(200).json({
                message: 'Invalid signature!'
            });
            return;
        }
        
        const userFound = await User.findOne({ email: email });
        console.log('User found:', userFound);
        if (userFound) {
            console.log('Connected by token!');
            res.status(200).json({
                message: 'Connection successful!',
                id: userFound.id,
                email: userFound.email
            });
        }
        else {
            console.log('Wrong token');
            res.status(200).json({
                message: 'Wrong token!'
            });
        }
    }
}