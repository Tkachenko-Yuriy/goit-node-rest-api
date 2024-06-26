import Joi from "joi";
import { emailRegex } from "../constants/regex.js";
import { subscriptionList } from "../constants/subscriptionList.js";

export const userSignupSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().pattern(emailRegex).required(),
});
