const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
        content: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Post', postSchema);