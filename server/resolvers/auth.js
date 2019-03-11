let me;

function getMe() {
  return me;
}

function connect() {
  me = { name: "Eric" };
}

function signOut() {
  me = null;
}

module.exports = {
  getMe,
  connect,
  signOut
};
