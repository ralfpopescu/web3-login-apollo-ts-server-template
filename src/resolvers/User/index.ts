import { Context } from "../../types";

const Query = {
  me: async (_: object, __: object, { Model, authenticatedUser }: Context) => Model.User.findOne(
    { id: authenticatedUser.id },
  ),
};

module.exports = {
  Query,
};
