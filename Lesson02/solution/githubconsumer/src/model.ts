import { octo } from "./utils.js";

export interface IRepository {
    id: number;
    name: string;
}

export interface IContent {
    name: string;
    path: string;
    type: "file" | "dir";
    html_url: string;
}

export async function getRepositories(username: string) {
    const res = await octo.request(`GET /users/${username}/repos`, {
        username: username,
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });

    return res.data as IRepository[];
}

export async function getPath(username: string, repo: string, path?: string) {
    const res = await octo.request(`GET /repos/${username}/${repo}/contents/${path}`, {
        owner: username,
        repo: repo,
        path: path,
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });

    return res.data as IContent[];
}

export async function getContent(url: string): Promise<string> {
    const finalURL = `${url.replace("/blob", "").replace("https://github", "https://raw.githubusercontent")}`;

    const result = await fetch(finalURL);

    return result.text();
}
