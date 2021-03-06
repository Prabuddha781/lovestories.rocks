import postModel from '../models/postHome.js';
import mongoose from 'mongoose';

const LIMIT = 1000;

export const getPost = async (req, res) => {
    const { idx } = req.params;
    const start = (Number(idx) - 1) * LIMIT; 
    try{
        const findPosts = await postModel.find().limit(LIMIT).skip(start);

        res.status(200).json(findPosts);
    }
    catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getAuthorPost = async (req, res) => {
    const { authorId } = req.params;
    try{
        const post = await postModel.find({
            creator: authorId
        });
        if (post.length == 0){
            res.status(200).json({title:"", content:"", tags: [], creator: authorId});
        }
        else{
            res.status(200).json(post.at(0));
        }
    }
    catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const { title, content, tags, creator } = req.body;
    const newPost = new postModel({ title, content, tags, creator });
    try{
        await newPost.save();
        res.status(200).json(newPost);
    } catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).send(`No post with id: ${id}`);

    const { title, content, tags, creator }  = req.body;
    try{
        const newPost =  { title, content, tags, creator, _id: id } 
        const updatedPost = await postModel.findByIdAndUpdate(id, newPost, {new: true});
        res.status(200).json(updatedPost);
    }
    catch (error){
        res.status(409).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).send(`No post with id: ${id}`);

    try{
        const post = await postModel.findById(id);
        const index = post.like.findIndex((id) => id === String(req.userId));
        
        if (index === -1){
            post.like.push(String(req.userId));
            post.likeCount = post.likeCount + 1;
        }
        else {
            post.like = post.like.filter((likers) => likers !== String(req.userId));
            post.likeCount = post.likeCount - 1;
        }
        const updatedPost = await postModel.findByIdAndUpdate(id, post, {new: true});
        res.status(200).json(updatedPost);
    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}