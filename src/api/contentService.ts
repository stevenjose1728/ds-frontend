
import axios from 'axios';
import { Content } from '../models';

const API_URL = 'http://localhost:3001/api/content';
export const getContents = async (token: string, topic: string) => {
  const response = await axios.get<Content[]>(API_URL, {
    params: {
      topic
    },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
export const createContent = async (postData: { content: string, topic: string }, token: string) => {
  const response = await axios.post(API_URL, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
