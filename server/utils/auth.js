import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.AUTH_SECRET_KEY;
const expiration = "2h";

if (!secretKey) {
    throw new Error("Missing AUTH_SECRET_KEY in environment variables");
}

const AuthenticationError = new GraphQLError("Fail to authenticate user", {
    extensions: { code: "UNAUTHENTICATED" },
});

function requireAdmin(user) {
    if(!user || !user.isAdmin) {
        throw new GraphQLError("Access denined: Admin only", {
            extensions: { code: "FORBIDDEN" }
        });
    }
}

function authMiddleware({req}) {
    if (!secretKey) {
        throw new Error("Missing AUTH_SECRET_KEY in environment variables");
    }
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) return req;

    if (req.headers.authorization) {
        token = token.split(" ").pop()?.trim();
    }

    try {
        const { data } = jwt.verify(token, secretKey, { maxAge: expiration });
        req.user = data;
    } catch (err) {
        console.log("Invalid token", err);
    }

    return req;
}

function signToken({ _id, username, email, isAdmin }) {
    if (!secretKey) {
        throw new Error("Missing AUTH_SECRET_KEY in environment variables");
    }
    const payload = { _id, username, email, isAdmin };
    return jwt.sign({ data: payload }, secretKey, { expiresIn: expiration });
}

export { authMiddleware, signToken, requireAdmin, AuthenticationError };