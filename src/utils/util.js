export const mobileDetected = () => {
  return window.innerWidth <= 800;
};

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
