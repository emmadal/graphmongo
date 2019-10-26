import { usersModel } from "./db/models";

export const resolvers = {
  Query: {
    users: async () => await usersModel.find().sort({ name: 1 }),
    oneuser: async (_, { id }) => {
      return (
        (await usersModel.findById(id)) ||
        console.log("user with this id doesn't exist")
      );
    }
  },
  Mutation: {
    createUser: (_, { input }) => {
      const new_user = usersModel(input);
      new_user.save(err => {
        err ? console.log("error handled") : console.log("user registered.");
      });
      return new_user;
    },
    deleteUser: async (_, { id }) => {
      try {
        await usersModel.deleteOne({ _id: id });
        return await usersModel.find().sort({ name: 1 });
      } catch (error) {
        throw error || console.log("user doesn't exist!");
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        await usersModel.updateOne(
          { _id: id },
          {
            $set: input
          },
          { new: true }
        );
        console.log("User infos updated");
        return await usersModel.findById(id);
      } catch (error) {
        throw error || console.log("update failed. Please try again");
      }
    }
  }
};
