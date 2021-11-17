const Query = {
  me: async (_, __, { Model, authenticatedUser }) => Model.User.findOne(
    { id: authenticatedUser.id },
  ),
};

module.exports = {
  Query,
};
