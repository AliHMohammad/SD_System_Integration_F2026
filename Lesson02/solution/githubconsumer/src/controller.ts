import { getContent, getPath, getRepositories, type IContent, type IRepository } from "./model.js";
import { initialRender, renderContent, renderRepositories } from "./view.js";

let USERNAME = "";
let REPOSITORIES: IRepository[] = [];
let REPOSITORY_NAME: string;

export async function init() {
    await initialRender();
}

export async function handleUsername(username: string) {
    try {
        USERNAME = username;
        REPOSITORIES = await getRepositories(username);
        await renderRepositories(REPOSITORIES);
    } catch (error: any) {
        if (error.status === 404) {
            console.log(`User "${username}" not found. Please try again.`);
        } else {
            console.log(`Error: ${error}`);
        }
    }
}

export async function handleRepository(repository: string, path?: string) {
    try {
        REPOSITORY_NAME = repository;
        const content = await getPath(USERNAME, repository, path ?? "");
        await renderContent(content);
    } catch (error: any) {
        if (error.status === 404) {
            console.log(`Repository "${repository}" or path "${path}" not found. Please try again.`);
        } else {
            console.log(`Error: ${error}`);
        }
    }
}

export async function handlePath(content: IContent) {
    await handleRepository(REPOSITORY_NAME, content.path);
}

export async function handleContent(content: IContent) {
    try {
        const url = `${content.html_url.replace("/blob", "").replace("https://github", "https://raw.githubusercontent")}`;
        const output = await getContent(url);
        console.log(output);
    } catch (error: any) {
        if (error.status === 404) {
            console.log(`Path "${content.html_url}" not found. Please try again.`);
        } else {
            console.log(`Error: ${error}`);
        }
    }
}
