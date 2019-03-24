const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);
const dataFile = join(__dirname, "../.data");

const users = new Map();

function saveUsers() {
  const data = {};
  users.forEach(({ user, oauthToken }, userId) => {
    data[userId] = { user, oauthToken };
  });
  const jsonData = JSON.stringify(data);
  writeFile(dataFile, jsonData);
}

function set(userId, data) {
  users.set(userId, data);
  saveUsers();
}

function deleteUser(userId) {
  users.delete(userId);
  saveUsers();
}

function initializeUsers(initializeUser) {
  try {
    const userData = JSON.parse(fs.readFileSync(dataFile));
    for (let userId of Object.keys(userData)) {
      users.set(userId, initializeUser(userData[userId]));
    }
  } catch (e) {
    console.log("No data file to read.", e.message);
  }
  return {
    set,
    delete: deleteUser,
    has: userId => users.has(userId),
    get: userId => users.get(userId),
    forEach: users.forEach.bind(users)
  };
}

module.exports = initializeUsers;
