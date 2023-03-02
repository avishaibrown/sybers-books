import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginStart, loginSuccess, loginFailure } from "../slices/auth";
import {
  Avatar,
  TextField,
  Container,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Button from "../components/Button";
import Typography from "../components/Typography";
import { LockOutlined } from "@mui/icons-material";
import { checkValidity, stringToSlug, updateObject } from "../utils/util";
import { ADMIN, AUTH } from "../utils/constants";

const Auth = () => {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const [isFormValid, setIsFormValid] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: {
      value: "",
      validations: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: "",
      validations: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticatedUser) {
      navigate("/admin");
    }
  }, [authenticatedUser, navigate]);

  useEffect(() => {
    setIsFormValid(authForm.email.valid && authForm.password.valid);
  }, [authForm.email.valid, authForm.password.valid]);

  const handleChange = (event) => {
    const updatedControls = updateObject(authForm, {
      [event.target.name]: updateObject(authForm[event.target.name], {
        value: event.target.value,
        touched: false,
      }),
    });
    setAuthForm(updatedControls);
  };

  const handleBlur = (event) => {
    const updatedControls = updateObject(authForm, {
      [event.target.name]: updateObject(authForm[event.target.name], {
        valid: checkValidity(
          event.target.value,
          authForm[event.target.name].validations
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isFormValid && login(authForm.email.value, authForm.password.value);
  };

  const login = async (email, password) => {
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(loginSuccess(userCredential.user));
        navigate(ADMIN.link);
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };

  return (
    <Container
      component="section"
      maxWidth="sm"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: { md: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 5 }}>
          {error}
        </Alert>
      )}
      <Avatar
        sx={(theme) => ({
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        })}
      >
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h4">
        {AUTH.title}
      </Typography>
      {error && (
        <Box
          sx={{
            marginTop: "8px",
            color: "error.main",
            fontWeight: "fontWeightMedium",
            fontSize: "16px",
          }}
        >
          {AUTH.error}
        </Box>
      )}
      <form
        style={{
          width: "100%",
          marginTop: 16,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={AUTH.email}
          name="email"
          autoComplete="email"
          autoFocus
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            authForm.email.valid === false && authForm.email.touched === true
          }
          helperText={
            authForm.email.valid === false &&
            authForm.email.touched === true &&
            AUTH.invalidEmail
          }
          disabled={loading}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={stringToSlug(AUTH.password)}
          label={AUTH.password}
          type="password"
          id={stringToSlug(AUTH.password)}
          autoComplete="current-password"
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            authForm.password.valid === false &&
            authForm.password.touched === true
          }
          helperText={
            authForm.password.valid === false &&
            authForm.password.touched === true &&
            AUTH.invalidPassword
          }
          disabled={loading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : AUTH.buttonText}
        </Button>
      </form>
    </Container>
  );
};

export default Auth;
