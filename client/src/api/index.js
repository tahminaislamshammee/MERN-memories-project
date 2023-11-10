import axios from 'axios';

// const url = 'http://localhost:5000/posts';
//change the localhost url to hosted url which we get from render
const url = 'https://mern-memories-project-cr7d.onrender.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`)
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);