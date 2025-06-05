import {Prisma} from "@prisma/client";
import {hashSync} from "bcrypt";

export const hashPassword = Prisma.defineExtension({
    name: "hash",
    query: {
        user: {
            create: async ({ args, query }) => {
                args.data.password = hashSync(args.data.password, 10);
                return query(args);
            },
            update: async ({ args, query }) => {
                if (!args.data.password || typeof args.data.password !== 'string') return query(args);
                args.data.password = hashSync(args.data.password, 10);
                return query(args);
            },
        }
    }
});