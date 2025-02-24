import { Router } from "express";

export default authenticationRouter = Router();
authenticationRouter.get("/test", (req, res) => {
    res.send("cc")
})