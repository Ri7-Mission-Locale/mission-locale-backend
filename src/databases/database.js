import { hashPassword } from "../middlewares/hashPassword.js";
import { PrismaClient } from "./generated/client.js";

/** @type {PrismaClient} for autocompletion */
const database = new PrismaClient().$extends(hashPassword);
export default database;