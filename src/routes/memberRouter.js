import express from 'express'
import MemberService from '../services/MemberService.js';
import { registerMemberSchema, loginMemberSchema, editMemberSchema } from '../validators/memberValidator.js';
import { sign } from 'jsonwebtoken';
import TokenService from '../services/TokenService.js';
import { compareSync } from 'bcrypt';

const memberRouter = express.Router();
const memberService = new MemberService();
const tokenService = new TokenService();

// IMPORTANT SECRET KEY
const ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_KEY || "!@^ Awesome key for access token §&ù@"

/* User's account creation */
memberRouter.put("/member/register", async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) return res.status(301).json("Invalid confirm password")
    try {
        const validatedUser = await registerMemberSchema.validate(req.body, { abortEarly: false });
        const savedUser = await memberService.create(validatedUser);

        // TODO Mail validation ?

        res.status(200).json(savedUser);
    } catch (err) {
        res.status(300).json(err);
    }
})

/* Handle user's connexion and store session */
memberRouter.post("/member/login", async (req, res) => {
    try {
        const validatedUser = await loginMemberSchema.validate(req.body, { abortEarly: false });
        const savedUser = await memberService.getByMail(validatedUser.email);

        // Check password
        if (!savedUser || !compareSync(validatedUser.password, savedUser.password)) {
            return res.status(300).json({ message: "Incorrect mail or password"});
        }

        const expiration = validatedUser.keepConnected ? 7 * 24 * 60 * 60 * 1000 : 3 * 60 * 60 * 1000;

        // Create a "refreshToken" and save it in database
        const refreshToken = await tokenService.generate(savedUser.id_member, "MEMBER", "REFRESH_TOKEN", expiration);

        // Create a "accessToken" with user id valid during 15 minutes
        const accessToken = sign({ id: savedUser.id_member }, ACCESS_TOKEN_KEY, { expiresIn: "15m" });

        res.status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true, // Cant be used by a frontend script.
                secure: process.env.NODE_ENV === 'production', // Secure by https (in prod)
                sameSite: 'strict', // Access by server address only
                maxAge: maxAge
            })
            .json({ user: savedUser, token: accessToken });
    } catch (err) {
        res.status(300).json(err);
    }
});

memberRouter.patch("/member/edit", async (req, res) => {
    try {
        const validatedUser = await editMemberSchema.validate(req.body, { abortEarly: false });
        const savedUser = await memberService.getByMail(validatedUser.email);

        // todo

        res.status(200).json(savedUser);
    } catch (err) {
        res.status(300).json(err);
    }
});

memberRouter.patch("/member/refresh", async (req, res) => {
    const token = req.cookies.refreshToken;
    
    try {
        const { id, type } = tokenService.validate(token, "REFRESH_TOKEN");
        if (!id || !type || type !== "MEMBER") throw { message: "Invalid refresh token"}

        const accessToken = sign({ id }, ACCESS_TOKEN_KEY, { expiresIn: "15m" });

        res.status(200).json({ token: accessToken });
    } catch (err) {
        res.status(300).json(err);
    }
});

memberRouter.post("/member/logout", async (req, res) => {
    const token = req.cookies.refreshToken;
    try {
        await tokenService.invalidateUserToken(token);
        res.status(200);
    } catch (err) {
        res.status(300).json(err);
    }
})


export default memberRouter;

