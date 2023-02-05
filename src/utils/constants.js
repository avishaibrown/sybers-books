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
  description: [
    "(As all true stories start) Once upon a time there was a bookshop called Pigs' Wings Books run by a young blonde-headed girl called Jean.",
    "There was another young girl called Penny who had completed her nursing training in Queensland, and had come to the big smoke of Melbourne...",
  ],
  terms: [
    "All transactions are in Australian dollars (AUD).",
    "We accept Mastercard, Visa, Diners, Amex, and PayPal.",
  ],
  image: "./images/about-photo.png",
  button: "Shop Now",
};

//SEARCH BAR
export const SEARCH_BAR_PLACEHOLDER =
  "Type to search for a book by title, author or ISBN";

//SHOP PAGE
export const SHOP = {
  searchResultsTitle: "Search Results",
  sortByMenuItems: [
    { label: "Price: Low to High", value: "asc" },
    { label: "Price: High to Low", value: "desc" },
  ],
  booksPerPageMenuItems: [
    { label: "12", value: 12 },
    { label: "24", value: 24 },
    { label: "48", value: 48 },
  ],
  booksPerPageLabel: "Books Per Page",
  sortByLabel: "Sort By",
  missingValuesText: {
    title: "Untitled",
    author: "Unknown author",
    price: "No price found",
    isbn: "ISBN not available",
  },
  searchResultsError:
    "Error encountered while attempting to search the database. Please try again later.",
  modalTabs: {
    0: "Details",
    1: "Description",
  },
  modalButtons: {
    add: "Add To Cart",
    remove: "Remove From Cart",
  },
};

//CONTACT PAGE
export const CONTACT = {
  title: "Contact Us",
  helpText:
    "If you have any questions, comments or feedback, or you would like some assistance with your order, feel free to contact the store by phone or email (below), or just use the form.",
  storeContactDetails: [
    "Penny Merrit",
    "Syber's Books",
    "666 Glenhuntly Road",
    "Caulfield South, VIC 3162",
    { phone: "0419 330 240" },
    { email: "sybersbooks@gmail.com" },
  ],
  fields: [
    {
      id: "name",
      name: "name",
      label: "Name",
      required: true,
      error: "Please enter your name",
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      required: true,
      error: "Please enter a valid email address",
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone",
      required: true,
      error: "Please enter a valid phone number",
    },
    {
      id: "message",
      name: "message",
      label: "Message",
      multiline: true,
      rows: 4, // only applies if multiline is true
      required: true,
      error: "Please enter a message (1000 characters or less)",
    },
  ],
  submitButton: "Send",
  enquirySuccessMsg: "Your enquiry has been sent. Thank you!",
  googleMapsCoordinates: { lat: -37.886479, lng: 145.017559 },
  googleMapsZoom: 16,
  googleMapsMarkerTitle: "Syber's Books",
  googleMapsMarkerDescription: "666 Glenhuntly Rd, Caulfield South, VIC 3162",
};

//CART
export const CART = "Cart";
export const TRANSACTION_CANCELLED = "TRANSACTION CANCELLED";

//GOOGLE PAY
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
