const { User } = require("../models");

const register = async (req, res) => {
  console.log(req.body);
  const { body } = req;
  const checkEmailExists = await User.findOne({ email: body.email });
  if (checkEmailExists)
    return res.status(400).send({ message: "Email already exists" });
  const userInfo = await User.create(body);

  const user = {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
  };
  return res.status(200).send({
    user,
    message: "Register created successfully",
  });
};

const login = (req, res) => {
  return res.status(200).send({
    message: "Login successfully",
  });
};

module.exports = {
  register,
  login,
};
