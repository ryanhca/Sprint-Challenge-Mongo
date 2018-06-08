/* {
  _id: ObjectId('503c2b66bcf86cs793443564'),
  amount: 35,
  description: 'potatoes',
  budget: ObjectId('507f1f77bcf86cd799439011'), // Monthly Spending
  category: ObjectId('543d2c72gsb23cd657438921') // Groceries
} */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const Expense = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: [{ type: ObjectId, ref: 'Budget' }],
  category: [{ type: ObjectId, ref: 'Category' }]
})
module.exports = mongoose.model('Expense', Expense)
