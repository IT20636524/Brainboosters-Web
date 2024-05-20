export const requiredField = {
  required: {
    value: true,
    message: "This field is required",
  },
};

const localPattern = '([^<>()\\[\\]\\.,;:\\s@"]+(.[^<>()\\[\\]\\.,;:\\s@"]+)*)';
const secondLevelDomainPattern =
  "([[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])";
const topLevelDomainPattern = "(([a-zA-Z-0-9]+\\.)+[a-zA-Z]{2,})";
const emailPattern = new RegExp(
  `^(${localPattern}|(".+"))@(${secondLevelDomainPattern}|${topLevelDomainPattern})$`,
);

export const emailValidation = {
  required: {
    value: true,
    message: "This field is required",
  },
  pattern: {
    value: emailPattern,
    message: "Invalid email address",
  },
};
