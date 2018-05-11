const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const Budget = mongoose.Schema({
  title: String,
  budgetAmount: Number
})