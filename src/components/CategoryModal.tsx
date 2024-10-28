import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../models/schemas';
import { Category } from '../models';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../reducers/postSlice';
import { AppDispatch, RootState } from '../reducers/store';
import 'ckeditor5/ckeditor5.css';
import '../styles/postModal.css'
import { TextField } from '@mui/material';

interface Props {
  onClose: () => void;
}

const CategoryModal = (props: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const onSubmit = (data: Category) => {
    if (token) {
      dispatch(createCategory({ data, token }));
      props.onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="post-modal">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField id="outlined-basic" label="Name" variant="outlined" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <button type="submit">Create Category</button>
        <button type="button" onClick={props.onClose}>Close</button>
      </form>
    </div>
  );
};

export default CategoryModal;
