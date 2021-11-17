import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Context } from "../../types";

const accessTokenSecret = '123';

const salt = bcrypt.genSaltSync(10);

type ValidateUserInput = { email: string, password: string, Model: Context['Model']}

const validateUser = async ({ email, password, Model }: ValidateUserInput) => {
  const user = await Model.User.findOne({ email }).exec();

  if (!user) {
    throw new Error('User with email does not exist.');
  }
  const { hashedPassword, id } = user;
  const result = bcrypt.compareSync(password, hashedPassword);
  
  if (result) {
    return id;
  }
  throw new Error('Login failed');
};

type Args = { input: { email: string, password: string } }

const Mutation = {
  login: async (_: object, { input: { email, password } }: Args, { Model }: Context) => {
    const id = await validateUser({ email, password, Model });
    if (id) {
      const accessToken = jwt.sign({ email, id }, accessTokenSecret);
      return { accessToken };
    }
  },
  signup: async (_: object, { input: { email, password } }: Args, { Model }: Context) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await Model.User.create({ email, hashedPassword });
    return user;
  },
};

module.exports = { Mutation };
