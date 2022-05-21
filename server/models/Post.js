const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
        content: { type: String },
        title: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        publication: { type: Schema.Types.Date }
    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Post', postSchema);