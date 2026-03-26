import { SignJWT } from "jose";
import { randomUUID } from "node:crypto";

export default async function generateJWT(sub: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ sub, role: "user" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .setJti(randomUUID())
        .sign(secret);

    return token;
}
