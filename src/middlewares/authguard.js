import verify  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import redis from "../utils/redis";

const userCache = redis.userCache;
const ACCESS_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "Awesome key"
/**
 * Middleware to check user's authentication.
 * @param {Request} req - Request HTTP
 * @param {Response} res - Response HTTP
 * @param {NextFunction} next - Next stage of the request
 */
async function authguard(req, res, next) {
    const cookie = req.signedCookies.access;
    if (!cookie) return res.status(401).json({message: "No token found."});

    try {
        const token = verify(cookie, ACCESS_TOKEN_KEY);
        if (!token) throw "Invalid token";
        
        let user = await userCache.get(`user:${token.id}`);
        if (user) {
            req.user = JSON.parse(user);
            next();
        }

        switch (token.role) {
             case "MEMBER": {
                // TODO REQUEST IN PRISMA AT MEMBER TABLE
                break;
             }
             case "EMPLOYEE": {
                // TODO REQUEST IN PRISMA AT EMPLOYEE TABLE
                break;
             }
        }

        if (!user) throw "Invalid token";
        req.user = user;
        next()
        
    } catch (err) {
        return res.status(401).json({message: err});
    }

}

export default authguard;