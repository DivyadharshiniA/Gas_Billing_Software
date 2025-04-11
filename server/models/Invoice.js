const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  buyerName: String,
  invoiceNo: String,
  date: {
    type: Date,
    default: Date.now
  },
  items: [
    {
      description: String,
      quantity: Number,
      rate: Number,
      amount: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
