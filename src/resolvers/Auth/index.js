const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { accessTokenSecret } = '123';

const salt = bcrypt.genSaltSync(10);

const validateUser = async ({ email, password, Model }) => {
  const user = await Model.User.findOne({ email }).exec();
  console.log('dauser', user);
  if (!user) {
    throw new Error('User with email does not exist.');
  }
  const { hashedPassword, id } = user;
  console.log('hashedPassword, id', hashedPassword, id);
  const result = bcrypt.compareSync(password, hashedPassword);
  console.log('resdultresult', result);
  if (result) {
    return id;
  }
  throw new Error('Login failed');
};

const Mutation = {
  login: async (_, { input: { email, password } }, { Model }) => {
    const id = await validateUser({ email, password, Model });
    if (id) {
      const accessToken = jwt.sign({ email, id }, accessTokenSecret);
      return { accessToken };
    }
  },
  signup: async (_, { input: { email, password } }, { Model }) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await Model.User.create({ email, hashedPassword });
    return user;
  },
};

module.exports = { Mutation };
