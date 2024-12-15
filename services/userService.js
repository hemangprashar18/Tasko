const axios = require('axios');
const User = require('../models/user.model');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAndSaveUsers = async (batchSize, batchCount, delay) => {
  let totalFetched = 0;

  for (let batchIndex = 0; batchIndex < batchCount; batchIndex++) {
    console.log(`Fetching batch ${batchIndex + 1} of ${batchCount}...`);
    const users = [];

    for (let i = 0; i < batchSize; i += 100) {
      const response = await axios.get(`https://randomuser.me/api/?results=100`);
      users.push(
        ...response.data.results.map((user) => ({
          id: user.login.uuid,
          gender: user.gender,
          name: user.name,
          address: {
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            street: user.location.street,
          },
          email: user.email,
          age: user.dob.age,
          picture: user.picture.large,
        }))
      );

      totalFetched += 100;
      if ((i + 100) % 500 === 0) {
        console.log('Sleeping for 30 seconds after 5 requests...');
        await sleep(30000); // Pause after 5 requests
      }
    }

    // Save fetched users to the database
    await User.insertMany(users);
    console.log(`${users.length} users inserted in batch ${batchIndex + 1}`);

    if (batchIndex < batchCount - 1) {
      console.log(`Sleeping for ${delay}ms between batches...`);
      await sleep(delay);
    }
  }

  console.log(`Total users fetched and inserted: ${totalFetched}`);
};

module.exports = {
  fetchAndSaveUsers,
};
