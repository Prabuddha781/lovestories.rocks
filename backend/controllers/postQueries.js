import postModel from '../models/postHome.js';
import highestLiked from '../models/highestLiked.js';

export const getBySearch = async(req, res) => {
    console.clear();
    const { search, tags } = req.query;
    const searchTerm = search ? new RegExp(search, "i") : new RegExp("supercalifragilisticexpialidocious", "i");
    const tempTags = tags.split(",");
    const searchingTags = tempTags[0] == '' ? ["supercalifragilisticexpialidocious"] : tempTags;
    const searchTagsRE = searchingTags.map((each) => new RegExp(each, "i"));
    console.log(searchTerm, searchTagsRE);
    try{
        const newModel = await postModel.find({ $or :[{ title: searchTerm }, { tags: { $in: searchTagsRE } }]});
        console.log(newModel);
        res.status(201).json(newModel);
    }
    catch(error){
        console.log(error);
        res.status(404);
    }
}

export const getTop100 = async(req, res) => {
    try{
        const query = [
            { $sort: { likeCount : -1, _id : -1 } },
            { $limit: 100 }
        ]
        const newModel = await postModel.aggregate(query);
        res.status(201).json(newModel);
    }
    catch(error){
        console.log(error);
        res.status(404);
    }
}

export const getRomantic = async(req, res) => {
    try{
        const newModel = await postModel.aggregate([
        { $match : { "tags": "Romantic" } },
        { $sort : { likeCount : -1, _id : -1 } }
        ]
        )
        res.status(201).json(newModel);
    }
    catch(error){
        console.log(error);
        res.status(404);
    }
}

export const getSexy = async(req, res) => {
    try{
        const newModel = await postModel.aggregate([
            { $match : { "tags": { $in: ["Sexy", "Horny", "Intimate"] } } },
            { $sort : { likeCount : -1, _id : -1 } }
        ]
        )
        res.status(201).json(newModel);
    }
    catch(error){
        console.log(error);
        res.status(404);
    }    
}

export const updateTags = async(req, res) => {
    try{
        console.clear();
        console.log("starting now");
        const allPosts = await postModel.find({}, {tags: 1, likeCount: 1});
        console.log(allPosts);
        let res = {};
        for (let i = 0; i < allPosts.length; i++){
            let temp = allPosts[i].tags;
            for (let j = 0; j < temp.length; j++){
                if (!res[temp[j]]){
                    res[temp[j]] = 0
                }
                res[temp[j]] += allPosts[i].likeCount;
        }
    }
    const sortedTags = Object.entries(res).sort((a, b) => b[1]-a[1]).map(el => el[0]);
    console.log(sortedTags);
    await highestLiked.deleteMany({});
    const newModel = highestLiked({ allElements: sortedTags });
    await newModel.save();
    }
    catch(error){
        console.log(error);
    }
}

export const getHighestTags = async(req, res) => {
    try{
        console.log(highestLiked, "highestLiked");
        const highestTags = await highestLiked.find();
        console.log(highestTags);
        res.status(201).json(highestTags[0].allElements);
    }
    catch(error){
        console.log(error);
    }
}