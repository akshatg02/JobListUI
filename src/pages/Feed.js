import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import _ from "lodash";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    console.log("Effect Triggered");
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${query}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts with query", error);
      }
    };

    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/allPosts`);
        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching all posts", error);
      }
    };

    // Debouncing to avoid too many rapid calls
    const delayedFetch = _.debounce(() => {
      if (query.length === 0) fetchInitialPosts();
      if (query.length > 2) fetchPosts();
    }, 300);

    delayedFetch();
    return delayedFetch.cancel; // Cleanup function to avoid memory leak
  }, [query]);

  console.log(post);

  return (
    <Grid
  container
  spacing={3}
  sx={{
    margin: "2%",
    minHeight: "100vh",
    backgroundImage: `url("/allPosts.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "2%",
  }}
>
  <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/">
      <Button sx={{ margin: "1% 2%" }} variant="outlined">
        Home
      </Button>
      </Link>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search..."
        sx={{ width: "75%", margin: "0 auto" }} 
        onChange={(e) => setQuery(e.target.value)}
      />
    </Box>
  </Grid>

  {post.length > 0 && (
    post.map((p) => (
      <Grid key={p.id} item xs={12} md={6}> 
        <Card sx={{
          padding: "2%", 
          overflow: "hidden", 
          width: "80%", 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '2px solid #000000', 
        }}>
          <Typography variant="h5" sx={{ fontSize: "1.8rem", fontWeight: "600" }}>
            {p.profile}
          </Typography>
          <Typography sx={{ color: "#585858", marginTop: "1%" }} variant="body1">
            Description: {p.desc}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "1%" }}>
            Years of Experience: {p.exp} years
          </Typography>

          <Typography gutterBottom variant="body1" sx={{ marginTop: "1%" }}>
            Skills:
          </Typography>
          <Typography variant="body2" sx={{ color: "#333" }}>
            {p.techs.join(', ')}
          </Typography>
        </Card>
      </Grid>
    ))
  )}
</Grid>
  );
};

export default Feed;
