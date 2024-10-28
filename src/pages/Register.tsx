// src/components/Register.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../reducers/authSlice'; // Asegúrate de tener esta acción en tu slice
import { AppDispatch } from '../reducers/store';
import { useNavigate } from 'react-router-dom';

// Define el esquema de validación con Zod
const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['creator', 'reader'], { errorMap: () => ({ message: 'Role is required' }) }),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      alert('Registration successful!');
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        padding: '0 30%',
        alignItems: 'center'
      }}
    >
      <Typography variant="h4" color='primary'>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
        />
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
        <Typography variant="subtitle1" gutterBottom>
          Select Role:
        </Typography>
        <RadioGroup {...register('role')} row>
          <FormControlLabel value="creator" control={<Radio />} label={<Typography variant="caption" color='primary' gutterBottom>Creator </Typography>} />
          <FormControlLabel value="reader" control={<Radio />} label={<Typography variant="caption" color='primary' gutterBottom>Reader </Typography>} />
        </RadioGroup>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
