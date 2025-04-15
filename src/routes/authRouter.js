import express from "express";
import authguard from "../middlewares/authguard";
import UserRepository from "../repositories/UserRepository";
import TokenRepository from "../repositories/TokenRepository";


const userRepository = UserRepository;
const tokenRepository = TokenRepository;

const authRouter = express.Router()

    .post("/auth/register", async (req, res) => {
        
    })

    .post("/auth/login", async (req, res) => {
        
    })

    .post("/auth/refresh", async (req, res) => {

    })

    .post("/auth/logout", authguard, async (req, res) => {

    })
    
    .post("/auth/force-logout", authguard, async (req, res) => {

    });

export default authRouter;