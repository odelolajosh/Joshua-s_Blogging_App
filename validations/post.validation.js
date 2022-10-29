const Joi = require('joi');

exports.CreatePostSchema = Joi.object({
  title: Joi
    .string()
    .required("title is required"),
  description: Joi
    .string()
    .required("description is required"),
  body: Joi
    .string()
    .required("body is required"),
  tags: Joi
    .array()
    .items(Joi.string())
});