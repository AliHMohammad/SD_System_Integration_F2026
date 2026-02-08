import { readlink } from "fs";
import { readInput } from "./utils.js";
import { handleContent, handlePath, handleRepository, handleUsername } from "./controller.js";
import type { IContent, IRepository } from "./model.js";

export async function initialRender() {
    console.log("\n\nGitHub CLI\n");

    const username = await readInput("Input username: ");
    await handleUsername(username);
}

export async function renderRepositories(repos: IRepository[]) {
    console.log(`\nFound ${repos.length} repositories:\n`);
    for (const repo of repos) {
        console.log("- " + repo.name);
    }

    const input = await readInput("\nSelect repository: ");

    const repository = repos.find((r) => r.name == input)!;

    await handleRepository(repository);
}

export async function renderContent(content: IContent[], path?: string) {
    console.log(`\n Content found in path: ${path ?? "/"}\n`);
    for (const con of content) {
        console.log("+ " + con.name + ", type: " + con.type);
    }

    const action = await readInput("\n Select action : \n 1) Navigate to dir \n 2) Output file content \n");

    switch (action) {
        case "1":
            await renderSelectDir(content);
            break;
        case "2":
            await renderSelectFile(content);
            break;
        default:
            break;
    }
}

export async function renderSelectDir(content: IContent[]) {
    const name = await readInput("\nOutput dir (e.g. 'src') : ");
    const file = content.find((c) => c.name == name)!;

    await handlePath(file);
}

export async function renderSelectFile(content: IContent[]) {
    const name = await readInput("\nOutput file (e.g. 'README.md') : ");
    const file = content.find((c) => c.name == name)!;

    await handleContent(file);
}
