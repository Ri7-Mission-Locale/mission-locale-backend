import verify  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import redis from "../utils/redis";

const userCache = redis.userCache;
const ACCESS_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "Awesome key";

/**
 * Middleware to check member's authentication.
 * @param {Request} req - Request HTTP
 * @param {Response} res - Response HTTP
 * @param {NextFunction} next - Next stage of the request
 */

async function authguard(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    try {
        if (!token) throw {message: "No access token found"};

        const data = verify(token, ACCESS_TOKEN_KEY);
        if (!data) throw {message: "Invalid access token"};
        
        let user = await userCache.get(`user:${data.id}`);
        if (user) {
            req.user = JSON.parse(user);
            next();
            return;
        }
        throw {message: "Invalid access token"};
    } catch (err) {
        return res.status(401).json({message: err});
    }

}

export default authguard;