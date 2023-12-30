import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Community } from '../interfaces/Community';
import { Home } from '../interfaces/Home';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
interface MainDisplayProps {
  communities: Community[];
  homes: Home[];
}

const CommunityList: React.FC<MainDisplayProps> = ({ communities, homes }) => {
  const [processedCommunities, setProcessedCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const newCommunities = communities.map(community => {
      const communityHomes = homes.filter(home => home.communityId === community.id);
      const avgPrice = communityHomes.length > 0
        ? '$' + (communityHomes.reduce((acc, home) => acc + home.price, 0) / communityHomes.length).toFixed(2)
        : 'N/A';

      return {
        ...community,
        homes: communityHomes,
        avgPrice: avgPrice,
        showDetails: false
      };
    });

    setProcessedCommunities(newCommunities);
  }, [communities, homes]);

  const toggleHomeDetails = (communityId: string) => {
    const newCommunities = processedCommunities.map(community =>
      community.id === communityId ? { ...community, showDetails: !community.showDetails } : community
    );
    setProcessedCommunities(newCommunities);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
      {processedCommunities.map((community) => (
        <Grid item key={community.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
            component="img"
            image={community.imgUrl || 'Image Coming Soon'}
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
                {community.showDetails ? 'Hide' : 'Show'} Homes
              </Button>
            </CardActions>
            {community.showDetails && community.homes && (
              <CardContent>
                {community.homes.map((home, index) => (
                  <Typography key={home.id} variant="body2" color="text.secondary">
                    {index + 1}: {home.type} - {home.area} sqft - ${home.price.toLocaleString()}
                  </Typography>
                ))}
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
     </Grid>
    </Container>
  );
};

export default CommunityList;