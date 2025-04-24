import { Box } from '@mui/material';
import Navbar from '../components/navigation/navbar';
import Footer from '../components/navigation/footer';

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthLayout;