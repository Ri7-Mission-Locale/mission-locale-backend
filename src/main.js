import express from "express"
import cors from "cors"
import authenticationRouter from './routes/authenticationRouter.js'
import workshopRouter from "./routes/workshopRouter.js";
import tagRouter from "./routes/tagRouter.js";

const port = process.env.NODE_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticationRouter);
app.use(workshopRouter)
app.use(tagRouter)


app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Listen at port ${port}`)
})