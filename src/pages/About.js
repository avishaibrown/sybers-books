import { useEffect } from "react";
import { Container, Box, Grid, Stack } from "@mui/material";
import Typography from "../components/Typography";
import InfoActionBox from "../components/InfoActionBox";
import { ABOUT } from "../utils/constants";

const About = () => {
  //scroll to top when page is navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: { md: 10 },
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
        sx={{ fontSize: { xs: "3rem", md: "3.75rem" }, mb: 10 }}
      >
        {ABOUT.title}
      </Typography>
      <Grid container mb={{ xs: 2, lg: 10 }}>
        <Grid item xs={12} lg={5}>
          <Stack
            direction="column"
            alignItems={{ xs: "center", lg: "right" }}
            justifyContent="space-between"
            spacing={2}
          >
            {ABOUT.images.map((image, index) => (
              <Box
                component="img"
                key={"about-image-" + index}
                alt={ABOUT.title}
                src={image}
                sx={{
                  maxWidth: { xs: 400, sm: 450, xl: 600 },
                  borderRadius: "3%",
                }}
              />
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{ float: { xs: "none", xl: "left" }, textAlign: "left" }}
          mx={5}
        >
          {ABOUT.description.map((paragraph, index) => (
            <Typography
              sx={{
                typography: { xs: "body1", sm: "h6", lg: "h6", xl: "h5" },
              }}
              mb={{ xs: 3, sm: 5 }}
              mt={{ xs: 5, sm: 5, lg: 0 }}
              key={"about-description-paragraph-" + index}
            >
              {paragraph}
            </Typography>
          ))}
        </Grid>
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
