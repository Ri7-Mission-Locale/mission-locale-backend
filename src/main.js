import express from "express"
import cors from "cors"

const port = process.env.NODE_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.name)

app.listen(port, (err) => {
    if (!err) return console.error(err);
    console.log(`Listen at port ${port}`)
})