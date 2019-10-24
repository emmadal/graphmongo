import { Users } from "./db/models";

export const resolvers = {
  Query: {
    users: async () => await Users.find(),
    oneuser: async (_, { name }) => {
      const single_user = await Users.findOne({ name });
      return single_user;
    }
  },
  Mutation: {
    createUser: (_, { input }) => {
      const new_user = Users(input);
      new_user.save(err => {
        err ? console.log("error handled") : console.log("user registered.");
      });
      return new_user;
    }
  }
};
