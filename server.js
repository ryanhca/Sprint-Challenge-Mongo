const express = require('express'); // remember to install your npm packages
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const server = express();

const Budget = require('./Budget/BudgetModel');
const Category = require('./Category/CategoryModel');
const Expense = require('./Expense/ExpenseModel');

mongoose.connect('mongodb://localhost/budget-tracker');

server.use(cors());
server.use(bodyParser.json());

// add your server code

server.post('/budget', (req, res) => {
  const BudgetList = req.body;
  const {
    title,
    budgetAmount
  } = req.body;

  if (!title || !budgetAmount) {
    console.log(error);
    res.status(400).json({ errorMessage: 'Please provide title and budget amount.' });
  }

  const budget = new Budget(BudgetList);

  budget
    .save()
    .then(newBudget => {
      res.status(200).json(newBudget);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while saving the budget to the database.' });
    });
});

server.post('/category', (req, res) => {
  const CategoryList = req.body;
  const {
    title
   } = req.body;

  if (!title) {
    console.log(error);
    res.status(400).json({ errorMessage: 'Please provide the title.' });
  }

  const category = new Category(CategoryList);

  category
    .save()
    .then(newCategory => {
      res.status(200).json(newCategory)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while saving the category to the database.' });
    });
});

server.get('/category', (req, res) => {
  Category.find({})
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'The list could not be retrieved.' });
    });
});

server.post('/expense', (req, res) => {
  const ExpenseList = req.body;
  const {
    amount,
    description
  } = req.body;

  if (!amount || !description) {
    console.log(error);
    res.status(400).json({ errorMessage: 'Please provide amount and description.' });
  }

  const expense = new Expense(ExpenseList);

  expense
    .save()
    .then(newExpense => {
      res.status(200).json(newExpense)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while saving the expense to the database.' });
    });

});

server.get('/expense', (req, res) => {
  Expense.find({})
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'The list could not be retrieved.' });
    });
});

server.get('/budget/:id/summary', (req, res) => {
  const id = req.params.id;

  Expense.aggregate([ 
    { 
      $group: 
        { 
          _id: '$budget', 
          expenseTotal: { $sum: '$amount' } 
        } 
    } 
  ])
    .then(expenses => {
      const expenseTotal = expenses[0].expenseTotal;
      Budget.findById(id)
        .then(diff => {
          const difference = {
            remainingAmount: diff.budgetAmount - expenseTotal,
            budget: diff.budgetAmount,
            expenseTotal
          }
          res.status(200).json(difference)
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error: 'There was an error while retrieving the budget to the database.' });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while aggregating the expenses.' });
    });
});

server.get('/expense', (req, res) => {
  const {
    aggregatedBy
   } = req.query;

  Expense.aggregate([
    {
      $group:
        {
          _id: '$category',
          expenseTotal: { $sum: '$amount' }
        }
    }
  ])
  .sort('-expenseTotal')
  .then(expenses => {
    res.status(200).json(expenses);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: 'There was an error while aggregating the expenses.' });
  });
});

server.get('/', (req, res) => res.send('API Running...'));

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
