import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: {type: [String],
        default: [""]},
    like: {type: [String],
          default: []},
    likeCount : { type: Number,
                  default: 0},
    creator: String
});

const postMessage = mongoose.model('postSchema', postSchema);

export default postMessage;