import mongoose from 'mongoose';

const mostLike = mongoose.Schema({
    allElements: [String]
});

const highestLiked = mongoose.model('mostLike', mostLike);

export default highestLiked;