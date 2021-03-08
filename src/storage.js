const storage = require('node-persist');

async function setup() {
  await storage.init({
    dir: './database/db.json',
  });
}

module.exports = {
  dbSetup: setup,
};
