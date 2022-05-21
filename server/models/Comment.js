const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = mongoose.Schema({
        content: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        publication: { type: Schema.Types.Date }
    },
    // {_id: false, timestamp: false}
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Comment', commentSchema);