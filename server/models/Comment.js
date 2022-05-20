const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = mongoose.Schema({
        content: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User' }

    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Comment', commentSchema);