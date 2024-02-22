import { regExpValidation, requiredValidation, lengthValidation } from "../../utils/formValidate";

export const signInFormValidators: { [key: string]: { validate: (value: string) => boolean, errorMessage: string }[] } = {
  login: [
    {
      validate: (value: string) => regExpValidation(value, "^[a-zA-ZА-Яа-я0-9_-]{3,20}$"),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Login is required!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Login length must be from 3 to 20'
    }
  ],
  password: [
    {
      validate: (value: string) => regExpValidation(value, `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Password is required!'
    },
    {
      validate: (value: string) => lengthValidation(value, 8, 40),
      errorMessage: 'Password length must be from 8 to 40'
    }
  ],
}