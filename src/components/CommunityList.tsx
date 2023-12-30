import React, { useState, useEffect } from 'react';
import { Community } from '../interfaces/Community'; // Adjust this import as needed
import { Home } from '../interfaces/Home'; // Adjust this import as needed
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CardActionArea from '@mui/material/CardActionArea';

interface MainDisplayProps {
  communities: Community[];
  homes: Home[];
}

const CommunityList: React.FC<MainDisplayProps> = ({ communities, homes }) => {
  const [processedCommunities, setProcessedCommunities] = useState<Community[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [filterType, setFilterType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minSqft, setMinSqft] = useState<string>('');
  const [maxSqft, setMaxSqft] = useState<string>('');

  useEffect(() => {
    const newCommunities = communities.map(community => {
      const communityHomes = homes.filter(home => home.communityId === community.id);
      const avgPrice = communityHomes.length > 0
        ? '$' + (communityHomes.reduce((acc, home) => acc + home.price, 0) / communityHomes.length).toFixed(2)
        : 'N/A';

      return { ...community, homes: communityHomes, avgPrice };
    });

    setProcessedCommunities(newCommunities);
  }, [communities, homes]);

  const toggleHomeDetails = (communityId: string) => {
    const community = processedCommunities.find(c => c.id === communityId);
    setSelectedCommunity(community || null);
    setIsModalOpen(!!community);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/150';
  };

  const filterHomes = (homes: Home[]) => {
    return homes.filter(home => (
      (filterType === '' || home.type === filterType) &&
      (minPrice === '' || home.price >= parseFloat(minPrice)) &&
      (maxPrice === '' || home.price <= parseFloat(maxPrice)) &&
      (minSqft === '' || home.area >= parseFloat(minSqft)) &&
      (maxSqft === '' || home.area <= parseFloat(maxSqft))
    ));
  };

  const HomesModal = () => (
    
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <IconButton aria-label="close" onClick={() => setIsModalOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={2}>
          <TextField
            select
            size="small"
            label="Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Townhome">Townhome</MenuItem>
            <MenuItem value="Condo">Condo</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField size="small" label="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={2}>
          <TextField size="small" label="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={2}>
          <TextField size="small" label="Min Sqft" value={minSqft} onChange={(e) => setMinSqft(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={2}>
          <TextField size="small" label="Max Sqft" value={maxSqft} onChange={(e) => setMaxSqft(e.target.value)} fullWidth />
        </Grid>
      </Grid>
        {filterHomes(selectedCommunity?.homes || []).map(home => (
          <Card key={home.id} sx={{ mb: 2 }}>
            <CardActionArea onClick={() => {/* handle click action */}}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {home.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Area: {home.area} sqft - Price: ${home.price.toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Modal>
  );

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {processedCommunities.map(community => (
          <Grid item key={community.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                onError={handleImageError}
                src={community.imgUrl || 'https://via.placeholder.com/150'}
                alt={community.name}
                height="140"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {community.name}
                </Typography>
                <Typography>
                  Group: {community.group}<br />
                  Average Price: {community.avgPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => toggleHomeDetails(community.id)}>
                  Show Homes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <HomesModal />
    </Container>
  );
};

export default CommunityList;
