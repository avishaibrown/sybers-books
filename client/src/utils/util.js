import CurrencyFormat from "react-currency-format";

export const truncateString = (str, n, useWordBoundary) => {
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

export const formatAsCurrency = (value) => {
  return (
    <CurrencyFormat
      value={value}
      displayType={"text"}
      prefix={"$"}
      suffix={" AUD"}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale
    />
  );
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isURL) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isAYear) {
    isValid =
      parseInt(value) >= 0 && parseInt(value) <= new Date().getFullYear();
  }

  return isValid;
};

const createData = (attribute, value) => {
  return { attribute, value };
};

export const getBookDetailsData = (book) => {
  let rowData = [];
  book.PRICE !== "" &&
    rowData.push(createData("Price", formatAsCurrency(book.PRICE)));
  book.BINDING !== "" && rowData.push(createData("Format", book.BINDING));
  book.EDITION !== "" && rowData.push(createData("Edition", book.EDITION));
  book.SIGNED !== "" && rowData.push(createData("Signed", book.SIGNED));
  if (book.CONDITION !== "") {
    rowData.push(createData("Condition", book.CONDITION));
  } else if (book["DJ CONDITION"] !== "") {
    rowData.push(createData("Condition", book["DJ CONDITION"]));
  }
  book["YEAR PUBLISHED"] !== "" &&
    rowData.push(createData("Year Published", book["YEAR PUBLISHED"]));
  book["PLACE PUBLISHED"] !== "" &&
    rowData.push(createData("Place Published", book["PLACE PUBLISHED"]));
  book.PUBLISHER !== "" &&
    rowData.push(createData("Publisher", book.PUBLISHER));
  book.LANGUAGE !== "" && rowData.push(createData("Language", book.LANGUAGE));
  book.COUNTRY !== "" && rowData.push(createData("Country", book.COUNTRY));
  book.CATEGORY !== "" && rowData.push(createData("Genre", book.CATEGORY));
  book.ISBN !== "" && rowData.push(createData("ISBN", book.ISBN));

  return rowData;
};

export const searchResultsCounter = (itemsPerPage, totalItems, currentPage) => {
  const startIndex = currentPage * itemsPerPage + 1;
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalItems);

  return `Showing ${startIndex}-${endIndex} of ${totalItems} items`;
};

export const stringToSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
