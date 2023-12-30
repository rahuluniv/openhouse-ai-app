import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommunityList from './components/CommunityList';
import { Community } from './interfaces/Community';
import { Home } from './interfaces/Home';
import AppBar from '@mui/material/AppBar';
import HouseIcon from '@mui/icons-material/House';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        My Linkedin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();
const App: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [homes, setHomes] = useState<Home[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchCommunities = async () => {
      try {
        const response = await axios.get<Community[]>('/api/openhouse-ai-fe-coding-test/communities.json');
        if (isMounted) setCommunities(response.data);
      } catch (error) {
        if (isMounted) setError('Error fetching communities');
      }
    };

    const fetchHomes = async () => {
      try {
        const response = await axios.get<Home[]>('/api/openhouse-ai-fe-coding-test/homes.json');
        if (isMounted) setHomes(response.data);
      } catch (error) {
        if (isMounted) setError('Error fetching homes');
      }
    };

    fetchCommunities();
    fetchHomes();

    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, []);
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <HouseIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Open House Ai Project
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Community List Component */}
        {communities.length > 0 && homes.length > 0 ? (
          <CommunityList communities={communities} homes={homes} />
        ) : (
          <div>Loading...</div>
        )}
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Please Hire Me
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default App;
