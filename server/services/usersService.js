const User = require('../models/User');

exports.list = () => {
    return User.find();
}

exports.save = (newUser) => {
    return User.create(newUser);
}

exports.findById = (id) => {
    return User.findById(id);
}

//contrôleur de la route PUT /todos/:id
exports.update = (id, updatedUser) => {
    return User.findByIdAndUpdate(id, updatedUser);
}

exports.delete = (id) => {
    return User.findByIdAndDelete(id);
}
