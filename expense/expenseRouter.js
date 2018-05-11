const express = require("express");

const Expense = require("./Expense");

const router = express.Router();

// /api/expenses

// GET /
router.route("/").get((req, res) => {
  Expense.find({})
    .populate("budget", "category")
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error getting expenses."
      });
    });
});

// POST /
router.route("/").post((req, res) => {
  const { amount, description, budget, category } = req.body;
  const expense = new Expense(req.body);

  // Make sure amount, description, budget and category provided
  if (amount && description && budget && category) {
    expense
      .save()
      .then(expense => {
        res.status(201).json(expense);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error posting the new expense."
        });
      });
  } else {
    res.status(404).json({
      error:
        "Please provide an AMOUNT, DESCRIPTION, BUDGET, and CATEGORY to continue."
    });
  }
});

module.exports = router;
