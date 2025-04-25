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
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';

import AuthLayout from '../../layout/auth-layout';

import { SetAuthState, SignIn } from '../../redux/slice/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  console.log({ 
    errMessage,
    apiSuccess
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    dispatch(SetAuthState({ field: 'errMessage', value: null }));
  
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
  
    try {
      dispatch(SignIn({ 
        email,
        password
      }));

    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (apiSuccess === false && errMessage) {
      setError(errMessage);
      setEmail('');
      setPassword('');
    }
  
    if (apiSuccess === true) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/app'), 1500);
    }
  }, [apiSuccess, errMessage, navigate]);

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
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to your CarbonTrack account
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>
              <Link 
                to="/register" 
                style={{ 
                  textDecoration: 'none',
                  color: '#2A9D8F'
                }}
              >
                <Typography variant="body2">
                  Sign up
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Login;