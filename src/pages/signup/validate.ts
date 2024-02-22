import { regExpValidation, requiredValidation, lengthValidation } from "../../utils/formValidate";

export const signUpFormValidators = {
  first_name: [
    {
      validate: (value: string) => regExpValidation(value, "^[a-zA-ZА-ЯЁа-яё]{2,40}$"),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
  second_name: [
    {
      validate: (value: string) => regExpValidation(value, "^[a-zA-ZА-ЯЁа-яё]{2,40}$"),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
  login: [
    {
      validate: (value: string) => regExpValidation(value, "^[a-zA-ZА-Яа-я0-9_-]{3,20}$"),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
  email: [
    {
      validate: (value: string) => regExpValidation(value, "^([A-Za-z-0-9]*)+@([A-Za-z-0-9]*)(.([A-Za-z-0-9]+))+$"),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
  phone: [
    {
      validate: (value: string) => regExpValidation(value, `^[(+|\d)(\d)]{9,14}$`),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
  password: [
    {
      validate: (value: string) => regExpValidation(value, `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
  confirm_password: [
    {
      validate: (value: string) => regExpValidation(value, `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`),
      errorMessage: 'Enter correct value!'
    },
    {
      validate: (value: string) => requiredValidation(value),
      errorMessage: 'Enter value!'
    },
    {
      validate: (value: string) => lengthValidation(value, 3, 20),
      errorMessage: 'Enter value!'
    }
  ],
}