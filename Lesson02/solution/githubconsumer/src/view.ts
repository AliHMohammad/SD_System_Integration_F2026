import { readlink } from "fs";
import { readInput } from "./utils.js";
import { handleContent, handleRepository, handleUsername } from "./controller.js";
import type { IContent, IRepository } from "./model.js";

export async function initialRender() {
    console.log("GitHub CLI");

    const username = await readInput("Input username: ");
    await handleUsername(username);
}

export async function renderRepositories(repos: IRepository[]) {
    console.log(`\nFound ${repos.length} repositories:\n`);
    for (const repo of repos) {
        console.log("- " + repo.name);
    }

    const repository = await readInput("\nSelect repository: ");
    await handleRepository(repository);
}

export async function renderContent(content: IContent[], path?: string) {
    console.log(`\n Content found in path: ${path ?? "/"}\n`);
    for (const con of content) {
        console.log("+ " + con.name + ", type: " + con.type);
    }

    const name = await readInput("\nOutput file (e.g. 'README.md') : ");
    const file = content.find((c) => (c.name == name))!;

    await handleContent(file);
}
