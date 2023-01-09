//HEADER
export const APP_TITLE = "Syber's Books";
export const APP_TITLE_IMAGE_FILE_NAME = "app-title.png";
export const MENU_ITEMS = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Search", link: "/search" },
  { title: "Contact", link: "/contact" },
  { title: "Cart", link: "/cart" },
];
export const PAYMENT_ROUTES = [
  { title: "Success", link: "/success" },
  { title: "Cancel", link: "/cancel" },
];

//HOME PAGE
export const BANNER_TITLES = ["Rare.", "Out of Print.", "Niche."];
export const BANNER_DESCRIPTION = "Melbourne's #1 Second-Hand Bookstore";
export const MAIN_ACTION_BUTTON = "Start Browsing";

//ABOUT PAGE
export const ABOUT = {
  title: "About",
  description:
    "(As all true stories start) Once upon a time there was a bookshop called Pigs' Wings Books " +
    "run by a young blonde-headed girl called Jean. There was another young girl called Penny who had " +
    "completed her nursing training in Queensland, and had come to the big smoke of Melbourne...",
  terms:
    "All transactions in Australian dollars (AUD). We accept Mastercard, Visa, Diners, Amex, and PayPal.",
  image: "about-photo.png",
};

//SEARCH PAGE
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
};

//FOOTER
export const COPYRIGHT = "Copyright © AB Development";

//STRIPE LIVE KEY
export const STRIPE_KEY =
  "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";
