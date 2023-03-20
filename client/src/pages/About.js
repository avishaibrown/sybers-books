import { useEffect } from "react";
import { Container, Box, Grid, useMediaQuery } from "@mui/material";
import Typography from "../components/Typography";
import InfoActionBox from "../components/InfoActionBox";
import { ABOUT } from "../utils/constants";

const About = () => {
  //scroll to top when page is navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageToDisplay = (imageIndex, float) => {
    return (
      <Grid item xs={12} md={5}>
        <Box
          component="img"
          key={`about-image-${imageIndex}`}
          alt={`${ABOUT.title}-image-${imageIndex}`}
          src={ABOUT.images[imageIndex]}
          sx={{
            maxWidth: { xs: 400, lg: 450, xl: 520 },
            float: { xs: "none", md: float },
          }}
        />
      </Grid>
    );
  };

  const paragraphToDisplay = (panelParagraph, align, float) => {
    return (
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          float: { xs: "none", md: float },
          textAlign: { xs: "none", md: align },
        }}
        p={{ xs: 0, md: 3, xl: 6 }}
        mx={{ xs: 3, sm: 5, md: 2, lg: 5 }}
      >
        {panelParagraph.map((paragraph, index) => (
          <Typography
            sx={{
              typography: { xs: "body1", md: "h6", xl: "h5" },
            }}
            p={{ xs: 1, lg: 3 }}
            key={"about-description-paragraph-" + index}
          >
            {paragraph}
          </Typography>
        ))}
      </Grid>
    );
  };

  return (
    <Container
      component="section"
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.75rem" },
          mb: { xs: 5, md: 10 },
        }}
      >
        {ABOUT.title}
      </Typography>
      <Grid container mb={{ xs: 5, lg: 10 }} spacing={{ xs: 2, md: 3, xl: 4 }}>
        {/* First panel */}

        {imageToDisplay(0, "right")}
        {paragraphToDisplay(ABOUT.descriptionPanelOne, "left", "right")}

        {/* Second panel */}
        {useMediaQuery((theme) => theme.breakpoints.down("md")) ? (
          <>
            {imageToDisplay(1, "left")}
            {paragraphToDisplay(ABOUT.descriptionPanelTwo, "right", "left")}
          </>
        ) : (
          <>
            {paragraphToDisplay(ABOUT.descriptionPanelTwo, "right", "left")}
            {imageToDisplay(1, "left")}
          </>
        )}

        {/* Third panel */}
        {imageToDisplay(2, "right")}
        {paragraphToDisplay(ABOUT.descriptionPanelThree, "left", "right")}
      </Grid>
      <InfoActionBox
        infoText={ABOUT.terms}
        buttonText={ABOUT.button}
        navigateTo={"/shop"}
      />
    </Container>
  );
};

export default About;
