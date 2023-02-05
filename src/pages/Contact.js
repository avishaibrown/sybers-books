import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import Button from "../components/Button";
import Typography from "../components/Typography";
import { CONTACT } from "../utils/constants";
import EmailIcon from "@mui/icons-material/Email";
import MapContainer from "../components/MapContainer";
import ContactLink from "../components/ContactLink";
import { updateObject, checkValidity } from "../utils/util";
// import emailjs from "emailjs-com";

//TODO: Connect form to emailjs

const Contact = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: {
      value: "",
      validations: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      value: "",
      validations: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    phone: {
      value: "",
      validations: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    message: {
      value: "",
      validations: {
        required: true,
        maxLength: 1000,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    setIsFormValid(
      contactForm.name.valid &&
        contactForm.email.valid &&
        contactForm.phone.valid &&
        contactForm.message.valid
    );
  }, [
    contactForm.name.valid,
    contactForm.email.valid,
    contactForm.phone.valid,
    contactForm.message.valid,
  ]);

  const handleChange = (event) => {
    const updatedControls = updateObject(contactForm, {
      [event.target.name]: updateObject(contactForm[event.target.name], {
        value: event.target.value,
        touched: false,
      }),
    });
    setContactForm(updatedControls);
  };

  const handleBlur = (event) => {
    const updatedControls = updateObject(contactForm, {
      [event.target.name]: updateObject(contactForm[event.target.name], {
        valid: checkValidity(
          event.target.value,
          contactForm[event.target.name].validations
        ),
        touched: true,
      }),
    });
    setContactForm(updatedControls);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      setLoading(true);
      // emailjs
      //   .sendForm(
      //     "service_9v1cetq",
      //     "template_rccj6bw",
      //     event.target,
      //     "ngKY7FCIOfcf7-ulR"
      //   )
      //   .then(
      //     () => {
      //       setLoading(false);
      //       setSuccess(true);
      //     },
      //     (error) => {
      //       console.log(error.text);
      //     }
      //   );
    }
  };

  return (
    <Container
      component="section"
      disableGutters
      maxWidth={false}
      sx={{ mt: { xs: 8, md: 10 } }}
    >
      <MapContainer
        center={CONTACT.googleMapsCoordinates}
        zoom={CONTACT.googleMapsZoom}
        markerTitle={CONTACT.googleMapsMarkerTitle}
        markerDescription={CONTACT.googleMapsMarkerDescription}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box justifyContent="center" p={7}>
            <Typography variant="h4" marked="left" gutterBottom>
              {CONTACT.title}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 5 }}>
              {CONTACT.helpText}
            </Typography>
            {CONTACT.storeContactDetails.map((item, index) =>
              item.phone || item.email ? (
                <ContactLink
                  key={"contact-link-" + index}
                  linkType={item.phone ? "tel:" : "mailto:"}
                  linkText={item.phone ? item.phone : item.email}
                />
              ) : (
                <Typography
                  key={"contact-details-" + index}
                  variant="body1"
                  gutterBottom
                >
                  {item}
                </Typography>
              )
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Container
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              px: 10,
              py: 5,
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : !success ? (
              <form onSubmit={handleSubmit}>
                <Grid container justifyContent="center" p={3}>
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoFocus={field.autoFocus}
                          disabled={loading}
                          error={
                            !contactForm[field.name].valid &&
                            contactForm[field.name].touched
                          }
                          helperText={
                            !contactForm[field.name].valid &&
                            contactForm[field.name].touched &&
                            field.error
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<EmailIcon />}
                    sx={{ textTransform: "none" }}
                    disabled={loading}
                  >
                    {CONTACT.submitButton}
                  </Button>
                </Grid>
              </form>
            ) : (
              <Typography>{CONTACT.enquirySuccessMsg}</Typography>
            )}
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
