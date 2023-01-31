import { Home, Face3, Email, Search, ShoppingCart } from "@mui/icons-material";

//HEADER
export const APP_TITLE = "Syber's Books";
export const APP_TITLE_IMAGE_FILE_NAME = "./images/app-title.png";
export const MENU_ITEMS = [
  { title: "Home", link: "/", icon: <Home /> },
  { title: "Shop", link: "/shop", icon: <Search /> },
  { title: "About", link: "/about", icon: <Face3 /> },
  { title: "Contact", link: "/contact", icon: <Email /> },
  { title: "Cart", link: "/cart", icon: <ShoppingCart /> },
];
export const PAYMENT_ROUTES = [
  { title: "Success", link: "/success" },
  { title: "Cancel", link: "/cancel" },
];

//HOME PAGE
export const HOME = {
  hero: {
    titles: ["Rare.", "Out of Print.", "Niche."],
    description: "Melbourne's #1 Second-Hand Bookstore",
    image: "./images/home-photo.jpg",
    button: "Start Browsing",
  },
};

//ABOUT PAGE
export const ABOUT = {
  title: "About",
  description:
    "(As all true stories start) Once upon a time there was a bookshop called Pigs' Wings Books " +
    "run by a young blonde-headed girl called Jean. There was another young girl called Penny who had " +
    "completed her nursing training in Queensland, and had come to the big smoke of Melbourne...",
  terms:
    "All transactions in Australian dollars (AUD). We accept Mastercard, Visa, Diners, Amex, and PayPal.",
  image: "./images/about-photo.png",
};

//SHOP PAGE
export const SEARCH_BAR_PLACEHOLDER = "Type to search for a book category";
export const SEARCH_RESULTS_TITLE = "Search Results";

//CONTACT PAGE
export const CONTACT = {
  title: "Contact",
  fields: [
    {
      id: "name",
      name: "name",
      label: "Name",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      id: "company",
      name: "company",
      label: "Company",
      required: true,
    },
    {
      id: "address1",
      name: "address1",
      label: "Address1",
      required: true,
    },
    {
      id: "address2",
      name: "address2",
      label: "Address2",
      required: true,
    },
    {
      id: "city",
      name: "city",
      label: "City",
      required: true,
    },
    {
      id: "state",
      name: "state",
      label: "State",
      required: true,
    },
    {
      id: "postcode",
      name: "postcode",
      label: "Postcode",
      required: true,
    },
    {
      id: "country",
      name: "country",
      label: "Country",
      required: true,
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone",
      required: true,
    },
    {
      id: "message",
      name: "message",
      label: "Message",
      multiline: true,
      rows: 4, // only applies if multiline is true
      required: true,
    },
  ],
  submitButton: "Send",
  googleMapsCoordinates: { lat: -37.886479, lng: 145.017559 },
  googleMapsZoom: 15,
  googleMapsMarkerTitle: "Syber's Books",
  googleMapsMarkerDescription: "666 Glenhuntly Rd, Caulfield South, VIC 3162",
};

//CART
export const CART = "Cart";
export const TRANSACTION_CANCELLED = "TRANSACTION CANCELLED";

//GOOGLE PAY
export const STRIPE_KEY =
  "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";
export const UNSERVICEABLE_SHIPPING_COUNTRIES = [];
export const SHIPPING_ADDRESS_UNSERVICEABLE_REASON =
  "We cannot deliver to the shipping address you have provided.";
export const SHIPPING_OPTIONS = [
  {
    id: "free",
    label: "Free shipping",
    description: "Free shipping arrives in 5-7 business days",
    price: "0.00",
  },
  {
    id: "express",
    label: "Express shipping",
    description: "Express shipping delivered in 1-3 business days",
    price: "5.00",
  },
];

export const FOOTER = {
  imageAlt: "Syber's Books",
  image: "./images/app-title.png",
  copyright: "Copyright © AB Development",
};
