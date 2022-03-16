import express from "express";
import { getPost, createPost, updatePost, likePost, getAuthorPost } from "../controllers/posts.js";

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:idx', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/likePost', auth, likePost);

router.get('/getAuthorPost/:authorId', getAuthorPost);

export default router;