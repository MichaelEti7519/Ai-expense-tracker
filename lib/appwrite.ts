import { Client } from "appwrite";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6906a03f000b58ea3c04");

export default appwriteClient;
