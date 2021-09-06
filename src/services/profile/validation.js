import { checkSchema, validationResult } from "express-validator";

const profileSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "name validation failed , type must be string  ",
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage: "surname validation failed , type must be  string ",
    },
  },
  email: {
    in: ["body"],
    isString: {
      errorMessage: "email validation failed , type must be string ",
    },
    
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "password validation failed , type must be string",
    },
  },
  bio: {
    in: ["body"],
    isString: {
      errorMessage: "bio validation failed , type must be string",
    },
  },
 
  title: {
    in: ["body"],
    isString: {
      errorMessage: "title validation failed , type must be string",
    },
  },
  area: {
    in: ["body"],
    isString: {
      errorMessage: "area validation failed , type must be string",
    },
  },
  image: {
    in: ["body"],
    isString: {
      errorMessage: "image validation failed , type must be string",
    },
  },
  username: {
    in: ["body"],
    isString: {
      errorMessage: "username validation failed , type must be string",
    },
  },
};

export const checkProfileSchema = checkSchema(profileSchema);

export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Profile validation is failed");
      error.status = 400;
      error.errors = errors.array();
      next(error);
    }
    next();
  };