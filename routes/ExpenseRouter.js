const express = require('express');
const Expense = require('../ExpenseModel.js');

const router = express.Router();

router.get('/', function (req, res) {
  Expense.find()
    .populate('budget category')
    .then(expenses => res.status(200).json(expenses))
    .catch(error =>
      res.status(500).json({ msg: 'Error getting expenses', error })
    );
})

router.post('/', function (req, res) {
  Expense.create(req.body)

    .then(budget => res.status(200).json(budget))
    .catch(error =>
      res.status(500).json({ msg: 'Could not create budget', error })
    );
})
module.exports = router;
