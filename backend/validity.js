const MOBILE_CHARS = "+1234567890() ";
const HOME_CHARS = "1234567890- ";

const stringMatchChars = (string, chars) => {
  for (let i = 0; i < string.length; i++) {
    if (chars.indexOf(string[i]) === -1) return false;
    if (i === string.length - 1) return true;
  }
};

const validateRecord = (record) => {
  const response = {
    valid: false,
    message: "",
  };

  if (!record.name && (!record.home || !record.mobile)) {
    response.message = "Enter mobile or home number.";
    return response;
  }

  if (record.mobile.length) {
    if (record.mobile.length > 19) {
      response.message = "Too long mobile number.";
      return response;
    }

    if (!stringMatchChars(record.mobile, MOBILE_CHARS)) {
      response.message = "Invalid characters at mobile number.";
      return response;
    }
  }

  if (record.home.length) {
    if (record.home.length > 8) {
      response.message = "Too long home number.";
      return response;
    }
    if (!stringMatchChars(record.home, HOME_CHARS)) {
      response.message = "Invalid characters at home number.";
      return response;
    }
  }

  response.valid = true;
  return response;
};

export { validateRecord };
