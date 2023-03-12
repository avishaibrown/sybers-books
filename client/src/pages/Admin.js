import { useState, useRef } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db, auth } from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { logoutStart, logoutSuccess, logoutFailure } from "../slices/auth";
import {
  Container,
  Backdrop,
  CircularProgress,
  Box,
  Alert,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { ADMIN, MENU_ITEMS } from "../utils/constants";

const Admin = () => {
  const AlertRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onActionCompleted = () => {
    setAlertMessage(true);
    window.scrollTo(0, 0);
    AlertRef.current && AlertRef.current.focus();
  };

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
        mt: alertMessage ? 0 : { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 5 }}>
          {error}
        </Alert>
      )}
      {alertMessage && (
        <Box m={3}>
          <Alert
            onClose={() => setAlertMessage(null)}
            severity="info"
            variant="filled"
            ref={AlertRef}
            m={5}
          >
            Placeholder
          </Alert>
        </Box>
      )}
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{ fontSize: { xs: "3rem", md: "3.75rem" }, mb: 10 }}
      >
        {ADMIN.title}
      </Typography>
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
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 5 }}
        onClick={onLogout}
      >
        {ADMIN.logoutButton}
      </Button>
    </Container>
  );
};

export default Admin;
