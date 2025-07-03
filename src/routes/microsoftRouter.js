import express from "express";
import MicrosoftService from "../repositories/MicrosoftService.js";

const microsoft = MicrosoftService;
const microsoftRouter = express.Router()
    .get("/callendar", async (req, res) => {
        return res.json({
            callendars: await microsoft.getCallendars()
        })
    })
    .get("/appointements", async (req, res) => {
        const { start, end, duration } = req.query;
        return res.json({
            data: await microsoft.getSchedule(start, end, duration)
        })
    })
export default microsoftRouter;
