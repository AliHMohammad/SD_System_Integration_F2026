import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

export default async function authToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "missing or invalid authorization header" });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
        return res.status(401).json({ message: "missing bearer token" });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        res.locals.user = payload;
        return next();
    } catch {
        return res.status(401).json({ message: "invalid or expired token" });
    }
}
