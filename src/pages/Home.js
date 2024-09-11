import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div style={{
      height: "100vh",
      backgroundImage: `url("/homeBg.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
    }}>
      <Typography sx={{ 
        marginBottom: "5%",
        fontSize: "3rem", 
        fontWeight: "bold", 
        color: "black", 
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
        letterSpacing: "0.1em", 
        fontFamily: "'Roboto', sans-serif", 
         }} variant="h3" align="center">
        Get Hired or Hire People!
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <ul className="ul" style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/employer/dashboard">
              <Button sx={{ margin: "2% 3%", fontWeight: "bold" }} variant="outlined">
                Hire talent
              </Button>
            </Link>
          </li>
          <br />
          <li>
            <Link to="/employee/feed">
              <Button sx={{ margin: "2% 3%", fontWeight: "bold" }} variant="outlined">
                Get new Job
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
