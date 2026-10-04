import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

const HeroLayoutRoot = styled("section")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "82vh",
  overflow: "hidden",
  color: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    minHeight: "75vh",
  },
}));

const BackgroundImage = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  transform: "scale(1.02)",
  filter: "brightness(0.75)",
  zIndex: 1,
});

const GradientOverlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(180deg, rgba(15, 32, 27, 0.78) 0%, rgba(15, 32, 27, 0.65) 50%, rgba(15, 32, 27, 0.88) 100%)",
  zIndex: 2,
});

function HeroLayout(props) {
  const { sxBackground, children } = props;

  return (
    <HeroLayoutRoot>
      <BackgroundImage sx={sxBackground} />
      <GradientOverlay />
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          py: { xs: 8, md: 12 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {children}
      </Container>
    </HeroLayoutRoot>
  );
}

export default HeroLayout;
