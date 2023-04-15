const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const  Schema  = mongoose.Schema;

const doctorsSchema = new Schema(
  {
    SQL_id: {
      type: Number,
    },
    listOfPatients: [
      
      { type: Number },
      
    ],
  },
  {
    timestamps: true,
  },
);
doctorsSchema.set('validateBeforeSave', false);

module.exports = Doctors = mongoose.model('doctors', doctorsSchema);
