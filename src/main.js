import express from "express"
import cors from "cors"
import workshopRouter from "./routes/workshopRouter.js";
import tagRouter from "./routes/tagRouter.js";
import meetingRouter from "./routes/meetingRouter.js";

const port = process.env.NODE_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(workshopRouter)
app.use(tagRouter)
app.use(meetingRouter)


app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Listen at port ${port}`)
})