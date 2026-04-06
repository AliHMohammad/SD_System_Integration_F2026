import { SignJWT } from "jose";
import { randomUUID } from "node:crypto";

export default async function generateJWT(sub: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    const jti = randomUUID()
    
    const token = await new SignJWT({ sub, role: "user" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .setJti(jti)
        .sign(secret);

    return {
        token,
        jti
    }
}
