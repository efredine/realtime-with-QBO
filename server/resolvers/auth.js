let me;

function getMe() {
  return me;
}

function connect() {
  me = {
    id: "001",
    name: "Eric"
  };
  return me;
}

function signOut() {
  me = null;
}

module.exports = {
  getMe,
  connect,
  signOut
};
