import { usersModel } from "./db/models";

export const resolvers = {
  Query: {
<<<<<<< HEAD
    users: () => usersModel.find().sort({ name: 1 }),
    oneuser: (_, { id }) => {
      return usersModel.findById(id);
=======
    // ton async await sert a rien ici, tu peu retourner direct
    users: async () => await usersModel.find().sort({ name: 1 }),
    
    // console.log c'est pas vraiment une bonne facon de gerer les erreurs, pas a ce niveau en tout cas
    oneuser: async (_, { id }) => {
      return (
        (await usersModel.findById(id)) ||
        console.log("user with this id doesn't exist")
      );
>>>>>>> fb79b9d1dfd7d96bde0bfcb11f3a89d8b190808d
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const new_user = usersModel(input);
<<<<<<< HEAD
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
=======
      // le save est async non ? du coup tu devrais pas avoir une promise ici ?
      // un await quelque part ou retourner une promise
      // et pareil pour le console.log, c'est pas vraiment une gestion d'erreur la
      new_user.save(err => {
        err ? console.log("error handled") : console.log("user registered.");
      });
      return new_user;
    },
    deleteUser: async (_, { id }) => {
      try {
        await usersModel.deleteOne({ _id: id });
        // je sais pas si t'a fait un retunr await expres pour qu'il soit pris dans ton catch
        // mais vu que ton catch sert a rien la
        // j'pense que tu peu juste return sans await
        
        // pourquoi tu fait un find apres ton delete ?
        return await usersModel.find().sort({ name: 1 });
      } catch (error) {
        // ca c'est etrange, t'aura toujours une valeur dans ton throw
        // et si t'en avais pas tu afficherais ton log certe, mais tu ferai un 
        // re-throw de `undefined` vu que ca sera la valeur de retour de ton
        // console.log qui va etre throw
        throw error || console.log("user doesn't exist!");
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        await usersModel.updateOne(
          { _id: id },
          { $set: input },
          { new: true }
        );
        console.log("User infos updated");
        // t'est sur que tu veut re-query la db apres ton update ?
        // t'a besoin de retourner le user ?
        return await usersModel.findById(id);
      } catch (error) {
        // pareil que la haut
        throw error || console.log("update failed. Please try again");
>>>>>>> fb79b9d1dfd7d96bde0bfcb11f3a89d8b190808d
      }
    }
  }
};
