import {
  regExpValidation,
  requiredValidation,
  lengthValidation,
} from "../../utils/formValidate";

type InputValidator = {
  validate: (a: string, b?: string | undefined) => boolean;
  errorMessage: string;
};
type FormValidators = {
  [key: string]: InputValidator[];
};

export const signInFormValidators: FormValidators = {
  login: [
    {
      validate: (value) =>
        regExpValidation(value, "^[a-zA-ZА-Яа-я0-9_-]{3,20}$"),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Login is required!",
    },
    {
      validate: (value) => lengthValidation(value, 3, 20),
      errorMessage: "Login length must be from 3 to 20",
    },
  ],
  password: [
    {
      validate: (value) =>
        regExpValidation(
          value,
          /^(?=.*\d)(?=.*[!@#$%^&*-_,>?.])?(?=.*[a-z])(?=.*[A-Z]).{8,40}$/
        ),
      errorMessage: "Enter correct value!",
    },
    {
      validate: (value) => requiredValidation(value),
      errorMessage: "Password is required!",
    },
    {
      validate: (value) => lengthValidation(value, 8, 40),
      errorMessage: "Password length must be from 8 to 40",
    },
  ],
};
