import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import TransactionSuccess from "./pages/TransactionSuccess";
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
  SUCCESS,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
  SHIPPING_AND_RETURNS,
  AUTH,
  ADMIN,
} from "./utils/constants";
import robotoMono from "@fontsource/roboto-mono";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingReturns from "./pages/ShippingReturns";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", cursive',
  },
  overrides: {
    CssBaseline: {
      "@global": {
        "@font-face": [robotoMono],
      },
    },
  },
});

//TODO: Debug secrets for firebase functions

//LATER
//TODO: Enhance search functionality (Get categories by AllCategories column)
//TODO: Add SearchBar to homepage

const App = () => {
  let routes = (
    <Routes>
      <Route path={MENU_ITEMS[0].link} exact element={<Home />} />
      <Route path={MENU_ITEMS[1].link} element={<Shop />} />
      <Route path={MENU_ITEMS[2].link} element={<About />} />
      <Route path={MENU_ITEMS[3].link} element={<Contact />} />
      <Route path={MENU_ITEMS[4].link} element={<Cart />} />
      <Route path={PRIVACY_POLICY.link} element={<PrivacyPolicy />} />
      <Route path={TERMS_AND_CONDITIONS.link} element={<TermsConditions />} />
      <Route path={SHIPPING_AND_RETURNS.link} element={<ShippingReturns />} />
      <Route path={SUCCESS.link} element={<TransactionSuccess />} />
      <Route path={AUTH.link} element={<Auth />} />
      <Route path={ADMIN.link} element={<Admin />} />
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
            navigateTo={MENU_ITEMS[0].link}
            copyright={FOOTER.copyright}
            menuItems={MENU_ITEMS}
            socialLink={FOOTER.link}
            privacy={PRIVACY_POLICY}
            terms={TERMS_AND_CONDITIONS}
            shipping={SHIPPING_AND_RETURNS}
            adminOnly={AUTH}
          />
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
