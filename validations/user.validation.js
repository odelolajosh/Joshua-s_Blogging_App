const Joi = require('joi');

exports.SignUpSchema = Joi.object({
  name: Joi
    .string()
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, "name should match <first name> <last name>")
    .required("name is required"),
  email: Joi
    .string()
    .email()
    .required("email is required"),
  password: Joi
    .string()
    .min(6)
    .required("password is required"),
});

exports.LoginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required("email is required"),
  password: Joi
    .string()
    .min(6)
    .required("password is required"),
});