import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../middlewares/hashPassword.js";

/** @type {PrismaClient} */
const database = new PrismaClient().$extends(hashPassword);

export default database;