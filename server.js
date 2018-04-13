const express = require('express');
const helmet = require('helmet');

const db = require('./data/db.js');
const budgetRouter = require('./budget/budgetRouter.js');
const categoryRouter = require('.category/categoryRouter.js');
const expenseRouter = require('.expense/expenseRouter.js');

const server = express();

db
  .connectTo('budget')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(express.json());

server.use('/api/budget', budgetRouter);
server.use('api/category', categoryRouter);
server.use('api/expense', expenseRouter);

server.get('/'), (req, res) => res.sent('API RUNNING...');

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
