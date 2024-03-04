import {
  regExpValidation,
  requiredValidation,
  lengthValidation,
  equalValidation,
} from "../../utils/formValidate";

export type InputValidator = {
  validate: (a: string, b?: string) => boolean;
  errorMessage: string;
};
type FormValidators = {
  [key: string]: InputValidator[];
};

export const profileFormValidators: FormValidators = {
  first_name: [
    {
      validate: (value) => regExpValidation(value, "^[a-zA-ZА-ЯЁа-яё]{2,40}$"),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
  ],
  second_name: [
    {
      validate: (value) => regExpValidation(value, "^[a-zA-ZА-ЯЁа-яё]{2,40}$"),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
  ],
  login: [
    {
      validate: (value) =>
        regExpValidation(value, "^[a-zA-ZА-Яа-я0-9_-]{3,20}$"),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
  ],
  email: [
    {
      validate: (value) =>
        regExpValidation(
          value,
          "^([A-Za-z-0-9]*)+@([A-Za-z-0-9]*)(.([A-Za-z-0-9]+))+$"
        ),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
  ],
  phone: [
    {
      validate: (value) => regExpValidation(value, /^[(+|\d)(\d)]{9,14}$/),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
  ],
  password: [
    {
      validate: (value) =>
        regExpValidation(
          value,
          `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`
        ),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
  ],
  confirm_password: [
    {
      validate: (value) =>
        regExpValidation(
          value,
          `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`
        ),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Enter value!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Enter value!",
    },
    {
      validate: (value, second_value) =>
        equalValidation(value, second_value ?? ""),
      errorMessage: "Passwords must be equal",
    },
  ],
};
