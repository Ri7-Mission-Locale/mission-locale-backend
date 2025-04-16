import express from "express";
import authguard from "../middlewares/authguard.js";
import UserRepository from "../repositories/UserRepository.js";
import TokenRepository from "../repositories/TokenRepository.js";
import { loginValidator, registerValidator } from "../validators/userValidator.js";
import { compare } from "bcrypt";
import { cookieOptions } from "../utils/cookieOptions.js";
import jwt from "jsonwebtoken";

const userRepository = UserRepository;
const tokenRepository = TokenRepository;
const REFRESH_TOKEN_KEY = process.env.JWT_REFRESH_KEY;

const authRouter = express.Router()

    .post("/auth/register", async (req, res) => {
        try {
            const validatedData = await registerValidator.validate(req.body, { abortEarly: false });
            delete validatedData.confirm_password;
            await userRepository.create(validatedData);

            // TODO send validation mail

            res.json({ message: "ok" });
        } catch (err) {
            res.status(400).json(err);
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

            res.json({ token: accessToken })
                .cookie("refresh", refreshToken, {
                    maxAge: expiration,
                    expires: new Date(Date.now() + expiration),
                    ...cookieOptions
                })
        } catch (err) {
            res.status(400).json(err);
        }
    })

    .post("/auth/refresh", async (req, res) => {
        let accessToken = req.headers['authorization']?.split(' ')[1];
        const refreshToken = req.cookies.refresh;

        try {
            if (!accessToken || !refreshToken) throw { message: "Unauthorized" };
            const data = jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
            if (!data) throw { message: "Unauthorized" };

            const user = tokenRepository.find(data.key);
            if (!user) throw { message: "Unauthorized" };

            accessToken = await tokenRepository.generate(user.user_id, "ACCESS_TOKEN", 5 * 60 * 1000);
            res.json({ token: accessToken })
        } catch (err) {
            res.status(401).json(err);
        }
    })

    .post("/auth/logout", authguard, async (req, res) => {
        const refreshToken = req.cookies.refresh;

        try {
            await tokenRepository.delete(decode(refreshToken).key);
            res.clearCookie("refresh").json({ message: "bye" });

        } catch (err) {
            res.status(301).json(err);
        }
    }) 

    .post("/auth/force-logout", authguard, async (req, res) => {
        try {
            await tokenRepository.deleteAll(req.user.user_id);
            res.clearCookie("refresh").json({ message: "bye" })
        } catch (err) {
            res.status(301).json(err);
        }
    });

export default authRouter;