import express from "express";
import { getPost, createPost, updatePost, likePost, deletePost, getAuthorPost } from "../controllers/posts.js";

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:idx', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/likePost', auth, likePost);
// router.patch('/:id/dislikePost', auth, dislikePost);
router.delete('/:id', deletePost);

router.get('/getAuthorPost/:authorId', getAuthorPost);

export default router;