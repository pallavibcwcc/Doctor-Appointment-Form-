import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { GitHub, LinkedIn, Twitter, LocalHospital } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '@mui/material/styles';

const Footer = () => {
  const { mode } = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{
        py: 6,
        backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
        borderTop: `1px solid ${mode === 'dark' ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)}`,
        color: mode === 'dark' ? alpha('#ffffff', 0.87) : alpha('#000000', 0.87)
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospital sx={{ mr: 1, color: mode === 'dark' ? '#90caf9' : '#1976d2' }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                MediBook
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2,
                color: mode === 'dark' ? alpha('#ffffff', 0.7) : alpha('#000000', 0.7),
                lineHeight: 1.6
              }}
            >
              Making healthcare accessible and convenient for everyone. Book appointments with top doctors in your area.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link 
                href="#" 
                sx={{ 
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { textDecoration: 'underline' },
                  transition: 'color 0.2s ease-in-out',
                  fontWeight: 500
                }}
              >
                About Us
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { textDecoration: 'underline' },
                  transition: 'color 0.2s ease-in-out',
                  fontWeight: 500
                }}
              >
                Services
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { textDecoration: 'underline' },
                  transition: 'color 0.2s ease-in-out',
                  fontWeight: 500
                }}
              >
                Doctors
              </Link>
              <Link 
                href="#" 
                sx={{ 
                  textDecoration: 'none',
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { textDecoration: 'underline' },
                  transition: 'color 0.2s ease-in-out',
                  fontWeight: 500
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                aria-label="GitHub"
                sx={{ 
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { backgroundColor: mode === 'dark' ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05) }
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn"
                sx={{ 
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { backgroundColor: mode === 'dark' ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05) }
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                aria-label="Twitter"
                sx={{ 
                  color: mode === 'dark' ? '#90caf9' : '#1976d2',
                  '&:hover': { backgroundColor: mode === 'dark' ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05) }
                }}
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 4, mb: 3, opacity: 0.6 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2"
            sx={{ 
              color: mode === 'dark' ? alpha('#ffffff', 0.6) : alpha('#000000', 0.6),
              fontWeight: 500
            }}
          >
            © {new Date().getFullYear()} MediBook. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;