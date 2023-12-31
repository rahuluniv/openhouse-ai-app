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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/rahul-bains/">
        My LinkedIn
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
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCommunities = async () => {
      try {
        const response = await axios.get<Community[]>('https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json');
        if (isMounted) setCommunities(response.data);
      } catch (error) {
        if (isMounted) setError('Error fetching communities');
      }
    };

    const fetchHomes = async () => {
      try {
        const response = await axios.get<Home[]>('https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json');
        if (isMounted) setHomes(response.data);
      } catch (error) {
        if (isMounted) setError('Error fetching homes');
      }
    };

    fetchCommunities();
    fetchHomes();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Extract unique groups
  const groups = Array.from(new Set(communities.map(community => community.group)));

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setSelectedGroup(event.target.value as string);
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <HouseIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Open House AI Project
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, marginRight: 3 }}>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={selectedGroup}
              onChange={handleGroupChange}
              label="Group"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {groups.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {communities.length > 0 && homes.length > 0 ? (
          <CommunityList communities={communities} homes={homes} selectedGroup={selectedGroup} />
        ) : (
          <div>Loading...</div>
        )}
      </main>
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
          Please hire me, if you like my Skillset
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};

export default App;
