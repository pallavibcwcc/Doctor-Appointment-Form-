import { AppBar, Toolbar, Typography, IconButton, Box, Container, Avatar } from '@mui/material';
import { Brightness4, Brightness7, LocalHospital } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '@mui/material/styles';

const Navbar = ({ onResetApp }) => {
  const { mode, toggleColorMode } = useTheme();

  return (
    <AppBar 
      position="static" 
      elevation={mode === 'dark' ? 0 : 1}
      sx={{
        backgroundColor: mode === 'dark' ? '#1565C0' : '#2196F3',
        color: '#ffffff',
        borderBottom: `1px solid ${mode === 'dark' ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          
          {/* Logo & Title */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.9 }
            }}
            onClick={onResetApp}
          >
            <Avatar 
              sx={{ 
                mr: 1.5, 
                bgcolor: mode === 'dark' ? '#2196f3' : '#1976d2',
                width: 32,
                height: 32
              }}
            >
              <LocalHospital fontSize="small" />
            </Avatar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                color: '#ffffff',
                letterSpacing: '0.5px'
              }}
            >
              MediBook
            </Typography>
          </Box>

          {/* Dark/Light Mode Toggle */}
          <IconButton 
            onClick={toggleColorMode} 
            aria-label="toggle dark mode"
            sx={{ 
              color: '#ffffff',
              backgroundColor: alpha('#ffffff', 0.2),
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.3),
              }
            }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
