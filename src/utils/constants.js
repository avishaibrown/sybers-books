import {
  Home,
  Face3,
  Email,
  ShoppingCart,
  Storefront,
} from "@mui/icons-material";

//HEADER
export const APP_TITLE = "Syber's Books";
export const APP_TITLE_IMAGE_FILE_NAME = "./images/app-title.png";
export const MENU_ITEMS = [
  { title: "Home", link: "/", icon: <Home /> },
  {
    title: "Shop",
    link: "/shop",
    icon: <Storefront />,
    showIconInAppBar: true,
  },
  { title: "About", link: "/about", icon: <Face3 /> },
  { title: "Contact", link: "/contact", icon: <Email /> },
  { title: "Cart", link: "/cart", icon: <ShoppingCart /> },
];
export const PAYMENT_ROUTES = [
  { title: "Transaction Success", link: "/success" },
  { title: "Transaction Error", link: "/error" },
];

//HOME PAGE
export const HOME = {
  hero: {
    titles: ["Rare.", "Out of Print.", "Niche."],
    description: [
      "Discover the hidden gems of literature at Syber's Books:",
      "Where rare finds meet passionate book lovers.",
    ],
    image: "./images/home-photo.jpg",
    button: "Start Browsing",
  },
};

//ABOUT PAGE
export const ABOUT = {
  title: "About",
  description: [
    "Welcome to Syber's Books, your destination for all things rare and unique!",
    "At Syber's Books, we are dedicated to bringing you the best in second-hand books, with a focus on those hard-to-find titles covering topics from ornithology to the occult. As a woman-owned bookstore, we have a personal touch and a passion for books that sets us apart. With over 200,000 books in our collection, you're sure to find something that piques your interest.",
    "In addition to our diverse selection of books, we also offer a one-of-a-kind shopping experience. Our physical bookstore is home to three feline residents who are always eager to meet new visitors. And of course, our owner, Penny, is always on hand to answer questions and help you find the perfect book.",
    "At Syber's Books, we believe that books have the power to inspire, educate, and entertain, and we are committed to making sure you have access to the books you love. So come and explore our shelves today, and discover why Syber's Books is the ultimate destination for book lovers everywhere!",
  ],
  terms: [
    "All transactions are in Australian dollars (AUD).",
    "We accept Mastercard, Visa, Diners, Amex, and PayPal.",
  ],
  images: [
    "./images/about-store-front.png",
    "./images/about-penny.png",
    "./images/about-cat-in-store.jpg",
  ],
  button: "Shop Now",
};

//SHOP PAGE
export const SHOP = {
  searchBarLabel: "Search from our collection of over 100,000 books:",
  searchBarPlaceholder:
    "Type to search for a book by title, author, genre, or ISBN",
  searchResultsTitle: "Search Results",
  searchTimeout: 1000,
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
  noResults: "No results found. Try alter your search term.",
  noResultsSuggestions: [
    "Capitalise search terms to get better matches",
    "Authors are typically listed in 'Last Name, First Name' format",
  ],
  searchResultsErrorLine1:
    "The following error was encountered while attempting to search the database:",
  searchResultsErrorLine2: "Please try again later.",
  modalTabs: {
    0: "Details",
    1: "Description",
  },
  modalButtons: {
    add: "Add To Cart",
    remove: "Remove From Cart",
  },
  addedToCartMessage: " added to cart",
  removedFromCartMessage: " removed from cart",
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
export const CART = {
  title: "Cart",
  emptyCartMessage: "Your cart is empty.",
  cartTotals: "Cart Totals",
  columnHeaders: ["", "Book Title", "Price"],
  subtotal: "Subtotal",
  shipping: "Shipping",
  shippingErrorText: "Please select one of the shipping options.",
  total: "Total",
  transactionCancelled: "TRANSACTION CANCELLED",
};

//GOOGLE PAY
export const UNSERVICEABLE_SHIPPING_COUNTRIES = [];
export const SHIPPING_ADDRESS_UNSERVICEABLE_REASON =
  "We cannot deliver to the shipping address you have provided.";
export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Shipping ($14.99 AUD)",
    description: "Standard shipping arrives in 5-7 business days",
    price: "14.99",
  },
  {
    id: "express",
    label: "Express Shipping ($29.99 AUD)",
    description: "Express shipping delivered in 1-3 business days",
    price: "29.99",
  },
];

