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

  return isValid;
};

const createData = (attribute, value) => {
  return { attribute, value };
};

export const getBookDetailsData = (book) => {
  let rowData = [];
  book.binding1 !== "" && rowData.push(createData("Format", book.binding1));
  book.edition1 !== "" && rowData.push(createData("Edition", book.edition1));
  book.signed !== "" && rowData.push(createData("Signed", book.signed));
  if (book.condition1 !== "") {
    rowData.push(createData("Condition", book.condition1));
  } else if (book.djCondition !== "") {
    rowData.push(createData("Condition", book.djCondition));
  }
  book.yop !== "" && rowData.push(createData("Year Published", book.yop));
  book.pop !== "" && rowData.push(createData("Place Published", book.pop));
  book.publisher1 !== "" &&
    rowData.push(createData("Publisher", book.publisher1));
  book.language !== "" && rowData.push(createData("Language", book.language));
  book.country !== "" && rowData.push(createData("Country", book.country));
  book.category5 !== "" && rowData.push(createData("Genre", book.category5));
  book.isbn !== "" && rowData.push(createData("ISBN", book.isbn));

  return rowData;
};
