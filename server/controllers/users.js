const User = require('../models/User');
const userService = require('../services/usersService');

exports.listUsers = async (req, res) => {
    userService.list()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.postUser = (req, res) => {
    if(!req.body.email) {
      res.status(400).json({ error: 'Les paramètres description sont obligatoires.' })
    }
  
    const newUser = new User({
      ...req.body
    });

    userService.save(newUser)
    .then(() => {
        res.status(201).json({
            message: 'User created.'
        });
    })
    .catch((error) => {
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

    const updatedUser = new User({
        ...req.body
    });

    const id = req.params.id;
    userService.update(id, updatedUser)
    .then(() => {
        res.status(201).json({
            message: 'User updated.'
        });
    })
    .catch((error) => {
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