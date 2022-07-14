const jwt = require("jsonwebtoken");
const moment = require("moment");

const config = require("../config/config");

const generateToken = (
  userId,
  expires,
  type,
  role,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
    role,
  };
  return jwt.sign(payload, secret);
};

const generateAuthToken = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    "access",
    "user"
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshTokenExpires,
    "days"
  );

  const refreshToken = generateToken(user.id, refreshTokenExpires, "refresh");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

const verifyToken = async (token, type) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (payload.type !== type) return false;
    return payload;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateAuthToken,
  generateToken,
  verifyToken,
};
