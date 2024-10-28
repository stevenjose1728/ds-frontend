import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '../models/schemas';
import { Category, Post } from '../models';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../reducers/postSlice';
import { AppDispatch, RootState } from '../reducers/store';
import 'ckeditor5/ckeditor5.css';
import '../styles/postModal.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface Props {
  onClose: () => void;
  categories: Category[];
}

const PostModal = (props: Props) => {
  const categoriesData = useMemo(() => {
    return props.categories.map(element => {
      return {
        label: element.name,
        value: element._id
      }
    })
  }, [props.categories])
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Post>({
    resolver: zodResolver(postSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const onSubmit = (data: Post) => {
    if (token) {
      dispatch(createPost({ data, token }));
      props.onClose();
    }
  };

  if (!open) return null;
  return (
    <div className="post-modal">
      <h3>Add Topic</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField id="outlined-basic" label="Title" variant="outlined" {...register('title')} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              {...register('category')}
            >
              {
                categoriesData.map((element, i) => {
                  return (
                    <MenuItem key={i.toString()} value={element.value}>{element.label}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label>
            <input type="checkbox" {...register('allowImage')} />
            Allow Image Upload
          </label>
          <label>
            <input type="checkbox" {...register('allowVideo')} />
            Allow Video URL
          </label>
          <label>
            <input type="checkbox" {...register('allowText')} />
            Allow Text
          </label>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostModal;
