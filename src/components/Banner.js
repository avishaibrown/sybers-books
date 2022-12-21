import * as React from "react";
import { Paper, Box, Grid, Typography, Button } from "@mui/material";

const Banner = (props) => {
  const { title, description, image, buttonText, onButtonClick } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${image})`,
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
          borderRadius: "8px",
        }}
      />
      <Grid container>
        <Grid item md={6} />
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pl: { md: 0 },
            }}
            textAlign="right"
          >
            {title.map((line) => (
              <Typography
                key={line}
                component="h1"
                variant="h3"
                color="inherit"
              >
                {line}
              </Typography>
            ))}
            <Typography variant="h5" color="inherit" paragraph mt={5}>
              {description}
            </Typography>
            <Button
              variant="contained"
              onClick={onButtonClick}
              sx={{ textTransform: "none" }}
            >
              {buttonText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Banner;
