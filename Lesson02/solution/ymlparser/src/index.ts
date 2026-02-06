import fs from "fs";
import yaml from "js-yaml";

// npm start -- danish_companies.yml

function convert(args: string[]) {
    const file = args[0];

    if (!file) throw new Error("Define a file to convert");

    try {
        const doc = yaml.load(fs.readFileSync(file, "utf8"));
        console.log(doc);
    } catch (e) {
        console.log(e);
    }
}

convert(process.argv.slice(2));
