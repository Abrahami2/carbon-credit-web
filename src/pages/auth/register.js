import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  MenuItem,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import AuthLayout from '../../layout/auth-layout';
import { SetAuthState, SignUp } from '../../redux/slice/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee' // Changed to match your roles array values
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    errMessage,
    success: apiSuccess,
    loading
  } = useSelector((state) => state.auth);

  const roles = [
    { value: 'employee', label: 'Employee' },
    { value: 'employer', label: 'Employer' },
    { value: 'admin', label: 'Administrator' }
  ];

  // Reset state when component mounts
  useEffect(() => {
    return () => {
      dispatch(SetAuthState({ field: 'errMessage', value: null }));
      dispatch(SetAuthState({ field: 'success', value: false }));
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    dispatch(SetAuthState({ field: 'errMessage', value: null }));

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(SignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userRole: formData.role
      }));
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (apiSuccess === false && errMessage) {
      setError(errMessage);
      setFormData(prev => ({
        ...prev,
        password: ''
      }));
      setIsLoading(false);
    }

    if (apiSuccess === true) {
      setSuccess('Registration successful! Redirecting to login...');
      // Clear form and reset state
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'employee'
      });
      
      const timer = setTimeout(() => {
        // Reset success states before navigation
        setSuccess('');
        dispatch(SetAuthState({ field: 'success', value: false }));
        dispatch(SetAuthState({ field: 'errMessage', value: null }));
        navigate('/login'); // Changed to navigate to login instead of app
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [apiSuccess, errMessage, navigate, dispatch]);

  return (
    <AuthLayout>
      <Container maxWidth="sm">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            mt: 8,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join CarbonTrack to start tracking your carbon footprint
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              helperText="At least 8 characters"
            />
            <TextField
              select
              margin="normal"
              required
              fullWidth
              id="role"
              label="User Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 3 }}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
                bgcolor: '#2A9D8F',
                '&:hover': { bgcolor: '#21867A' },
                '&:disabled': { bgcolor: '#e0e0e0' }
              }}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </Button>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="#2A9D8F">
                  Sign in
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Register;