const User = require('../../models/pgModels/user.model');
const Invoice = require('../../models/pgModels/invoice.model');
const Item = require('../../models/pgModels/item.model');

const validate = require('../validations/user.validation');
const statusCodes = require('../constants/statusCodes');

import { Request, Response } from 'express';

exports.view_users = async (req:Request, res:Response) => {
  try {
    const users = await User.findAll({include: [
      {
        model: Invoice,
        include: [Item],
      },
    ],});
    return res.json({
      Users: users,
    });
  } catch (exception) {
    return res.status(400).send(exception);
  }
};
exports.view_users_id = async (req:Request, res:Response) => {
  try {
    const user = await User.findByPk(req.body.id,{include: [
      {
        model: Invoice,
        include: [Item],
      },
    ],});
    return res.json({
      User: user,
    });
  } catch (exception) {
    return res.status(400).send({"error":exception});
  }
};
exports.sign_up = async (req:Request, res:Response) => {
  try {
    const isValid = validate.userValidation(req.body);
    if (isValid.error)
      return res.status(400).json({
        message: isValid.error.details[0].message,
        code: statusCodes.UserCodes.valError,
      });

    const mailIsUnique = await User.findOne({
      where: {
        mail: req.body.mail,
      },
    });
    console.log(mailIsUnique)
    if (mailIsUnique)
      return res.status(400).json({
        ...statusCodes.UserCodes.emailUsed,
      });
    const phoneIsUnique = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });
    if (phoneIsUnique)
      return res.status(400).json({
        ...statusCodes.UserCodes.phoneUsed,
      });
    
    let fullUser = req.body;
    let user = await User.create({
      ...fullUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    return res.status(200).json({
      StatusCode: statusCodes.generalCodes.success,
      User: {
        ...user,
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


exports.update_user = async function (req:Request, res:Response) {
  try {
    const user = req.body;
    const validData = validate.updateUserValidation(req.body);
    if (validData.error) {
      return res.status(400).json({
        error: {
          message: validData.error.details[0].message,
          statusCode: statusCodes.UserCodes.valError,
        },
      });
    }
    const updated_user = await User.update(
      
      { ...user, updatedAt: new Date() },
      { where: { id: req.body.id } },

    );
    if (updated_user) {
      return res.status(200).json({
        ...statusCodes.UserCodes.itemUpdate,
        message: 
          "user updated"
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

exports.delete_user = async function (req:Request, res:Response) {
  try {
    const id = req.body.id;
    const user = await User.findByPk(req.body.id);
    if(!user){
      return res.status(404).json({
        ...statusCodes.UserCodes.userNotFound,
        message:"user not found"

      });
    }
    const pgUser = await User.destroy({ where: { id: id } });
    if (pgUser)
      return res.status(200).json({
        ...statusCodes.UserCodes.userDeleted,
        message:"user deleted"
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
