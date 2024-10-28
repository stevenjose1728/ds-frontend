export interface User {
  id: string;
  email: string;
  role: 'admin' | 'creator' | 'reader';
}

export interface Post {
  _id: string;
  title: string;
  allowImage: boolean;
  allowVideo: boolean;
  allowText: boolean;
  category?: Category;
  author: string;
  comments: Comment[];
}
export interface Category {
  _id?: string;
  name: string;
}
export interface Comment {
  id: string;
  content: string;
  author: string;
}

export interface Content {
  _id?: string;
  content: string;
  topic?: Post

}
