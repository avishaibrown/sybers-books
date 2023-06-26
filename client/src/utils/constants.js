import {
  Home,
  Face3,
  Email,
  ShoppingCart,
  Storefront,
} from "@mui/icons-material";

//NAVIGATION BAR
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
  categoriesHeading: "Browse by Categories",
  categoriesShowMore: "Show More",
};

export const ABOUT = {
  title: "About",
  descriptionPanelOne: [
    "Welcome to Syber's Books, your destination for all things rare and unique!",
    "At Syber's Books, we are dedicated to bringing you the best in second-hand books, with a focus on those hard-to-find titles covering topics from ornithology to the occult. As a woman-owned bookstore, we have a personal touch and a passion for books that sets us apart. With over 200,000 books in our collection, you're sure to find something that piques your interest.",
  ],
  descriptionPanelTwo: [
    "In addition to our diverse selection of books, we also offer a one-of-a-kind shopping experience. Our physical bookstore is home to three feline residents who are always eager to meet new visitors. And of course, our owner, Penny, is always on hand to answer questions and help you find the perfect book.",
  ],
  descriptionPanelThree: [
    "At Syber's Books, we believe that books have the power to inspire, educate, and entertain, and we are committed to making sure you have access to the books you love. So come and explore our shelves today, and discover why Syber's Books is the ultimate destination for book lovers everywhere!",
  ],
  terms: [
    "All transactions are in Australian dollars (AUD).",
    "We accept Mastercard, Visa, Diners, Amex, and PayPal.",
  ],
  images: [
    "./images/about-store-front.png",
    "./images/about-cat-in-store.jpg",
    "./images/about-penny.png",
  ],
  button: "Shop Now",
};

export const SHOP = {
  searchBarLabel: {
    long: "Search from our collection of over 100,000 books:",
    short: "Search from our collection:",
  },
  searchBarPlaceholder: {
    long: "Type to search for a book by title, author, genre, or ISBN",
    short: "Search by title, author, genre or ISBN",
  },
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
  soldText: "This book has been sold and is no longer available.",
  addedToCartMessage: " added to cart",
  removedFromCartMessage: " removed from cart",
  viewCart: "View Cart",
};

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

export const CART = {
  title: "Cart",
  buttonText: "Checkout",
  proceedToCheckout: "Proceed To Checkout",
  emptyCartMessage: ["Your cart is empty."],
  cartTotals: "Cart Totals",
  columnHeaders: ["", "Book Title", "Price"],
  subtotal: "Subtotal",
  emailField: {
    name: "email",
    label: "Enter your email address to begin purchase:",
    error: "Please enter a valid email address",
    validations: {
      required: true,
      isEmail: true,
    },
  },
  shippingField: {
    label: "Shipping:",
    name: "shipping",
    options: [
      { value: "Australia", label: "Australia ($9.99 - $15.99)" },
      { value: "International", label: "International ($39.99)" },
    ],
  },
  checkoutErrorMessageLine1:
    "The following error was encountered while trying to process your order: ",
  checkoutErrorMessageLine2: ". Please try again later.",
  timeout: 30000,
};

export const FOOTER = {
  imageAlt: "Syber's Books",
  image: "./images/app-title.png",
  copyright: "Copyright © AB Development",
  link: "https://www.facebook.com/SybersBooks/",
};

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
  link: "/success",
  title: "Congratulations!",
  message: [
    "Your order was successfully placed. A confirmation email has been sent to the email address you provided. Please allow up to 30 minutes for the email to arrive.",
  ],
  redirectLink: "/",
  redirectLinkText: "Return to Home",
  soldStatus: "Sold",
};

export const AUTH = {
  link: "/auth",
  title: "Administrator Login",
  email: "Email Address",
  password: "Password",
  buttonText: "Login",
  invalidEmail: "Please enter a valid email address",
  invalidPassword: "Please enter a password",
};

export const ADMIN = {
  link: "/admin",
  title: "Admin Dashboard",
  importButtonText: "Import CSV File",
  logoutButton: "Logout",
  addBookFields: [
    {
      id: "author",
      name: "AUTHOR",
      label: "Author",
      required: true,
      error: "Please enter the author (400 characters or less)",
    },
    {
      id: "binding",
      name: "BINDING",
      label: "Binding",
      required: true,
      error: "Please enter the binding (50 characters or less)",
    },
    {
      id: "category",
      name: "CATEGORY",
      label: "Category",
      required: true,
      error: "Please enter the category (100 characters or less)",
    },
    {
      id: "condition",
      name: "CONDITION",
      label: "Condition",
      required: true,
      error: "Please enter the condition (50 characters or less)",
    },
    {
      id: "country",
      name: "COUNTRY",
      label: "Country",
      required: true,
      error: "Please enter the country (50 characters or less)",
    },
    {
      id: "description",
      name: "DESCRIPTION",
      label: "Description",
      multiline: true,
      rows: 4,
      required: true,
      error:
        "Please enter the description (include details about collation, damage,  illustrator/s, size, weight, if signed by author, dust jacket etc.) (1000 characters or less)",
    },
    {
      id: "edition",
      name: "EDITION",
      label: "Edition",
      required: true,
      error: "Please enter the edition (50 characters or less)",
    },
    {
      id: "heavy",
      name: "HEAVY",
      label: "Heavy (Yes if so, keep blank otherwise)",
      required: false,
      error: "",
    },
    {
      id: "imageURL",
      name: "IMAGE URL",
      label: "Image",
      required: true,
      error: "Please enter a valid image URL",
    },
    {
      id: "isbn",
      name: "ISBN",
      label: "ISBN",
      required: true,
      error: "Please enter the ISBN (20 characters or less)",
    },
    {
      id: "language",
      name: "LANGUAGE",
      label: "Language",
      required: true,
      error: "Please enter the language (50 characters or less)",
    },
    {
      id: "placePublished",
      name: "PLACE PUBLISHED",
      label: "Place Published",
      required: true,
      error: "Please enter the place of publication (100 characters or less)",
    },
    {
      id: "price",
      name: "PRICE",
      label: "Price",
      required: true,
      error: "Please enter the price",
    },
    {
      id: "publisher",
      name: "PUBLISHER",
      label: "Publisher",
      required: true,
      error: "Please enter the publisher (200 characters or less)",
    },
    {
      id: "quantity",
      name: "QUANTITY",
      label: "Quantity",
      required: true,
      error: "Please enter the quantity",
    },
    {
      id: "serial",
      name: "SERIAL",
      label: "Serial",
      required: true,
      error: "Please enter the serial number (50 characters or less)",
    },
    {
      id: "title",
      name: "TITLE",
      label: "Title",
      required: true,
      error: "Please enter the title (400 characters or less)",
    },
    {
      id: "yearPublished",
      name: "YEAR PUBLISHED",
      label: "Year Published",
      required: true,
      error: "Please enter the year of publication",
    },
  ],
  submitButton: "Submit",
  clearButton: "Clear",
  bookAddedMessage: "Book successfully added to Firestore. Book id is: ",
  bookAddErrorMessage: "Error encountered: ",
};

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
