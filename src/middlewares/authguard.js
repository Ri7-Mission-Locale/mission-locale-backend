import verify from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import TokenRepository from "../repositories/TokenRepository";

const ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_KEY;

/**
 * Middleware to check user's authentication.
 * @param {Request} req - Request HTTP
 * @param {Response} res - Response HTTP
 * @param {NextFunction} next - Next stage of the request */
const tokenRepository = TokenRepository;

async function authguard(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;

    try {
        if (!accessToken || !refreshToken) throw { message: "Unauthorized" };
        
        const data = verify(accessToken, ACCESS_TOKEN_KEY);
        if (!data) throw { message: "Unauthorized" };

        const user = tokenRepository.find(data.token);
        if (!user) throw { message: "Unauthorized" };

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: err });
    }
}

export default authguard;