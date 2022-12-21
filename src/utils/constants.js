export const NAME = "Syber's Books";

export const BANNER_TITLES = ["Rare.", "Out of Print.", "Niche."];

export const BANNER_DESCRIPTION = "Melbourne's #1 Bookstore";

export const MAIN_ACTION_BUTTON = "Start Browsing";

export const MENU_ITEMS = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Search", link: "/search" },
  { title: "Contact", link: "/contact" },
];

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

export const MOCK_SEARCH_RESULTS = {
  title: "Search Results",
  books: [
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      description: "Lorem ipsum blah blah",
      image: "https://source.unsplash.com/random",
    },
    {
      title: "The Prophet",
      author: "Kahlil Gibran",
      description: "Lorem ipsum blah blah",
      image: "https://source.unsplash.com/random",
    },
    {
      title: "The Stranger",
      author: "Albert Camus",
      description: "Lorem ipsum blah blah",
      image: "https://source.unsplash.com/random",
    },
  ],
};

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

export const COPYRIGHT = "Copyright © AB Development";
