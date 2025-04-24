import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  DirectionsBike as BikeIcon,
  DirectionsBus as BusIcon,
  BarChart as ChartIcon,
  TrendingUp as TrendIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

const features = [
  {
    icon: <BikeIcon fontSize="medium" sx={{ color: '#2A9D8F' }} />,
    title: "Commute Tracking",
    description: "Log your daily travel methods with ease"
  },
  {
    icon: <TrendIcon fontSize="medium" sx={{ color: '#2A9D8F' }} />,
    title: "Carbon Analytics",
    description: "Visualize your impact in real-time"
  },
  {
    icon: <VerifiedIcon fontSize="medium" sx={{ color: '#2A9D8F' }} />,
    title: "Credit Validation",
    description: "Accurate, verified offset calculations"
  },
  {
    icon: <BusIcon fontSize="medium" sx={{ color: '#2A9D8F' }} />,
    title: "Multi-Mode Support",
    description: "Track all types of transportation"
  },
  {
    icon: <ChartIcon fontSize="medium" sx={{ color: '#2A9D8F' }} />,
    title: "Detailed Reports",
    description: "Export analytics for your records"
  },
  {
    icon: <VerifiedIcon fontSize="medium" sx={{ color: '#2A9D8F' }} />,
    title: "Sustainability Goals",
    description: "Monitor progress toward eco-targets"
  }
];

const FeatureCards = () => {
  // Duplicate features for seamless looping
  const duplicatedFeatures = [...features, ...features];

  // Animation variants for infinite scrolling
  const tickerVariants = {
    animate: {
      x: ['0%', '-50%'], // Move from start to halfway (since we duplicated)
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20, // Adjust speed of scrolling
          ease: 'linear'
        }
      }
    },
    hover: {
      x: ['0%', '-50%'], // Pause animation on hover
      transition: {
        x: {
          repeat: 0 // Stop the animation
        }
      }
    }
  };

  return (
    <Container sx={{ py: { xs: 6, md: 8 } }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography 
          variant="h3"
          sx={{ 
            fontWeight: 600,
            mb: 1.5,
            color: '#1A3C34'
          }}
        >
          Powerful Features
        </Typography>
        <Typography 
          variant="h6"
          color="#4A635E"
          maxWidth="md"
          mx="auto"
        >
          Tools to track and reduce your carbon footprint effortlessly
        </Typography>
      </Box>
      
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%'
        }}
      >
        <motion.div
          variants={tickerVariants}
          animate="animate"
          whileHover="hover"
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'fit-content' // Allow cards to extend beyond container
          }}
        >
          {duplicatedFeatures.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 auto',
                width: { xs: 260, sm: 280, md: 300 }, // Fixed card width
                mx: 1.5 // Spacing between cards
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card 
                  sx={{ 
                    minHeight: 220,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: '#F5F7F5',
                    boxShadow: '0 2px 8px rgba(74, 99, 94, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(42, 157, 143, 0.2)',
                      bgcolor: '#E9F1EF'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'rgba(42, 157, 143, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent 
                    sx={{ 
                      flexGrow: 1, 
                      p: 0, 
                      minHeight: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ fontWeight: 500, color: '#1A3C34' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      color="#4A635E"
                      sx={{ fontSize: '0.9rem' }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </motion.div>
      </Box>
    </Container>
  );
};

export default FeatureCards;