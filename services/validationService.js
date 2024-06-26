const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  fullname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required()
});

const validateUser = (data) => {
  return userSchema.validate(data);
};

// Date validation schema
const dateSchema = Joi.object({
    date: Joi.date().required()
});

const validateDate = (data) => {
    return dateSchema.validate(data);
  };
module.exports = {
  validateUser, validateDate
};
