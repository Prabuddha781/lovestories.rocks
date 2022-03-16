import postModel from '../models/postHome.js';
import highestLiked from '../models/highestLiked.js';
import topHundred from '../models/top100.js';

export const getBySearch = async(req, res) => {
    const { search, tags } = req.query;
    const searchTerm = search ? new RegExp(search, "i") : new RegExp("supercalifragilisticexpialidocious", "i");
    const tempTags = tags.split(",");
    const searchingTags = tempTags[0] == '' ? ["supercalifragilisticexpialidocious"] : tempTags;
    const searchTagsRE = searchingTags.map((each) => new RegExp(each, "i"));
    try{
        const newModel = await postModel.find({ $or :[{ title: searchTerm }, { tags: { $in: searchTagsRE } }]});
        res.status(201).json(newModel);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const updateTop100 = async(_req, _res) => {
    try{
        const query = [
            { $sort: { likeCount : -1, _id : -1 } },
            { $limit: 100 }
        ]
        const newModel = await postModel.aggregate(query); 
        await topHundred.deleteMany({});
        const top100Model = new topHundred({ posts: newModel });
        await top100Model.save();
    }
    catch(error){
        console.log(error);
    }
}

export const getTop100 = async(_req, res) => {
    try{
        const posts = await topHundred.find(); 
        const allPosts = posts[0].posts;
        res.status(200).json(allPosts);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const updateTags = async(_req, res) => {
    try{
        console.clear();
        const allPosts = await postModel.find({}, {tags: 1, likeCount: 1});
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
    await highestLiked.deleteMany({});
    const newModel = highestLiked({ allElements: sortedTags });
    await newModel.save();
    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const getHighestTags = async(_req, res) => {
    try{
        const highestTags = await highestLiked.find();
        res.status(201).json(highestTags[0].allElements);
    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}