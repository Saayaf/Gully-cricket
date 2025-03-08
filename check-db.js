const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log
});

async function checkSchema() {
  try {
    const tables = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Tables in database:', tables[0]);
    
    const usersColumns = await sequelize.query("PRAGMA table_info(Users)");
    console.log('Users table columns:', usersColumns[0]);
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await sequelize.close();
  }
}

checkSchema();
