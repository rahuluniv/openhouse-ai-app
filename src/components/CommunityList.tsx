import React, { useState, useEffect } from "react";
import { Community } from "../interfaces/Community"; // Adjust this import as needed
import { Home } from "../interfaces/Home"; // Adjust this import as needed
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import CardActionArea from "@mui/material/CardActionArea";
import TextField from "@mui/material/TextField";

interface MainDisplayProps {
  communities: Community[];
  homes: Home[];
  selectedGroup: string;
}

const CommunityList: React.FC<MainDisplayProps> = ({
  communities,
  homes,
  selectedGroup,
}) => {
  const [processedCommunities, setProcessedCommunities] = useState<Community[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [filterType, setFilterType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sqftRange, setSqftRange] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    const newCommunities = communities
      .filter(
        (community) => selectedGroup === "" || community.group === selectedGroup
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((community) => {
        const communityHomes = homes.filter(
          (home) => home.communityId === community.id
        );
        const avgPrice =
          communityHomes.length > 0
            ? "$" +
              (
                communityHomes.reduce((acc, home) => acc + home.price, 0) /
                communityHomes.length
              ).toFixed(2)
            : "N/A";

        return { ...community, homes: communityHomes, avgPrice };
      });

    setProcessedCommunities(newCommunities);
  }, [communities, homes, selectedGroup]);

  const toggleHomeDetails = (communityId: string) => {
    const community = processedCommunities.find((c) => c.id === communityId);
    setSelectedCommunity(community || null);
    setIsModalOpen(!!community);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/imgcomingsoon.jpg";
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleSqftChange = (event: Event, newValue: number | number[]) => {
    setSqftRange(newValue as [number, number]);
  };

  const filterHomes = (homes: Home[]) => {
    return homes.filter(
      (home) =>
        (filterType === "" || home.type === filterType) &&
        home.price >= priceRange[0] &&
        home.price <= priceRange[1] &&
        home.area >= sqftRange[0] &&
        home.area <= sqftRange[1]
    );
  };

  const HomesModal = () => (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "10%", sm: "50%" },
          left: { xs: "10%", sm: "50%" },
          transform: { sm: "translate(-50%, -50%)" },
          height: { xs: "80%", sm: "auto" }, // Smaller and scrollable on mobile
          width: { xs: "80%", sm: "80%", md: "800px" }, // Responsive width
          overflowY: "auto", // Scrollable for long content
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setIsModalOpen(false)}
          sx={{
            position: "absolute",
            right: 2, // Adjust the right position as needed for mobile
            top: 2, // Adjust the top position as needed for mobile
            p: 1, // Adjust the padding to make it smaller for mobile
            zIndex: 1,
          }}
        >
          <CloseIcon fontSize="small" /> {/* Adjust the icon size as needed */}
        </IconButton>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ mt: { xs: 2, sm: 0 }, width: { xs: "80%", sm: "100%" } }}
          >
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
              <MenuItem value="Duplex">Duplex</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: { xs: 2, sm: 0 } }}>
            <Typography gutterBottom>Sqft Range</Typography>
            <Slider
              value={sqftRange}
              onChange={handleSqftChange}
              valueLabelDisplay="auto"
              min={0}
              max={2000}
            />
          </Grid>
        </Grid>

        {filterHomes(selectedCommunity?.homes || []).length === 0 ? (
          <Typography>No homes available</Typography>
        ) : (
          filterHomes(selectedCommunity?.homes || []).map((home) => (
            <Card key={home.id} sx={{ mb: 2 }}>
              <CardActionArea
                onClick={() => {
                  /* handle click action */
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {home.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Area: {home.area} sqft
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${home.price.toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Box>
    </Modal>
  );

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
      {processedCommunities.length > 0 &&
        processedCommunities.map((community) => (
          <Grid item key={community.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                onError={handleImageError}
                src={community.imgUrl || "/imgcomingsoon.jpg"}
                alt={community.name}
                height="140"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {community.name}
                </Typography>
                <Typography>
                  Group: {community.group}
                  <br />
                  Average Price: {community.avgPrice}
                </Typography>
              </CardContent>
              <CardActions>
                {community?.homes?.length && community?.homes?.length > 0 ? (
                  <Button
                    size="small"
                    onClick={() => toggleHomeDetails(community.id)}
                  >
                    Show Homes
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() => toggleHomeDetails(community.id)}
                    disabled
                  >
                    No Homes Available at the Moment
                  </Button>
                )}
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
