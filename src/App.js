import Home from "./containers/Home";
import About from "./containers/About";
import Search from "./containers/Search";
import Contact from "./containers/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { CssBaseline, Container, LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MENU_ITEMS, NAME, COPYRIGHT } from "./utils/constants";
import playfairDisplay from "typeface-playfair-display";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Deploy "firebase deploy --only hosting:sybersbooks"
//To run app locally via firebase CLI: "firebase emulators:start --only hosting"

const firebaseConfig = {
  apiKey: "AIzaSyD6UFqJ5S5hGJJvjCfy9hxNXSTNUy9w4v8",
  authDomain: "sybers-books.firebaseapp.com",
  projectId: "sybers-books",
  storageBucket: "sybers-books.appspot.com",
  messagingSenderId: "706386815840",
  appId: "1:706386815840:web:dc1ae6a53b34cb88ef4c05",
  measurementId: "G-56S6BK0TZY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdMOJcjAAAAANU2m3jcWbDF_DNmZbLK8OgIwswB"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const theme = createTheme({
  palette: {
    background: {
      default: "#fffb70",
    },
  },
  typography: {
    fontFamily: '"Playfair Display", cursive',
  },
  overrides: {
    CssBaseline: {
      "@global": {
        "@font-face": [playfairDisplay],
      },
    },
  },
});

const App = () => {
  let routes = (
    <Routes>
      <Route path={MENU_ITEMS[0].link} exact element={<Home />} />
      <Route path={MENU_ITEMS[1].link} element={<About />} />
      <Route path={MENU_ITEMS[2].link} element={<Search />} />
      <Route path={MENU_ITEMS[3].link} element={<Contact />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  return (
    <Suspense fallback={<LinearProgress color="secondary" />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title={NAME} image="app-title.png" menuItems={MENU_ITEMS} />
          {routes}
          <Footer copyright={COPYRIGHT} />
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
