const User = require('../models/User');
const userService = require('../services/usersService');
const passService = require('../services/passwordService');
const tokenService = require('../services/tokenService');

exports.listUsers = async (req, res) => {
    userService.list()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.postUser = async (req, res) => {
    if(!req.body.email) {
        res.status(400).json({ error: 'Le paramètre email est obligatoire.' });
    }
    if(!req.body.password) {
        res.status(400).json({ error: 'Le paramètre password est obligatoire.' });
    }
      
    console.log('BODY', req.body);

    const newUser = new User({
      ...req.body,
      username: '',
      photo: ''
    });

    newUser.password = await passService.hashPassword(newUser.password);

    userService.save(newUser)
    .then((savedUser) => {
        const token = tokenService.createToken({email: savedUser.email});
        res.status(201).json({
            message: 'User created.',
            id: savedUser.id,
            token: token
        });
    })
    .catch((error) => {
        console.log('err', error);
        res.status(400).json({error});
    });
}

exports.getOneUser = async (req, res) => {

    const id = req.params.id;
    userService.findById(id)
    .then((user) => {
        res.status(200).json(user);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.updateUser = async (req, res) => {
    console.log('update u', req.body);
    let updatedUser = {};
    if (req.body.username) updatedUser.username = req.body.username;
    if (req.body.email) updatedUser.email = req.body.email;
    if (req.body.password) updatedUser.password = await passService.hashPassword(req.body.password);

    console.log('u', updatedUser);

    const id = req.params.id;
    userService.update(id, updatedUser)
    .then(() => {
        res.status(201).json({
            message: 'User updated.'
        });
    })
    .catch((error) => {
        console.log('Error', error);
        res.status(400).json({error});
    });
}

exports.deleteUser = async (req, res) => {

    const id = req.params.id;
    userService.delete(id)
    .then(() => {
        res.status(201).json({
            message: 'User deleted.'
        });
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}