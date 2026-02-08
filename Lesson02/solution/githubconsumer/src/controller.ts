import { getContent, getPath, getRepositories, type IContent, type IRepository } from "./model.js";
import { initialRender, renderContent, renderRepositories } from "./view.js";

let USERNAME = "";
let REPOSITORIES: IRepository[] = [];
let REPOSITORY: IRepository;

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

export async function handleContent(content: IContent) {
    try {
        const output = await getContent(content.html_url);
        console.log(output);
    } catch (error: any) {
        if (error.status === 404) {
            console.log(`Path "${content.html_url}" not found. Please try again.`);
        } else {
            console.log(`Error: ${error}`);
        }
    }
}
