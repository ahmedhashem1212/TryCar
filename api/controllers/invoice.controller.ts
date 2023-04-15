const Invoice = require('../../models/pgModels/invoice.model');
const Item = require('../../models/pgModels/item.model');
const User = require('../../models/pgModels/user.model');

const validate = require('../validations/user.validation');
const statusCodes = require('../constants/statusCodes');

import { Request, Response } from 'express';

exports.view_invoices = async (req:Request, res:Response) => {
  try {
    const Invoices = await Invoice.findAll({  include: [{ model: Item }]
    });
    return res.json({
      Invoices: Invoices,
    });
  } catch (exception) {
    return res.status(400).send(exception);
  }
};
exports.view_invoice_id = async (req:Request, res:Response) => {
  try {
    const invoice = await Invoice.findByPk(req.body.id,{  include: [{ model: Item }]
    });
    return res.json({
      invoice: invoice,
    });
  } catch (exception) {
    return res.status(400).send({"error":exception});
  }
};
exports.create_invoice = async (req:Request, res:Response) => {
  try {
    const isValid = validate.invoiceValidation(req.body);
    if (isValid.error)
      return res.status(400).json({
        message: isValid.error.details[0].message,
        code: statusCodes.InvoiceCodes.valError,
      });
      const userIdUnique = await User.findByPk(req.body.user_id);
      if (!userIdUnique)
        return res.status(400).json({
          ...statusCodes.UserCodes.phoneUsed,
          message:"user not found"
        });
      

    let fullinvoice = req.body;
    let invoice = await Invoice.create({
      ...fullinvoice,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    return res.status(200).json({
      StatusCode: statusCodes.generalCodes.success,
      invoice: {
        ...invoice,
      },
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).json({
      StatusCode: statusCodes.generalCodes.unknown,
      message: exception,
    });
  }
};

exports.create_detailed_invoice = async (req:Request, res:Response) => {
  try {
    const isValid = validate.invoiceDetailedValidation(req.body);
    if (isValid.error)
      return res.status(400).json({
        message: isValid.error.details[0].message,
        code: statusCodes.InvoiceCodes.valError,
      });
      const userIdUnique = await User.findByPk(req.body.user_id);
      if (!userIdUnique)
        return res.status(400).json({
          ...statusCodes.UserCodes.phoneUsed,
          message:"user not found"
        });
        const { items, ...invoiceData } = req.body;
        
        // Create the invoice
        const invoice = await Invoice.create(invoiceData);
      
        // Create the items and link them to the invoice
        let totalAmount = 0;
        const itemPromises = items.map(async (item: typeof Item) => {
          const createdItem = await Item.create(item);
          await createdItem.setInvoice(invoice);
          totalAmount += item.totalUnitPrice
          return createdItem;
        });
      
        const createdItems = await Promise.all(itemPromises);
        const updated_invoice = await Invoice.update(
      
          { totalAmount:totalAmount },
          { where: { id: invoice.id } },
    
        );

    // let fullinvoice = req.body;
    // let invoice = await Invoice.create({
    //   ...fullinvoice,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });
   
    return res.status(200).json({
      StatusCode: statusCodes.generalCodes.success,
      invoice: {
        ...updated_invoice,
        items:createdItems
      },
    });
  } catch (exception) {
    console.log(exception);
    return res.status(400).json({
      StatusCode: statusCodes.generalCodes.unknown,
      message: exception,
    });
  }
};


exports.update_invoice = async function (req:Request, res:Response) {
  try {
    const invoice = req.body;
    const validData = validate.updateinvoiceValidation(req.body);
    if (validData.error) {
      return res.status(400).json({
        error: {
          message: validData.error.details[0].message,
          statusCode: statusCodes.InvoiceCodes.valError,
        },
      });
    }
    const invoiceFound = await Invoice.findByPk(req.body.id,);
    if(!invoiceFound){
      return res.status(404).json({
        ...statusCodes.InvoiceCodes.invoiceNotFound,
        message:"invoice not found"

      });
    }
    const updated_invoice = await Invoice.update(
      
      { ...invoice, updatedAt: new Date() },
      { where: { id: req.body.id } },

    );
    if (updated_invoice) {
      return res.status(200).json({
        ...statusCodes.InvoiceCodes.itemUpdate,
        message: 
          "invoice updated"
      });
    }
  } catch (error:any) {
    return res.status(400).json({
      error: {
        message: error.message,
        statusCode: statusCodes.generalCodes.unknown,
      },
    });
  }
};

exports.delete_invoice = async function (req:Request, res:Response) {
  try {
    const id = req.body.id;
    const invoice = await Invoice.findOne({
      where: { id },
      include: [Item]
    });
    // const invoice = await Invoice.findOne({where :{id: req.body.id},  include: [{ model: Item }]
    // });
    if(!invoice){
      return res.status(404).json({
        ...statusCodes.InvoiceCodes.invoiceNotFound,
        message:"invoice not found"

      });
    }
    console.log(invoice.dataValues.Items)
      await Promise.all(
        invoice.Items.map(async (item:typeof Item) => {
          await item.destroy();
        })
      );
  

     await Invoice.destroy({ where: { id: id } });
      return res.status(200).json({
        ...statusCodes.InvoiceCodes.invoiceDeleted,
        message: 
        "item deleted"
      });
  } catch (error:any) {
    return res.status(400).json({
      error: {
        message: error.message,
        statusCode: statusCodes.generalCodes.unknown,
      },
    });
  }
};
