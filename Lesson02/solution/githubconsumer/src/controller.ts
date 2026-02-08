import { getContent, getPath, getRepositories, type IContent, type IRepository } from "./model.js";
import { initialRender, renderContent, renderRepositories } from "./view.js";

let USERNAME = "";
let REPOSITORY: IRepository;

export async function init() {
    await initialRender();
}

export async function handleUsername(username: string) {
    try {
        USERNAME = username;
        const repositories = await getRepositories(username);
        await renderRepositories(repositories);
    } catch (error: any) {
        if (error.status === 404) {
            console.log(`User "${username}" not found. Please try again.`);
        } else {
            console.log(`Error: ${error}`);
        }
    }
}

export async function handleRepository(repository: IRepository, path?: string) {
    try {
        REPOSITORY = repository;
        const content = await getPath(USERNAME, repository.name, path ?? "");
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
    await handleRepository(REPOSITORY, content.path);
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
