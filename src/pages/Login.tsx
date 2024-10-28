// src/components/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../reducers/authSlice'; // Asegúrate de tener esta acción en tu slice
import { AppDispatch, RootState } from '../reducers/store';
import { useNavigate } from 'react-router-dom';

// Define el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  if (user?.user) {
    navigate('/')
  }
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await dispatch(loginUser(data)).unwrap();
      dispatch(setUser({ token: response.token, user: response.user }));
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const navigateToRegisterPage = () => navigate('/register')

  return (
    <div
      style={{
        padding: '0 30%',
        alignItems: 'center'
      }}
    >
      <Typography variant="h4" color='primary' gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button type="button" variant="contained" color="primary" onClick={navigateToRegisterPage}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Login;
