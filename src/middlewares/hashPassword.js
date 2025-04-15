import { Prisma } from "@prisma/client";
import { hashSync }  from "bcrypt";

export const hashPassword = Prisma.defineExtension({
    name: "hash",
    query: {
        user: {
            create: async ({ args, query }) => {
                const hash = hashSync(args.data.password, 10);
                args.data.password = hash;
                return query(args);
            },
            update: async ({ args, query }) => {
                if (!args.data.password) return query(args);
                const hash = hashSync(args.data.password, 10);
                args.data.password = hash;
                return query(args);
            },
        }
    }
})