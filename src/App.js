import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
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
      default: "#fffb70",
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

//TODO: Add Google Pay
//TODO: Add Cart system and build out cart page
//TODO: Add SearchBar in NavBar
//TODO: Add ability to search by Title, Author or ISBN
//TODO: Make Banner wider and larger
//TODO: Reduce fields in Contact page
//TODO: Add pagination to Search Results page
//TODO: Add Filter system to Search Results
//TODO: Add modal to search results book tiles to show more detail and add to cart button
//TODO: Wild idea! Add "album layout" component with random book selections (Lucky dip vibes)
//TODO: Focus on UX:
// 1) make home page banner larger and more inviting,
// 2) contact page wider
// 3) change background and make text larger depending on screen size
// 4) Make search results tiles uniform in size
// 5) Focus on a11y focusing to headings and basic text reading

//TODO: Host website

const App = () => {
  let routes = (
    <Routes>
      <Route path={MENU_ITEMS[0].link} exact element={<Home />} />
      <Route path={MENU_ITEMS[1].link} element={<About />} />
      <Route path={MENU_ITEMS[2].link} element={<Search />} />
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
          />
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
