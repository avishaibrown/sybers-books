import * as React from "react";
import { Box, Container, Grid, TextField, Button } from "@mui/material";
import Typography from "../components/Typography";
import { CONTACT } from "../utils/constants";
import EmailIcon from "@mui/icons-material/Email";
import MapContainer from "../components/MapContainer";

//TODO: Connect form to email service

const Contact = () => {
  return (
    <Container
      component="section"
      disableGutters
      maxWidth="none"
      sx={{ mt: { xs: 10, md: 12 } }}
    >
      <Box>
        <MapContainer
          center={CONTACT.googleMapsCoordinates}
          zoom={CONTACT.googleMapsZoom}
          markerTitle={CONTACT.googleMapsMarkerTitle}
          markerDescription={CONTACT.googleMapsMarkerDescription}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Container
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              display: "block",
              p: 10,
            }}
          >
            <Grid container justifyContent="center" p={3}>
              <Typography variant="h4" gutterBottom>
                {CONTACT.title}
              </Typography>
              <Grid container spacing={3} mb={3} justifyContent="center">
                {CONTACT.fields.map((field) => (
                  <Grid item xs={12} key={field.id}>
                    <TextField
                      id={field.id}
                      label={field.label}
                      name={field.name}
                      required={field.required}
                      multiline={field.multiline}
                      rows={field.rows}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                size="large"
                endIcon={<EmailIcon />}
                sx={{ textTransform: "none" }}
              >
                {CONTACT.submitButton}
              </Button>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={6} md={6}></Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
