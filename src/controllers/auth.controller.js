const { User } = require("../models");
const { tokenService } = require("../services");
const bcrypt = require("bcryptjs");

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
  const tokens = await tokenService.generateAuthToken(userInfo);
  return res.status(200).send({
    user,
    tokens,
    message: "Register created successfully",
  });
};

const login = async (req, res) => {
  const { body } = req;
  const getUser = await User.findOne({ email: body.email });
  if (!getUser) return res.status(400).send({ message: "Login failed" });

  const checkPassword = await bcrypt.compare(body.password, getUser.password);
  if (!checkPassword) return res.status(400).send({ message: "Login failed" });

  const user = {
    id: getUser.id,
    name: getUser.name,
    email: getUser.email,
    role: getUser.role,
  };
  const tokens = await tokenService.generateAuthToken(getUser);
  return res.status(200).send({
    user,
    tokens,
    message: "Login successfully",
  });
};

const getUser = async (req, res) => {
  console.log("req.auth => ", req.auth);
  console.log("req.userInfo => ", req.userInfo);
  const { userInfo } = req;
  const user = {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
  };
  return res.status(200).send({ user, message: "User info" });
};

module.exports = {
  register,
  login,
  getUser,
};
