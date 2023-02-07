import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Cart from "./pages/Cart";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { CssBaseline, Container, LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  MENU_ITEMS,
  APP_TITLE,
  FOOTER,
  APP_TITLE_IMAGE_FILE_NAME,
  PAYMENT_ROUTES,
} from "./utils/constants";
import libreFranklin from "@fontsource/libre-franklin";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Libre Franklin", cursive',
  },
  overrides: {
    CssBaseline: {
      "@global": {
        "@font-face": [libreFranklin],
      },
    },
  },
});

//TODO: Integrate Google Pay
//TODO: Add SearchBar in NavBar
//TODO: Wild idea! Add "album layout" component with random book selections (Lucky dip vibes)
//TODO: Add Categories section to search by all available categories
//TODO: Focus on UX:
// 3) change background and make text larger depending on screen size
// Work out colour palette, layout consistency
// 5) Focus on a11y focusing to headings and basic text reading
// (try use with keyboard only, remove sticky components, add label and help text to search bar
// , add focus on page loading, anything interactive should be tabbable)

//TODO: Host website

const App = () => {
  let routes = (
    <Routes>
      <Route path={MENU_ITEMS[0].link} exact element={<Home />} />
      <Route path={MENU_ITEMS[1].link} element={<Shop />} />
      <Route path={MENU_ITEMS[2].link} element={<About />} />
      <Route path={MENU_ITEMS[3].link} element={<Contact />} />
      <Route path={MENU_ITEMS[4].link} element={<Cart />} />
      <Route path={PAYMENT_ROUTES[0].link} element={<Success />} />
      <Route path={PAYMENT_ROUTES[1].link} element={<Cancel />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  const cart = useSelector((state) => state.cart.cart);

  return (
    <Suspense fallback={<LinearProgress color="secondary" />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container disableGutters maxWidth={false}>
          <AppBar
            title={APP_TITLE}
            image={APP_TITLE_IMAGE_FILE_NAME}
            menuItems={MENU_ITEMS}
            navigateTo={MENU_ITEMS[0].link}
            cartItems={cart.length}
          />
          {routes}
          <Footer
            image={FOOTER.image}
            imageAlt={FOOTER.imageAlt}
            copyright={FOOTER.copyright}
            link={FOOTER.link}
          />
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
