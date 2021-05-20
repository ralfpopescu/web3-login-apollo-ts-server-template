const jwt = require('jsonwebtoken');

const { accessTokenSecret } = '123';

module.exports = async auth => {
  if (!auth) {
    return null;
  }

  const token = auth.split('Bearer ')[1];

  if (!token) throw new Error('Token required');

  const user = await jwt.verify(token, accessTokenSecret);
  return user;
};
