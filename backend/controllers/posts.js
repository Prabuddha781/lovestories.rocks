import postModel from '../models/postHome.js';

export const getPost = async (req, res) => {
    try{
        const findPosts = await postModel.find();
        res.status(200).json(findPosts);
    }
    catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPosts = (req, res) => {
    const post = req.body;
    const newPost = new postModel(post);

    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({ message: error.message });
    }
}