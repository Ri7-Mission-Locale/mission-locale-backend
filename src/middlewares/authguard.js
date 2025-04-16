import jwt from 'jsonwebtoken';
import express from 'express';
const { Request, Response, NextFunction } = express;
import TokenRepository from "../repositories/TokenRepository.js";

const ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_KEY;

/**
 * Middleware to check user's authentication.
 * @param {Request} req - Request HTTP
 * @param {Response} res - Response HTTP
 * @param {NextFunction} next - Next stage of the request 
 */
const tokenRepository = TokenRepository;

async function authguard(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies.refresh;

    try {
        if (!accessToken || !refreshToken) throw { message: "Unauthorized" };

        const data = jwt.verify(accessToken, ACCESS_TOKEN_KEY);
        if (!data) throw { message: "Unauthorized" };

        const user = await tokenRepository.find(data.key);
        if (!user) throw { message: "Unauthorized" };

        req.user = user.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: err });
    }
}

export default authguard;

