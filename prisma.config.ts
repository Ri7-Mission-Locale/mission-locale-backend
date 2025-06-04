// @ts-ignore
import path from 'path'
import { PrismaConfig } from 'prisma/config'
import "dotenv/config"

export default {
    earlyAccess: true,
    schema: path.join('prisma', 'models'),
} satisfies PrismaConfig