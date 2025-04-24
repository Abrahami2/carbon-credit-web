import { Container, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <Box 
      sx={{ 
        py: { xs: 6, md: 8 },
        bgcolor: '#F5F7F5', // Subtle green-tinted background
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Typography 
                variant="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 2,
                  color: '#1A3C34', // Dark green for contrast
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Carbon Credit Tracking System
              </Typography>
              <Typography 
                variant="h6"
                color="#4A635E"
                paragraph
                sx={{ 
                  mb: 2, 
                  fontWeight: 500,
                  maxWidth: '90%'
                }}
              >
                Empowering eco-conscious commuting
              </Typography>
              <Typography 
                variant="body1"
                color="#4A635E"
                paragraph
                sx={{ 
                  mb: 3, 
                  maxWidth: '90%',
                  fontSize: '1rem'
                }}
              >
                A digital platform designed to help companies and employees monitor commuting emissions, calculate carbon impact, and manage carbon credits transparently. Track, reward, and offset for a greener future.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;