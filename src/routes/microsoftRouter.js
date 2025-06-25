import express from "express";
import MicrosoftService from "../repositories/MicrosoftService.js";

const microsoft = MicrosoftService;
const microsoftRouter = express.Router()
    .get("/callendar", async (req, res) => {
        return res.json({
            callendars: await microsoft.getCallendars()
        })
    })
    .get("/test", async (req, res) => {
        return res.json({
            callendars: await microsoft.getEvents()
        })
    })
export default microsoftRouter;
