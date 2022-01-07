const seedProducts = require('./product-seeds');
const sequelize = require('../config/connection');

async function seedAll() {
  await sequelize.sync({ force: true });
  await seedProducts();
  console.log('\nseeding complete')
  process.exit(0);
};

seedAll();