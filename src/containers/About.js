import * as React from "react";
import { Container, Typography } from "@mui/material";
import { ABOUT } from "../utils/constants";
import { Box } from "@mui/system";

const About = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        {ABOUT.title}
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 300, sm: 600 },
            maxWidth: { xs: 300, sm: 600 },
            borderRadius: "50%",
            margin: "1rem",
          }}
          alt={ABOUT.title}
          src={ABOUT.image}
        />
      </Container>
      <Typography variant="body1" mb={3}>
        {ABOUT.description}
      </Typography>
      <Typography variant="body1" mb={3}>
        {ABOUT.terms}
      </Typography>
    </Container>
  );
};

export default About;
