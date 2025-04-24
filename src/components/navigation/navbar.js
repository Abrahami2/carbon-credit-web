import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  Chip
} from '@mui/material';
import { 
  Forest as ForestIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Logout } from '../../redux/slice/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(Logout());
    navigate('/app');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const userDisplay = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'User';

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        bgcolor: 'rgba(245, 247, 245, 0.95)',
        color: '#1A3C34',
        borderBottom: '1px solid',
        borderColor: 'rgba(74, 99, 94, 0.1)', 
        py: 0.5
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            sx={{ display: 'flex', alignItems: 'center', mr: 3 }}
          >
            <ForestIcon sx={{ fontSize: 28, color: '#2A9D8F', mr: 0.5 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 600,
                textDecoration: 'none',
                color: '#1A3C34',
                fontSize: '1.2rem',
                '&:hover': { color: '#2A9D8F' }
              }}
            >
              CarbonTrack
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {token ? (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Chip
                label={userDisplay}
                sx={{
                  bgcolor: 'rgba(42, 157, 143, 0.1)',
                  color: '#2A9D8F',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  px: 1,
                  '&:hover': {
                    bgcolor: 'rgba(42, 157, 143, 0.2)'
                  }
                }}
              />
              <Button
                onClick={handleDashboard}
                startIcon={<DashboardIcon sx={{ fontSize: 18 }} />}
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: '#4A635E',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#2A9D8F',
                    bgcolor: 'rgba(42, 157, 143, 0.1)'
                  }
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: '#4A635E',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#2A9D8F',
                    bgcolor: 'rgba(111, 198, 188, 0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              <Button 
                component={Link}
                to="/login"
                color="inherit"
                sx={{ 
                  mr: 1.5,
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: '#4A635E',
                  '&:hover': { color: '#2A9D8F', bgcolor: 'rgba(42, 157, 143, 0.1)' }
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  bgcolor: '#2A9D8F',
                  color: '#FFFFFF',
                  px: 2.5,
                  py: 0.75,
                  boxShadow: 'none',
                  '&:hover': { 
                    bgcolor: '#24887E', 
                    boxShadow: '0 2px 8px rgba(42, 157, 143, 0.2)' 
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;