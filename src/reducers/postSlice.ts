import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts as fetchPostsAPI, createPost as createPostAPI, getPostById } from '../api/postService';
import { createCategory as createCategoryAPI, getCategories } from '../api/categoryService';
import { Category, Content, Post } from '../models';
import { createContent as createContentAPI, getContents } from '../api/contentService'
interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  categories: Category[];
  content: Content[];
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  categories: [],
  content: [],
  loading: false,
};
const transformEmbedTags = (html: string | undefined): string => {
  if (!html) return '';

  const youtubeRegex = /<oembed url="https:\/\/www\.youtube\.com\/watch\?v=(.+?)"><\/oembed>/g;

  return html.replace(youtubeRegex, (match, videoId) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
}
/**
 * Posts
 */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (token: string) => {
  return await fetchPostsAPI(token);
});
export const createPost = createAsyncThunk('posts/createPost', async (data: { data: Post, token: string }) => {
  return await createPostAPI(data.data, data.token);
});
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (data: { token: string, id: string }) => {
  return await getPostById(data.token, data.id);
});
/**
 * Categories
 */
export const fetchCategories = createAsyncThunk('posts/fetchCategories', async (token: string) => {
  return await getCategories(token);
});
export const createCategory = createAsyncThunk('posts/createCategory', async (data: { data: Category, token: string }) => {
  return await createCategoryAPI(data.data, data.token);
});
/**
 * Content
 */
export const fetchContents = createAsyncThunk('posts/fetchContent', async (data: { token: string, topic: string }) => {
  return await getContents(data.token, data.topic);
});
export const createContent = createAsyncThunk('posts/createContent', async (data: { data: { content: string, topic: string }, token: string }) => {
  return await createContentAPI(data.data, data.token);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.selectedPost = action.payload;
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      /**
       * Categories
       */
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      /**
       * Content
      */
      .addCase(fetchContents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action: PayloadAction<Content[]>) => {
        state.content = action.payload.map(content => {
          return {
            ...content,
            content: transformEmbedTags(content.content)
          }
        });

        state.loading = false;
      })
      .addCase(createContent.fulfilled, (state, action: PayloadAction<Content[]>) => {
        state.content = action.payload;
      })
  },
});

export const { addPost, setCategories } = postSlice.actions;
export default postSlice.reducer;
