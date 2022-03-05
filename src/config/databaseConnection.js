const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_TABLE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
