import * as React from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { CONTACT } from "../utils/constants";
import EmailIcon from "@mui/icons-material/Email";

//TODO: Add smart search for address
//TODO: Connect form to email service
//TODO: Add payment platform

const Contact = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: "white", borderRadius: "4px" }}
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
  );
};

export default Contact;
