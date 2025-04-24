import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{ 
        py: { xs: 4, md: 5 },
        bgcolor: '#F5F7F5',
        borderTop: '1px solid',
        borderColor: 'rgba(74, 99, 94, 0.1)' // Subtle border
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            <Box>
              <Typography 
                variant="body2" 
                color="#4A635E"
                sx={{ maxWidth: 350 }}
              >
                Track and reduce your carbon footprint effortlessly.
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              color="#4A635E"
            >
              © {new Date().getFullYear()} CarbonTrack. All rights reserved.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;