import readline from "readline";
import { Octokit } from "@octokit/core";
import "dotenv/config";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const readInput = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer: string) => {
            resolve(answer.trim());
        });
    });
};

// Octokit.js
// https://github.com/octokit/core.js#readme
export const octo = new Octokit({
    auth: process.env.TOKEN ?? "",
});
