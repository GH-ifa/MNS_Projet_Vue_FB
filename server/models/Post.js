const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
        content: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' }

    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Post', postSchema);