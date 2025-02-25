import express from "express"
import cors from "cors"

import workshopRouter from "./routes/workshopRouter.js";

import meetingRouter from "./routes/meetingRouter.js";


import counsellorRouter from "./routes/counsellorRouter.js";


import memberRouter from "./routes/memberRouter.js";


const port = process.env.NODE_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(workshopRouter)

app.use(meetingRouter)


app.use(counsellorRouter);
 

app.use(memberRouter);


app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Listen at port ${port}`)
})