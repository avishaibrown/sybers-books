const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("./client/src/firebase/firebase-config");
const { collection, getDocs, query, limit } = require("firebase/firestore");

const truncateString = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};

const populateStripeWithBooks = async () => {
  const q = query(collection(db, "Books"), limit(5));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const book = doc.data();
    stripe.products
      .create({
        name: truncateString(book.TITLE, 250, true),
        description: truncateString(book.DESCRIPTION, 500, true),
        metadata: {
          author: truncateString(book.AUTHOR, 500, true),
          buyerEmail: book["BUYER EMAIL"],
          category: book.CATEGORY,
          edition: book.EDITION,
          heavy: book.HEAVY,
          isbn: book.ISBN,
          orderNumber: book["ORDER NUMBER"],
          serial: book.SERIAL,
          status: book.STATUS,
          weight: book.WEIGHT,
        },
        active: true,
      })
      .then((product) => {
        stripe.prices
          .create({
            unit_amount: book["STRIPE PRICE"],
            currency: "aud",
            product: product.id,
          })
          .then((price) => {
            console.log("Success! Book product id: " + product.id);
            console.log("Success! Book price id: " + price.id);
          });
      });
  });
};

// populateStripeWithBooks();
