import express from "express"
import cors from "cors"
<<<<<<< Updated upstream
import workshopRouter from "./routes/workshopRouter.js";
import meetingRouter from "./routes/meetingRouter.js";
import counsellorRouter from "./routes/counsellorRouter.js";
import memberRouter from "./routes/memberRouter.js";

=======
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT ;
>>>>>>> Stashed changes

const port = process.env.NODE_PORT || 3000;
const app = express();

<<<<<<< Updated upstream
app.use(cors());
app.use(express.json());
=======
    .use(authRouter)
    .use(userRouter)
    .use(newsRouter)
>>>>>>> Stashed changes

app.use(counsellorRouter);

app.use(workshopRouter)
app.use(meetingRouter)








app.use(memberRouter);

app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Listen at port ${port}`)
})