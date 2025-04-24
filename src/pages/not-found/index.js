import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,
          px: 2
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#2A9D8F' : '#21867A',
              mb: 2
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography variant="body2" sx={{ 
            mb: 4,
            fontStyle: 'italic',
            color: theme.palette.mode === 'dark' ? '#2A9D8F' : '#21867A'
          }}>
            "Tracking footprints, preserving tomorrow"
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            component={Link}
            to="/app"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: '#2A9D8F',
              '&:hover': { bgcolor: '#21867A' },
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            Go Back to App
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default NotFound;