import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";

export const hashPassword = Prisma.defineExtension({
    name: "hash",
    query: {
        user: {
            create: async ({ args, query }) => {
                const password = args.data.password;
                args.data.password = await hash(password, 10);
                return query(args);
            },
            update: async ({ args, query }) => {
                const password = args.data.password;
                if (!password || typeof password !== 'string') return query(args);
                args.data.password = await hash(password, 10);
                return query(args);
            },
        }
    }
});