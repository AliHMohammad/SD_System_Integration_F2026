import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../prisma/prisma.js";
import type { ILoginDTO } from "./DTOs/authDTO.js";
import generateJWT from "./helpers/generateJWT.js";
import authToken from "./middlewares/authToken.js";
import { ensureRedisConnection, redisClient } from "./helpers/redisClient.js";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
const tasks = [
    { id: 1, task: "Learn REST APIs", done: false },
    { id: 2, task: "Build a REST API", done: false },
    { id: 3, task: "Test the API", done: false },
    { id: 4, task: "Keep learning", done: false },
];

app.get("/tasks", authToken, async (_req: Request, res: Response) => {
    res.status(200).json(tasks);
});

app.post("/auth/login", async (req: Request<{}, {}, ILoginDTO, {}>, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "invalid credentials" });
    }

    const { token, jti } = await generateJWT(user.username);

    try {
        await ensureRedisConnection();
        await redisClient.set(`user:${username}:token`, jti, {
            expiration: { type: "EX", value: 60 * 30 },
        });
    } catch {
        return res.status(500).json({ message: "failed to save session" });
    }

    return res.status(200).json({ token: token });
});

app.delete("/auth/logout", authToken, async (_req: Request, res: Response) => {
    const username = res.locals.user?.sub;
    if (!username) {
        return res.status(401).json({ message: "invalid token payload" });
    }

    try {
        await ensureRedisConnection();
        await redisClient.del(`user:${username}:token`);
    } catch {
        return res.status(500).json({ message: "failed to clear session" });
    }

    return res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`To-Do List API is running on http://localhost:${PORT}`);
});
