const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const usersSchema = new Schema(
  {
    SQL_id: {
      type: Number,
    },
    medicalHistory: [
      {
        mediaId: { type: String },
        title: { type: String },
        type: { type: String },
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);
usersSchema.set('validateBeforeSave', false);

module.exports = Users = mongoose.model('users', usersSchema);
