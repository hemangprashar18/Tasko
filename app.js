const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/databse');
const { fetchUsers, getUsers } = require('./contollers/userController');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

app.post('/api/fetch-users', fetchUsers);
app.get('/api/get-users', getUsers);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
