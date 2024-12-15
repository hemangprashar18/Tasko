const User = require('../models/user.model');
const { fetchAndSaveUsers } = require('../services/userService');

const fetchUsers = async (req, res) => {
  const { batchSize = 300, batchCount = 10, delay = 2000 } = req.body;

  try {
    await fetchAndSaveUsers(batchSize, batchCount, delay);
    res.status(200).json({ message: 'Users fetched and inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const getUsers = async (req, res) => {
  const { limit = 10, page = 1, sort, search } = req.query;

  try {
    const query = search ? JSON.parse(search) : {};
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort || {});

    res.status(200).json({
      total,
      limit: Number(limit),
      page: Number(page),
      sortBy: sort || null,
      items: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

module.exports = { fetchUsers, getUsers };
