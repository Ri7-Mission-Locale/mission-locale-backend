import "dotenv/config"
import express from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import microsoftRouter from "./routes/microsoftRouter.js";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profileRouter.js";
import tagRouter from "./routes/tagRouter.js";
import workshopRouter from "./routes/workshopRouter.js";

const port = process.env.PORT;

const app = express()
    .use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))

    .use(rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 250,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many request.",
    }))
    .use(helmet())
    .use(cookieParser())
    .use(express.static('public'))
    .use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: "10mb" }))
    .use(authRouter)
    .use(userRouter)
    .use(profileRouter)
    .use(newsRouter)
    .use(workshopRouter)
    .use(microsoftRouter)
    .use(tagRouter)
    .use((_, res) => setTimeout(() => res.status(404).json({ message: "Route not found" }), 3000))
    .listen(port, (err) => {
        if (err) return console.error(err);
        console.log(`Listen at port ${port}`)
    });

export default app;