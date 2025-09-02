import { Box, Container } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onResetApp, onViewCalendar }) => {
  const { mode } = useTheme();
  
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: mode === 'dark' ? '#121212' : '#f5f5f7',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Navbar onResetApp={onResetApp} onViewCalendar={onViewCalendar} />
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{
          flexGrow: 1,
          py: { xs: 4, sm: 6 },
          px: { xs: 2.5, sm: 4, md: 6 },
          transition: 'padding 0.3s ease'
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;