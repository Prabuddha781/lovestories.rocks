import postModel from '../models/postHome.js';

export const getPosts = async (req, res) => {
    try{
        const findPosts = await postModel.find();
        res.status(200).json(findPosts);
    }
    catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPosts = async (req, res) => {
    const { title, content } = req.body;
    const newPost = new postModel({ title, content });

    try{
        await newPost.save();
        console.log(newPost);
        res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({ message: error.message });
    }
}