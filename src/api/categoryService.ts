import axios from 'axios';
import { Category } from '../models';

const API_URL = 'http://localhost:3001/api/category';
export const getCategories = async (token: string) => {
  const response = await axios.get<Category[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
export const createCategory = async (postData: Category, token: string) => {
  const response = await axios.post(API_URL, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};