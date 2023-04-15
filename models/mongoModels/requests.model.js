const mongoose = require('mongoose');

const { Schema } = mongoose;

const requestsSchema = new Schema(
  {
    status: {
      userStatus: { type: String },
      agentId: { type: Number },
      created_at: { type: Date, default: Date.now },
    },
    agentStatus: [
      {
        status: { type: String },
        created_at: { type: Date, default: Date.now },
        agentId: { type: Number },
      },
    ],
    medicalProblem: {
      type: String,
    },
    attachment: [
      {
        mediaId: { type: String },
        created_at: { type: Date, default: Date.now },
        title: { type: String },
        type: { type: String },
      },
    ],
    quotation: {
      
      mediaId: { type: String },
      agentId: { type: Number },
      created_at: { type: Date, default: Date.now },
      finalPrice: { type: String },
      quotationStatus: { type: String },
    },
  },
  {
    timestamps: true,
  },
);
requestsSchema.set('validateBeforeSave', false);

// eslint-disable-next-line no-multi-assign
module.exports = Requests = mongoose.model(
  'requests',
  requestsSchema,
);
