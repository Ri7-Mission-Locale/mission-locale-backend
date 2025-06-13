import "dotenv/config"
import express from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import cookieParser from "cookie-parser";

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
    .use(express.json({ limit: "10mb" }))
    .use(cookieParser())
    .use(express.urlencoded({ extended: true }))

    .use(authRouter)
    .use(userRouter)
    .use(newsRouter)

    .use((_, res) => res.status(404).json({ message: "Route not found" }))
    .listen(port, (err) => {
        if (err) return console.error(err);
        console.log(`Listen at port ${port}`)
    });

export default app;