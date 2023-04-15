const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const hospitalsSchema = new Schema(
  {
    SQL_id: {
      type: Number,
    },
    listOfSections: [
      
      { type: String },
      
    ],
    logo:{
        mediaId: { type: String },
        created_at: { type: Date, default: Date.now },
        type: { type: String },
      },
    discription:{type: String}
  },
  {
    timestamps: true,
  },
);
hospitalsSchema.set('validateBeforeSave', false);

module.exports = Hospitals = mongoose.model('hopitals', hospitalsSchema);
