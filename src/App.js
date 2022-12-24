import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./containers/Home";
import About from "./containers/About";
import Search from "./containers/Search";
import Contact from "./containers/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CssBaseline, Container, LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MENU_ITEMS, NAME, COPYRIGHT } from "./utils/constants";
import playfairDisplay from "typeface-playfair-display";

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
