import express from 'express'
import MemberService from '../services/MemberService.js';
import registerMemberSchema from '../validators/memberValidator.js';
import verify from 'jsonwebtoken';

const memberRouter = express.Router();
const memberService = new MemberService();
const MAIL_TOKEN_KEY = process.env.JWT_MAIL_KEY || "Awesome key"

/* User's account creation */
memberRouter.put("/member/register", async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) return res.status(301).json("Invalid confirm password")
    try {
        const validatedUser = await registerMemberSchema.validate(req.body, { abortEarly: false });
        const savedUser = await memberService.create(validatedUser);
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(300).json(err);
    }
})

/* Update user's mail before validation */
memberRouter.patch("/member/changemail/:token", (req, res) => {
    try {
        const tokenData = verify(req.params.token, MAIL_TOKEN_KEY);

    } catch (err) {
        res.status(300).json(err);
    }
})

/* User's mail validation */
memberRouter.patch("/member/validate/:token", (req, res) => {
    try {
        const tokenData = verify(req.params.token, MAIL_TOKEN_KEY);
    } catch (err) {
        res.status(300).json(err);
    }
})

/* Handle user's connexion and store session */
memberRouter.post("/member/login", (req, res) => {
    try {

    } catch (err) {
        res.status(300).json(err);
    }
})

/* Refresh user session  */
memberRouter.get("/member/refresh", (req, res) => {
    try {

    } catch (err) {
        res.status(300).json(err);
    }
})

export default memberRouter;

