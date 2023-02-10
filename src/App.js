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

//TODO: Deal with adding and removing books from cart and showing the snackbar
//TODO: Handle loading and error states for adding to/removing from cart
//TODO: Notification that book has been added/removed from cart
//TODO: Fix styledBadge bug
//TODO: Integrate Google Pay
//TODO: Add ability to search for rough matches, not exact matches
//TODO: Add ability to write to database that item is no longer available
//TODO: If item is no longer available, do not return it in search results
//TODO: Add Categories component with list of all available categories (visible in Home and Shop pages)
//TODO: Try use with keyboard and make sure all interactive elements can be tabbed to, and initial focus should go to headers
//TODO: Remove sticky components (AppBar, ModalHeader, ModalFooter)
//TODO: Work out colour palette and background
//TODO: Finally, host website

//NOTE: Only returning books that have a title, author and price

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
