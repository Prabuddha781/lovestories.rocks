import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
      title: String,
    //   author: String,
      content: String,
    //   upvote: {type: Number, default: 0},
    //   downvote: {type: Number, default: 0},
    //   tags: [String],
    //   createdAt: {
    //       type: Number, 
    //       default: new Date()
    //   }
});

const postMessage = mongoose.model('postSchema', postSchema);

export default postMessage;