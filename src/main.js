import "dotenv/config"
import express from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

const port = process.env.PORT;

const app = express()
    .use(cors())
    .use(rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 250,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many request.",
    }))
    .use(helmet())
    .use(express.json({ limit: "10mb" }))
    .use(express.urlencoded({ extended: true }))

    .use(authRouter)
    .use(userRouter)

    /*
    .use(counsellorRouter)
    .use(workshopRouter)
    .use(meetingRouter)
    .use(counsellorRouter)
    .use(memberRouter)
    */

    .use((_, res) => res.status(404).json({ message: "Route not found" }))
    .listen(port, (err) => {
        if (err) return console.error(err);
        console.log(`Listen at port ${port}`)
    });

export default app;