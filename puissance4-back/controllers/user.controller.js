const User = require('../models/user.model');

module.exports.newUser = async (req, res) => {
  try {
    const userName = req.body.user.name.trim();
    const result = await User.verifyExistingName(userName);
    if (result) {
      return res.status(401).send('User Already Exists');
    }
    res.status(200).send('User Not Existing');
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

module.exports.getUsers = async (req, res) => {
  const keys = await User.getUsers();
  res.status(200).send(keys);
};
