import mongoose from 'mongoose';

const top100 = mongoose.Schema({
    posts: {
        // title: String,
        // content: String,
        // tags: {type: [String]},
        // like: {type: [String]},
        // likeCount : { type: Number},
        // creator: String
    }
});

const topHundred = mongoose.model('top100', top100);

export default topHundred;