import express from "express";
import UserRepository from "../repositories/UserRepository";

const userRepository = UserRepository;
const userRouter = express.Router()

    .get("/users", async (req, res) => {
        
    })
    .get("/users:/id", async (req, res) => {

    })
    .patch("/users:/id", async (req, res) => {

    })
    .delete("/users:/id", async (req, res) => {

    })


export default userRouter;


