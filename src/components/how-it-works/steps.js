import { Container, Box, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  PersonAdd as SignupIcon,
  Directions as TrackIcon,
  Equalizer as AnalyticsIcon,
  Spa as ImpactIcon
} from '@mui/icons-material';

const steps = [
  {
    icon: <SignupIcon sx={{ fontSize: 36, color: '#2A9D8F' }} />,
    title: "Create Account",
    description: "Register in under 2 minutes"
  },
  {
    icon: <TrackIcon sx={{ fontSize: 36, color: '#2A9D8F' }} />,
    title: "Log Commutes",
    description: "Track your daily transportation"
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 36, color: '#2A9D8F' }} />,
    title: "View Analytics",
    description: "See your carbon impact in real-time"
  },
  {
    icon: <ImpactIcon sx={{ fontSize: 36, color: '#2A9D8F' }} />,
    title: "Make a Difference",
    description: "Contribute to global sustainability"
  }
];

const HowItWorks = () => {
  return (
    <Box sx={{ 
      py: { xs: 6, md: 8 },
      bgcolor: '#F5F7F5', // Subtle green-tinted background
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography 
            variant="h3"
            sx={{ 
              fontWeight: 600,
              mb: 1.5,
              color: '#1A3C34'
            }}
          >
            How It Works
          </Typography>
          <Typography 
            variant="h6"
            color="#4A635E"
            maxWidth="md"
            mx="auto"
          >
            Simple steps to start reducing your carbon footprint today
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on mobile
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            gap: { xs: 4, md: 2 }
          }}
        >
          {steps.map((step, index) => (
            <Box key={index} sx={{ position: 'relative', flex: 1, maxWidth: { md: 240 } }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }} // Slide in from right
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5, ease: 'easeOut' }}
              >
                <Stack
                  direction="column"
                  alignItems="center"
                  textAlign="center"
                  spacing={1.5}
                  sx={{
                    px: 2,
                    py: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: 'rgba(42, 157, 143, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontWeight: 500, 
                      color: '#1A3C34',
                      fontSize: '1.1rem'
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    color="#4A635E"
                    sx={{ fontSize: '0.85rem' }}
                  >
                    {step.description}
                  </Typography>
                </Stack>
              </motion.div>

              {/* Connecting Arrow (not shown for last step or on mobile) */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' }, // Hide on mobile
                    position: 'absolute',
                    top: '50%',
                    right: '-20px',
                    transform: 'translateY(-50%)',
                    width: 40,
                    height: 2,
                    bgcolor: '#2A9D8F',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: '-4px',
                      border: '5px solid transparent',
                      borderLeftColor: '#2A9D8F'
                    }
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;