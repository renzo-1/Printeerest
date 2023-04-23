const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });

        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const orderSchema = Joi.object({
  type: Joi.string().required(),
  variants: Joi.array().required(),
  totalPrice: Joi.number().required().min(1),
  note: Joi.string().escapeHTML(),
  orderStatus: Joi.string().default("pending"),
  paymentStatus: Joi.string().default("pending"),
});

const deliveryAddressSchema = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string().required().escapeHTML(),
  lastName: Joi.string().required().escapeHTML(),
  email: Joi.string().required().escapeHTML(),
  mobileNo: Joi.string().required().escapeHTML(),
  region: Joi.string().required(),
  province: Joi.string().required(),
  zip: Joi.string().required().escapeHTML(),
  city: Joi.string().required(),
  barangay: Joi.string().required(),
  street: Joi.string().required().escapeHTML(),
  houseNo: Joi.string().escapeHTML(),
  __v: Joi.any(),
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().escapeHTML(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .escapeHTML(),
  password1: Joi.string().min(3).max(30).required().escapeHTML(),
  password2: Joi.ref("password1"),
});

module.exports = { orderSchema, registerSchema, deliveryAddressSchema };
