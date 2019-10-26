import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";

const app = new ApolloServer({ typeDefs, resolvers });

const dbConnect = async url => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connected to database");
  } catch (error) {
    console.log(
      "Database not available. Please ensure you that the mongod.service is enable."
    );
  }
};

app.listen().then(({ url }) => {
  dbConnect("mongodb://localhost:27017/graphdb");
  console.log(`:rocket: server started at ${url}`);
});
