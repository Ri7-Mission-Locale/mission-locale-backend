import express from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import workshopRouter from "./routes/workshopRouter.js";
import meetingRouter from "./routes/meetingRouter.js";
import counsellorRouter from "./routes/counsellorRouter.js";
import memberRouter from "./routes/memberRouter.js";

const port = process.env.NODE_PORT;
const app = express()
    .use(cors())

    // Limit request / times
    .use(rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 250,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many request.",
    }))

    // Add http security headers (https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
    .use(helmet())

    // Allow Json and FormData (<form>) format
    .use(express.json({ limit: "10mb" }))
    .use(express.urlencoded({ extended: true }))


    // Declare routes
    .use(counsellorRouter)
    .use(workshopRouter)
    .use(meetingRouter)
    .use(counsellorRouter)
    .use(memberRouter)

    // Declare 404 page not found and listen
    .use((_, res) => res.status(404).json({ message: "Route not found"}))
    .listen(port, (err) => {
        if (err) return console.error(err);
        console.log(`Listen at port ${port}`)
    });

export default app;