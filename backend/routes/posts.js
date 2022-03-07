import express from "express";
import { getPost, createPost, updatePost, likePost, deletePost, getAuthorPost } from "../controllers/posts.js";
import { getTop100, getRomantic, getSexy } from "../controllers/postQueries.js";

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/likePost', auth, likePost);
// router.patch('/:id/dislikePost', auth, dislikePost);
router.delete('/:id', deletePost);

//Queries
router.get('/getTop100', getTop100);
router.get('/getRomantic', getRomantic);
router.get('/getSexy', getSexy);

router.get('/getAuthorPost/:authorId', getAuthorPost)

export default router;