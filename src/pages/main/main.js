import { Box } from '@mui/material';
import { motion } from 'framer-motion';

import Navbar from '../../components/navigation/navbar';
import HeroSection from '../../components/hero/hero-section';
import FeatureCards from '../../components/features/feature-cards';
import HowItWorks from '../../components/how-it-works/steps';
import Footer from '../../components/navigation/footer';

const LandingPage = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Navbar />
      
      <Box 
        component="main" 
        sx={{ flexGrow: 1 }}
      >
        <HeroSection />
        <FeatureCards />
        <HowItWorks />
      </Box>
      
      <Footer />
    </Box>
  );
};

export default LandingPage;