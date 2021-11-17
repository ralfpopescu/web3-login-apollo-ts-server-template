const jwt = require("jsonwebtoken");
const {config} = require("../../config");

module.exports = async (auth: string) => {
  if (!auth) {
    return null;
  }

  const token = auth.split("Bearer ")[1];

  if (!token) throw new Error("Token required");

  const user = await jwt.verify(token, config.accessTokenSecret);
  return user;
};
