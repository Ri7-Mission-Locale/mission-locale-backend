import express from "express";
import authguard from "../middlewares/authguard";
import UserRepository from "../repositories/UserRepository";
import TokenRepository from "../repositories/TokenRepository";
import { loginValidator, registerValidator } from "../validators/userValidator";
import { compare } from "bcrypt";
import { cookieOptions } from "../utils/cookieOptions";


const userRepository = UserRepository;
const tokenRepository = TokenRepository;

const authRouter = express.Router()

    .post("/auth/register", async (req, res) => {
        try {
            const validatedData = await registerValidator.validate(req.body, { abortEarly: false });
            delete validatedData.confirm_password;
            await userRepository.create(validatedData);

            // TODO send validation mail

            res.status(200).json({ message: "ok" });
        } catch (err) {
            res.status(301).json(err);
        }
    })


    .post("/auth/login", async (req, res) => {
        try {
            const validatedData = await loginValidator.validate(req.body, { abortEarly: false });
            const user = await userRepository.find(validatedData.email);

            if (!user) throw "Addresse email incorrecte";
            if (!await compare(validatedData.password, user.password)) throw "Mot de passe incorrecte";

            const accessToken = await tokenRepository.generate(user.user_id, "ACCESS_TOKEN", 5 * 60 * 1000);
            const expiration = validatedUser.keepConnected ? 7 * 24 * 60 * 60 * 1000 : 3 * 60 * 60 * 1000;
            const refreshToken = await tokenRepository.generate(user.user_id, "REFRESH_TOKEN", expiration);

            res.status(200)
                .json({ token: accessToken })
                .cookie("refresh", refreshToken, {
                    maxAge: expiration,
                    expires: new Date(Date.now() + expiration),
                    ...cookieOptions
                })
        } catch (err) {
            res.status(301).json(err);
        }
    })

    .post("/auth/refresh", async (req, res) => {
        
    })

    .post("/auth/logout", authguard, async (req, res) => {

    })

    .post("/auth/force-logout", authguard, async (req, res) => {

    });

export default authRouter;