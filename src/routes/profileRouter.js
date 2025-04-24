import express from "express";
import authguard from "../middlewares/authguard.js";
import { updateUserValidator } from "../validators/userValidator.js";
import UserRepository from "../repositories/UserRepository.js";

const userRepository = UserRepository;
const profileRouter = express.Router()

    .get("/profile", authguard, async (req, res) => res.json(req.user))

    .patch("/profile", authguard, async (req, res) => {
        const user = req.user;
        try {
            const datas = await updateUserValidator.validate(req.body, { abortEarly: false });
            userRepository.update(user.user_id, datas);
        } catch(err) {
            console.error(err);
            res.status(400).json(err);
        }
    })

    .get("/profile/documents", authguard, async (req, res) => {

    })
    .post("/profile/documents", authguard, async (req, res) => {

    })
    .patch("/profile/documents/:id", authguard, async (req, res) => {

    })
    .delete("/profile/documents/:id", authguard, async (req, res) => {
        
    })

export default profileRouter;