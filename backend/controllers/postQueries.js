import postModel from '../models/postHome.js';

export const getTop100 = async(req, res) => {
    const query = [
        { $sort: { likeCount : -1, _id : -1 } },
        { $limit: 100 }
    ]
    const newModel = await postModel.aggregate(query);
    res.status(201).json(newModel);
}

export const getRomantic = async(req, res) => {
        const newModel = await postModel.aggregate([
        { $match : { "tags": "Romantic" } },
        { $sort : { likeCount : -1, _id : -1 } }
    ]
    )
    res.status(201).json(newModel);
}

export const getSexy = async(req, res) => {
    const newModel = await postModel.aggregate([
        { $match : { "tags": { $in: ["Sexy", "Horny", "Intimate"] } } },
        { $sort : { likeCount : -1, _id : -1 } }
    ]
    )
    res.status(201).json(newModel);
}