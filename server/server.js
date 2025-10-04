import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";
import path from "path";
import db from "./config/db-connection.js";
import { fileURLToPath } from "url";
import { dirname } from "path";


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startApolloServer = async () => {
    await server.start();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use("/graphql", expressMiddleware(server, {
        context: authMiddleware
    }));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));
        app.get("*", (_req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    });
}

startApolloServer();