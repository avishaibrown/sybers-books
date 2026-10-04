import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Button as MuiButton,
  Alert,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useTheme, alpha } from "@mui/material/styles";
import { CONTACT } from "../utils/constants";
import MapContainer from "../components/MapContainer";
import { updateObject, checkValidity } from "../utils/util";
import emailjs from "emailjs-com";

const Contact = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const theme = useTheme();

  const [contactForm, setContactForm] = useState({
    name: {
      value: "",
      validations: { required: true },
      valid: false,
      touched: false,
    },
    email: {
      value: "",
      validations: { required: true, isEmail: true },
      valid: false,
      touched: false,
    },
    phone: {
      value: "",
      validations: { required: true, isNumeric: true },
      valid: false,
      touched: false,
    },
    message: {
      value: "",
      validations: { required: true, maxLength: 1000 },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const onChange = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    const isValid = checkValidity(value, contactForm[fieldName].validations);

    setContactForm(
      updateObject(contactForm, {
        [fieldName]: updateObject(contactForm[fieldName], {
          value: value,
          valid: isValid,
          touched: true,
        }),
      })
    );
  };

  const onBlur = (event) => {
    const fieldName = event.target.name;
    const isValid = checkValidity(event.target.value, contactForm[fieldName].validations);

    setContactForm(
      updateObject(contactForm, {
        [fieldName]: updateObject(contactForm[fieldName], {
          valid: isValid,
          touched: true,
        }),
      })
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      setLoading(true);
      setErrorMsg("");
      emailjs
        .sendForm(
          "service_3ak3yjc",
          "template_lsuwglk",
          event.target,
          "RMoHfk1bnq71IJCqI"
        )
        .then(
          () => {
            setLoading(false);
            setSuccess(true);
          },
          (error) => {
            setLoading(false);
            setErrorMsg("Unable to send message right now. Please call or email directly.");
            console.error(error);
          }
        );
    }
  };

  return (
    <Box component="section" sx={{ pb: 10 }}>
      {/* 1. Header Banner */}
      <Box
        sx={{
          backgroundColor: "#FCFAF6",
          borderBottom: `1px solid rgba(24, 65, 50, 0.12)`,
          py: { xs: 5, md: 7 },
          px: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              mb: 1.5,
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
            }}
          >
            Visit Our Store or Send an Enquiry
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: "auto", lineHeight: 1.7 }}>
            Have a question about a rare book, book valuation, or order tracking? Reach out directly
            or drop by our Caulfield South bookstore.
          </Typography>
        </Container>
      </Box>

      {/* 2. Main 2-Column Content */}
      <Container maxWidth="lg" sx={{ mt: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 4, lg: 6 }}>
          {/* Left Column: Store Details & Map */}
          <Grid item xs={12} lg={5.5}>
            <Stack spacing={3}>
              {/* Store Information Card */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: "0 6px 20px rgba(28, 53, 45, 0.04)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 3,
                  }}
                >
                  Store Details
                </Typography>

                <Stack spacing={2.5}>
                  {/* Address */}
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "10px",
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        color: "primary.main",
                      }}
                    >
                      <LocationOnOutlinedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                        Syber's Books
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        666 Glenhuntly Road, Caulfield South, VIC 3162
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.2 }}>
                        Melbourne, Victoria, Australia
                      </Typography>
                    </Box>
                  </Box>

                  {/* Phone */}
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "10px",
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        color: "primary.main",
                      }}
                    >
                      <PhoneOutlinedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                        Phone / Enquiries
                      </Typography>
                      <Typography
                        component="a"
                        href="tel:0419330240"
                        variant="body2"
                        sx={{
                          color: "secondary.main",
                          textDecoration: "none",
                          fontWeight: 600,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        0419 330 240
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "10px",
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        color: "primary.main",
                      }}
                    >
                      <EmailOutlinedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                        Email Direct
                      </Typography>
                      <Typography
                        component="a"
                        href="mailto:sybersbooks@gmail.com"
                        variant="body2"
                        sx={{
                          color: "secondary.main",
                          textDecoration: "none",
                          fontWeight: 600,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        sybersbooks@gmail.com
                      </Typography>
                    </Box>
                  </Box>

                  {/* Hours Guidance */}
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "10px",
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        color: "primary.main",
                      }}
                    >
                      <AccessTimeOutlinedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                        Owner & Curator
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Penny Merrit — Dedicated personal assistance for serious collectors & casual browsers.
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>

              {/* Interactive Map Frame */}
              <Box
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: "0 6px 20px rgba(28, 53, 45, 0.04)",
                  height: 320,
                  position: "relative",
                }}
              >
                <MapContainer
                  center={CONTACT.googleMapsCoordinates}
                  zoom={CONTACT.googleMapsZoom}
                  markerTitle={CONTACT.googleMapsMarkerTitle}
                  markerDescription={CONTACT.googleMapsMarkerDescription}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Right Column: Contact Enquiry Form */}
          <Grid item xs={12} lg={6.5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4.5 },
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: "0 8px 30px rgba(28, 53, 45, 0.06)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                  mb: 1,
                }}
              >
                Send Us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.6 }}>
                Fill out the form below and Penny or our team will get back to you within 24 hours.
              </Typography>

              {errorMsg && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                  {errorMsg}
                </Alert>
              )}

              {success ? (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    px: 2,
                    borderRadius: "12px",
                    backgroundColor: alpha(theme.palette.primary.main, 0.03),
                  }}
                >
                  <CheckCircleOutlineRoundedIcon sx={{ fontSize: 54, color: "primary.main", mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                    Message Sent Successfully!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420, mx: "auto", mb: 3 }}>
                    {CONTACT.enquirySuccessMsg}
                  </Typography>
                  <MuiButton
                    variant="outlined"
                    onClick={() => {
                      setSuccess(false);
                      setContactForm({
                        name: { value: "", validations: { required: true }, valid: false, touched: false },
                        email: { value: "", validations: { required: true, isEmail: true }, valid: false, touched: false },
                        phone: { value: "", validations: { required: true, isNumeric: true }, valid: false, touched: false },
                        message: { value: "", validations: { required: true, maxLength: 1000 }, valid: false, touched: false },
                      });
                    }}
                    sx={{ borderRadius: "8px", fontWeight: 600 }}
                  >
                    Send Another Message
                  </MuiButton>
                </Box>
              ) : (
                <Box component="form" onSubmit={onSubmit}>
                  <Grid container spacing={2.5}>
                    {/* Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="contact-name"
                        label="Full Name"
                        name="name"
                        required
                        fullWidth
                        value={contactForm.name.value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!contactForm.name.valid && contactForm.name.touched}
                        helperText={
                          !contactForm.name.valid && contactForm.name.touched
                            ? "Please enter your full name"
                            : ""
                        }
                        disabled={loading}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="contact-email"
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        value={contactForm.email.value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!contactForm.email.valid && contactForm.email.touched}
                        helperText={
                          !contactForm.email.valid && contactForm.email.touched
                            ? "Please enter a valid email"
                            : ""
                        }
                        disabled={loading}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                      />
                    </Grid>

                    {/* Phone */}
                    <Grid item xs={12}>
                      <TextField
                        id="contact-phone"
                        label="Phone Number"
                        name="phone"
                        required
                        fullWidth
                        value={contactForm.phone.value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!contactForm.phone.valid && contactForm.phone.touched}
                        helperText={
                          !contactForm.phone.valid && contactForm.phone.touched
                            ? "Please enter a valid phone number (digits only)"
                            : ""
                        }
                        disabled={loading}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                      />
                    </Grid>

                    {/* Message */}
                    <Grid item xs={12}>
                      <TextField
                        id="contact-message"
                        label="Your Message or Book Title Enquiry"
                        name="message"
                        required
                        multiline
                        rows={4}
                        fullWidth
                        value={contactForm.message.value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!contactForm.message.valid && contactForm.message.touched}
                        helperText={
                          !contactForm.message.valid && contactForm.message.touched
                            ? "Please enter your message (under 1000 characters)"
                            : `${contactForm.message.value.length}/1000 characters`
                        }
                        disabled={loading}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <MuiButton
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading || !isFormValid}
                        startIcon={
                          loading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <SendRoundedIcon />
                          )
                        }
                        sx={{
                          py: 1.5,
                          borderRadius: "10px",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          backgroundColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }}
                      >
                        {loading ? "Sending Enquiry..." : "Send Message to Penny"}
                      </MuiButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
