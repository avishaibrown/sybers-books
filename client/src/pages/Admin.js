import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db, auth } from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
  authReset,
} from "../slices/auth";
import {
  addBookStart,
  addBookSuccess,
  addBookFailure,
  addBookReset,
} from "../slices/admin";
import {
  Container,
  Backdrop,
  CircularProgress,
  Box,
  Alert,
  Stack,
  TextField,
  Tab,
  Tabs,
  Grid,
} from "@mui/material";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { ADMIN, MENU_ITEMS } from "../utils/constants";
import { updateObject, checkValidity } from "../utils/util";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`=tabpanel-${index}`}
      aria-labelledby={`=tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Admin = () => {
  const AlertRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [csvData, setCsvData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [addBookForm, setAddBookForm] = useState({
    AUTHOR: {
      value: "",
      validations: {
        required: true,
        maxLength: 400,
      },
      valid: false,
      touched: false,
    },
    BINDING: {
      value: "",
      validations: {
        required: true,
        maxLength: 50,
      },
      valid: false,
      touched: false,
    },
    CATEGORY: {
      value: "",
      validations: {
        required: true,
        maxLength: 100,
      },
      valid: false,
      touched: false,
    },
    CONDITION: {
      value: "",
      validations: {
        required: true,
        maxLength: 50,
      },
      valid: false,
      touched: false,
    },
    COUNTRY: {
      value: "",
      validations: {
        required: true,
        maxLength: 50,
      },
      valid: false,
      touched: false,
    },
    DESCRIPTION: {
      value: "",
      validations: {
        required: true,
        maxLength: 1000,
      },
      valid: false,
      touched: false,
    },
    EDITION: {
      value: "",
      validations: {
        required: true,
        maxLength: 50,
      },
      valid: false,
      touched: false,
    },
    HEAVY: {
      value: "",
      validations: {},
      valid: true,
      touched: false,
    },
    "IMAGE URL": {
      value: "",
      validations: {
        required: true,
        isURL: true,
      },
      valid: false,
      touched: false,
    },
    ISBN: {
      value: "",
      validations: {
        required: true,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    LANGUAGE: {
      value: "",
      validations: {
        required: true,
        maxLength: 50,
      },
      valid: false,
      touched: false,
    },
    "PLACE PUBLISHED": {
      value: "",
      validations: {
        required: true,
        maxLength: 100,
      },
      valid: false,
      touched: false,
    },
    PRICE: {
      value: "",
      validations: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    PUBLISHER: {
      value: "",
      validations: {
        required: true,
        maxLength: 200,
      },
      valid: false,
      touched: false,
    },
    QUANTITY: {
      value: "",
      validations: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    SERIAL: {
      value: "",
      validations: {
        required: true,
        maxLength: 50,
      },
      valid: false,
      touched: false,
    },
    TITLE: {
      value: "",
      validations: {
        required: true,
        maxLength: 400,
      },
      valid: false,
      touched: false,
    },
    "YEAR PUBLISHED": {
      value: "",
      validations: {
        required: true,
        isAYear: true,
      },
      valid: false,
      touched: false,
    },
  });
  const authLoading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);
  const addBookLoading = useSelector((state) => state.admin.loading);
  const addBookError = useSelector((state) => state.admin.error);
  const success = useSelector((state) => state.admin.success);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    addBookError && setAlertMessage(addBookError);
    success && setAlertMessage(success);
    authError && setAlertMessage(authError);
  }, [addBookError, success, authError]);

  useEffect(() => {
    if (alertMessage) {
      window.scrollTo(0, 0);
      AlertRef.current && AlertRef.current.focus();
    }
  });

  const onFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const onImportCSV = () => {
    const collectionRef = collection(db, "Books");

    csvData.forEach(async (row) => {
      await addDoc(collectionRef, row);
    });
  };

  useEffect(() => {
    const formKeys = Object.keys(addBookForm);
    const isFormValid = formKeys.every((key) => addBookForm[key].valid);
    setIsFormValid(isFormValid);
  }, [addBookForm]);

  const onChange = (event) => {
    const updatedControls = updateObject(addBookForm, {
      [event.target.name]: updateObject(addBookForm[event.target.name], {
        value: event.target.value,
        touched: false,
      }),
    });
    setAddBookForm(updatedControls);
  };

  const onBlur = (event) => {
    const updatedControls = updateObject(addBookForm, {
      [event.target.name]: updateObject(addBookForm[event.target.name], {
        valid: checkValidity(
          event.target.value,
          addBookForm[event.target.name].validations
        ),
        touched: true,
      }),
    });
    setAddBookForm(updatedControls);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      const bookData = {};
      for (const key in addBookForm) {
        bookData[key] = addBookForm[key].value;
      }
      try {
        dispatch(addBookStart());
        const docRef = await addDoc(collection(db, "Books"), bookData);
        dispatch(addBookSuccess(ADMIN.bookAddedMessage + docRef.id));
        resetAddBookForm();
      } catch (error) {
        dispatch(addBookFailure(ADMIN.bookAddErrorMessage + error.message));
      }
    }
  };

  const resetAddBookForm = () => {
    const updatedForm = {};
    for (let formElementId in addBookForm) {
      updatedForm[formElementId] = {
        ...addBookForm[formElementId],
        value: "",
        valid: false,
        touched: false,
      };
      if (formElementId === "HEAVY") {
        updatedForm[formElementId] = {
          ...addBookForm[formElementId],
          valid: true,
        };
      }
    }
    setAddBookForm(updatedForm);
  };

  const onAlertClose = () => {
    setAlertMessage(null);
    dispatch(addBookReset());
    dispatch(authReset());
  };

  const onLogout = () => {
    dispatch(logoutStart());
    signOut(auth)
      .then(() => {
        dispatch(logoutSuccess());
        navigate(MENU_ITEMS[0].link);
      })
      .catch((error) => {
        dispatch(logoutFailure(error.message));
      });
  };

  return (
    <Container
      component="section"
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, #F3D8A0 0%, #FFFFFF 100%)",
      }}
      disableGutters
      maxWidth={false}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={authLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {alertMessage && (
        <Box p={5}>
          <Alert
            onClose={onAlertClose}
            severity={success ? "info" : "error"}
            variant="filled"
            ref={AlertRef}
          >
            {alertMessage}
          </Alert>
        </Box>
      )}
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.75rem" },
          mb: { xs: 5, md: 10 },
        }}
      >
        {ADMIN.title}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          py: 3,
        }}
      >
        <Box sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            centered
            orientation="vertical"
          >
            <Tab label="Import CSV to Firestore" />
            <Tab label="Add book to Firestore" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ mx: 5 }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <TextField type="file" onChange={onFileUpload} />
            <Button variant="contained" onClick={onImportCSV}>
              {ADMIN.importButtonText}
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={onSubmit}>
            <Grid container justifyContent="center" px={{ md: 10 }}>
              <Grid container spacing={2} mb={3} justifyContent="center">
                {ADMIN.addBookFields.map((field) => (
                  <Grid item xs={12} key={field.id}>
                    <TextField
                      id={field.id}
                      label={field.label}
                      name={field.name}
                      required={field.required}
                      multiline={field.multiline}
                      rows={field.rows}
                      fullWidth
                      variant="filled"
                      onBlur={onBlur}
                      onChange={onChange}
                      autoFocus={field.autoFocus}
                      disabled={addBookLoading}
                      value={addBookForm[field.name].value}
                      error={
                        !addBookForm[field.name].valid &&
                        addBookForm[field.name].touched
                      }
                      helperText={
                        !addBookForm[field.name].valid &&
                        addBookForm[field.name].touched &&
                        field.error
                      }
                    />
                  </Grid>
                ))}
              </Grid>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={addBookLoading}
                >
                  {ADMIN.submitButton}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ textTransform: "none" }}
                  disabled={addBookLoading}
                  onClick={resetAddBookForm}
                >
                  {ADMIN.clearButton}
                </Button>
              </Stack>
            </Grid>
          </form>
        </TabPanel>
      </Box>
      <Button
        variant="contained"
        color="error"
        size="large"
        sx={{ mt: 5 }}
        onClick={onLogout}
      >
        <b>{ADMIN.logoutButton}</b>
      </Button>
    </Container>
  );
};

export default Admin;
