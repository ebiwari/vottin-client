export const prepareText = (text) => {
  if (text.length > 0) {
    return text.trim().toLowerCase();
  }
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
