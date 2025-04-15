import express from "express";
import UserRepository from "../repositories/UserRepository";
import { userFiltersValidator } from "../validators/userValidator";

const userRepository = UserRepository;
const userRouter = express.Router()

    .get("/users", async (req, res) => {
        try {
            const filters = await userFiltersValidator.validate(req.query, { stripUnknown: true });
            const users = await userRepository.findMany(filters);
            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    })

    .get("/users:/id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const user = await userRepository.find(id);
            if (!user) throw "Utilisateur non trouvé";
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    })

    .patch("/users:/id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const user = await userRepository.update(id, "")
        } catch (err) {
            res.status(400).json(err);
        }
    })

    .delete("/users:/id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const user = await userRepository.delete(id);
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    })

export default userRouter;


