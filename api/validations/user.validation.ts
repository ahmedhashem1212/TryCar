const Joi = require('joi');
import { Request, Response } from 'express';

const adminValidation = (request:Request) => {
  const validate = 
    Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
  });
  return validate.validate(request);
};

const userValidation = (request:Request) => {
  const validate = 
    Joi.object({
    mail: Joi.string().min(3).required(),
    name: Joi.string().min(3),
    age: Joi.number(),
    address: Joi.string().min(3),
    phoneNumber: Joi.string().min(3).required(),
  });
  return validate.validate(request);
};
const invoiceValidation = (request:Request) => {
  const validate = 
  Joi.object({
    status: Joi.string().min(3),
    totalAmount: Joi.number(),
    name: Joi.string().min(3).required(),
    user_id :Joi.number(),
    });
  return validate.validate(request);
};
const invoiceDetailedValidation = (request:Request) => {
  const validate = 
  Joi.object({
    items:Joi.array(),
    status: Joi.string().min(3),
    name: Joi.string().min(3).required(),
    user_id :Joi.number(),
    });
  return validate.validate(request);
};

const itemValidation = (request:Request) => {
  const validate = 
  Joi.object({
    quantity: Joi.number().required(),
    totalUnitPrice: Joi.number().required(),
    describtion: Joi.string().min(3),
    name: Joi.string().min(3).required(),
    invoice_id :Joi.number().required(),

    });
  return validate.validate(request);
};
const updateItemValidation = (request:Request) => {
  const validate = 
  Joi.object({

    id: Joi.number().required(),
    quantity: Joi.number(),
    totalUnitPrice: Joi.number(),
    describtion: Joi.string().min(3),
    name: Joi.string().min(3),
    invoice_id :Joi.number(),

  });
  return validate.validate(request);
};
const updateUserValidation = (request:Request) => {
  const validate = 
  Joi.object({

    id: Joi.number().required(),
    mail: Joi.string().min(3),
    name: Joi.string().min(3),
    address: Joi.string().min(3),
    phoneNumber: Joi.string().min(3),
    age: Joi.number(),
  });
  return validate.validate(request);
};
const updateinvoiceValidation = (request:Request) => {
  const validate = 
  Joi.object({
    id: Joi.number().required(),
    status: Joi.string().min(3),
    totalAmount: Joi.number(),
    name: Joi.string().min(3),
    user_id :Joi.number(),


  });
  return validate.validate(request);
};


module.exports = {
  userValidation,
  updateUserValidation,
  invoiceValidation,
  updateinvoiceValidation,
  itemValidation,
  updateItemValidation,
  invoiceDetailedValidation
};
