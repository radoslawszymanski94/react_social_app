import axios from "axios";
import { message } from "antd";
import { messages } from "../constans/messages";

// Base URL
const url = "https://social-app-project.herokuapp.com/api";

// Fetch all posts
export const fetchPosts = () => axios.get(`${url}/posts`);

// Get specific post
export const getPost = (id) => axios.get(`${url}/posts/${id}`);

// Create post
export const createPost = (newPost) =>
  axios.post(`${url}/posts/create`, newPost).then((res) => res.data._id);

// Delete post
export const deletePost = (id) =>
  axios
    .delete(`${url}/posts/${id}`)
    .then(() => message.success(messages.postDeletedSuccessfully))
    .catch(() => message.error(messages.postDeletedFailed));

// Update
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/posts/${id}`, updatedPost);

// Login
export const login = (username, password) =>
  axios.post(`${url}/user/login`, { username, password });

// Register
export const register = (username, password) =>
  axios.post(`${url}/user/register`, { username, password });

// Logout
export const logout = () => axios.post(`${url}/user/logout`);

// Get user
export const getUser = (id) => axios.get(`${url}/user/${id}`);

// Get all users
export const getUsers = () => axios.get(`${url}/users`);

// Update user
export const updateUser = (id, updatedUser) =>
  axios.patch(`${url}/user/${id}`, updatedUser);
