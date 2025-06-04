import { hashPassword } from "../middlewares/hashPassword.js";
import { PrismaClient } from "./generated/client.js";

const database = new PrismaClient().$extends(hashPassword);
export default database;