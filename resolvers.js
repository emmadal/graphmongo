import { usersModel } from "./db/models";

export const resolvers = {
  Query: {
    users: () => usersModel.find().sort({ name: 1 }),
    oneuser: (_, { id }) => {
      return usersModel.findById(id);
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const new_user = usersModel(input);
      return await new_user.save();
    },
    deleteUser: async (_, { id }) => {
      await usersModel.deleteOne({ _id: id });
      return usersModel.find().sort({ name: 1 });
    },
    updateUser: async (_, { id, input }) => {
      try {
        await usersModel.updateOne({ _id: id }, { $set: input }, { new: true });
        return usersModel.findById(id);
      } catch (error) {
        throw error;
      }
    }
  }
};
