const Item = require('../../models/pgModels/item.model');
const validate = require('../validations/user.validation');
const statusCodes = require('../constants/statusCodes');

import { Request, Response } from 'express';

exports.view_items = async (req:Request, res:Response) => {
  try {
    const Items = await Item.findAll();
    return res.json({
      Items: Items,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
};
exports.view_item_id = async (req:Request, res:Response) => {
  try {
    const item = await Item.findByPk(req.body.id);
    return res.json({
      item: item,
    });
  } catch (exception) {
    return res.status(400).send({"error":exception});
  }
};
exports.create_item = async (req:Request, res:Response) => {
  try {
    const isValid = validate.itemValidation(req.body);
    if (isValid.error)
      return res.status(400).json({
        message: isValid.error.details[0].message,
        code: statusCodes.ItemCodes.valError,
      });

    let fullitem = req.body;
    let item = await Item.create({
      ...fullitem,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    return res.status(200).json({
      StatusCode: statusCodes.generalCodes.success,
      item: {
        ...item,
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


exports.update_item = async function (req:Request, res:Response) {
  try {
    const item = req.body;
    const validData = validate.updateItemValidation(req.body);
    if (validData.error) {
      return res.status(400).json({
        error: {
          message: validData.error.details[0].message,
          statusCode: statusCodes.ItemCodes.valError,
        },
      });
    }
    const updated_item = await Item.update(
      
      { ...item, updatedAt: new Date() },
      { where: { id: req.body.id } },

    );
    if (updated_item) {
      return res.status(200).json({
        ...statusCodes.ItemCodes.itemUpdate,
        message: 
          "item updated"
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

exports.delete_item = async function (req:Request, res:Response) {
  try {
    const id = req.body.id;
    const item = await Item.findByPk(req.body.id);
    if(!item){
      return res.status(404).json({
        ...statusCodes.ItemCodes.itemNotFound,
        message:"item not found"

      });
    }

    const pgitem = await Item.destroy({ where: { id: id } });
    if (pgitem)
      return res.status(200).json({
        ...statusCodes.ItemCodes.itemDeleted,
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
