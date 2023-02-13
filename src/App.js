import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import TransactionSuccess from "./pages/TransactionSuccess";
import TransactionError from "./pages/TransactionError";
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
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
  SHIPPING_AND_RETURNS,
} from "./utils/constants";
import libreFranklin from "@fontsource/libre-franklin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingReturns from "./pages/ShippingReturns";

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

//TODO: Add ability to write to database that item is no longer available
// ------- batch update is not working atm, perhaps try individual updates?
//TODO: Use Zapier to upload CSV from MS Excel and get it migrated to Stripe
//TODO: Add PSP to Google Pay
//TODO: Research how to send order confirmation email + store orders somewhere? Stripe?

//TODO: Combine Success/Error pages into one Outcome page
//TODO: If item is no longer available, do not return it in search results
//TODO: Try use with keyboard and make sure all interactive elements can be tabbed to, and initial focus should go to headers
//TODO: Fix all bugs when viewport height changes (e.g. Hero)
//TODO: Work out colour palette and background
//TODO: Finally, host website
//TODO: Get Penny to review shipping information

//NOTE: Only returning books that have a title, author and price

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
      <Route path={PAYMENT_ROUTES[0].link} element={<TransactionSuccess />} />
      <Route path={PAYMENT_ROUTES[1].link} element={<TransactionError />} />
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
          />
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
