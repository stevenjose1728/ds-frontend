import axios from 'axios';
import { Post } from '../models';

const API_URL = 'http://localhost:3001/api/posts';

export const getPosts = async (token: string) => {
  const response = await axios.get<Post[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
export const getPostById = async (token: string, id: string) => {
  const response = await axios.get<Post>(API_URL + '/getById', {
    params: {
      id
    },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const createPost = async (postData: Post, token: string) => {
  const response = await axios.post(API_URL, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updatePost = async (postId: string, postData: Partial<Post>) => {
  const response = await axios.put<Post>(`${API_URL}/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId: string) => {
  const response = await axios.delete(`${API_URL}/${postId}`);
  return response.data;
};
