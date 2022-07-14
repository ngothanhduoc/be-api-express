const { tokenService } = require("../services");
const { User } = require("../models");

const jwtVerify = async (req) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    return false;
  }
  const tokenArray = bearerToken.split(" ");
  const tokenInfo = await tokenService.verifyToken(tokenArray[1], "access");
  if (!tokenInfo) return false;
  return tokenInfo;
};

const auth = async (req, res, next) => {
  const tokenInfo = await jwtVerify(req);
  console.log(tokenInfo);
  if (tokenInfo === false)
    return res.status(401).send({ message: "Please authenticate" });
  else {
    const getUser = await User.findById(tokenInfo.sub);
    if (!getUser)
      return res.status(401).send({ message: "Please authentication" });

    if (getUser.role !== tokenInfo.role)
      return res.status(403).send({ message: "Forbidden" });

    req.auth = tokenInfo;
    req.userInfo = getUser;
    next();
  }
};

module.exports = auth;
