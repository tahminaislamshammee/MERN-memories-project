import express from "express";

import { getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();


//when visitor goes to 5000
//localhost:5000/posts not localhost:5000/ because we added a prefix in index.js
router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost',likePost);

export default router;