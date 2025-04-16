const UserModel = require('../models/models/User');

(async () => {
  const users = await UserModel.findAll();
  console.log(users);
})();