export const FOOTER = {
  imageAlt: "Syber's Books",
  image: "./images/app-title.png",
  copyright: "Copyright © AB Development",
  link: "https://www.facebook.com/SybersBooks/",
};

export const CATEGORIES = "Browse By Categories";
export const CATEGORIES_FROM_DB = [
  "Animals & Birds",
  "Anthropology",
  "Antiquarian",
  "Antiques & Collectibles",
  "Archaeology",
  "Architecture",
  "Arctic & Antarctic",
  "Art",
  "Automobiles & Vehicles",
  "Aviation",
  "Biography & Autobiography",
  "Books for Writers",
  "Books on Books",
  "Business, Finance & Marketing",
  "Children",
  "Comics & Graphic Novels",
  "Communications & Media",
  "Computers & Internet",
  "Cooking, Wine & Dining",
  "Crafts & Hobbies",
  "Crime Fiction",
  "Dance",
  "Economics",
  "Education",
  "Engineering, Industrial, Trade",
  "Environment & Ecology",
  "Erotica",
  "Essays & Literary Criticism",
  "Exploration",
  "Family & Relationships",
  "Fantasy",
  "Farming & Rural Life",
  "Fashion, Fabrics & Style",
  "Fiction",
  "Film, Radio & Television",
  "Fishing & Hunting",
  "Games & Gaming",
  "Gardening",
  "Gay & Lesbian",
  "Genealogy & Local History",
  "Geography & Maps",
  "History",
  "Home Decorating & Repair",
  "Humour",
  "Indigenous Cultures",
  "Language & Linguistics",
  "Law & Criminal Studies",
  "Literature",
  "Magic, Paranormal & Occult",
  "Mathematics",
  "Medicine & Health",
  "Military & Warfare",
  "Mountaineering",
  "Music",
  "Myths, Legends & Folklore",
  "Natural History & Resources",
  "New Age & Alternative",
  "Parenting & Childcare",
  "Philosophy",
  "Photography",
  "Poetry",
  "Politics & Government",
  "Psychology & Psychiatry",
  "Railways",
  "Reference",
  "Religion & Theology",
  "Science",
  "Science Fiction & Fantasy",
  "Sculpture & Ceramics",
  "Self Help & Motivation",
  "Sexuality & Gender",
  "Ships & the Sea",
  "Sociology & Culture",
  "Sports & Pastimes",
  "Teens & Young Adult",
  "Theatre & Plays",
  "Travel & Places",
  "Women & Feminism",
];

export const PRIVACY_POLICY = {
  title: "Privacy Policy",
  link: "/privacy-policy",
  lastUpdatedDate: "12/02/2023",
  email: "sybersbooks@gmail.com",
};

export const TERMS_AND_CONDITIONS = {
  title: "Terms & Conditions",
  link: "/terms-and-conditions",
  lastUpdatedDate: "12/02/2023",
  email: "sybersbooks@gmail.com",
};

export const SHIPPING_AND_RETURNS = {
  title: "Shipping & Returns",
  link: "/shipping-and-returns",
  email: "sybersbooks@gmail.com",
};

export const SUCCESS = {
  title: "Congratulations!",
  message: "Your order has been placed successfully.",
  link: "/",
  linkText: "Return to Home",
};

export const ERROR = {
  title: "Uh Oh!",
  message: "There was an error processing your order.",
  link: "/",
  linkText: "Return to Home",
};
