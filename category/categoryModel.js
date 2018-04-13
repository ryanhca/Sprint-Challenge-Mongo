const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Type.ObjectId;

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
