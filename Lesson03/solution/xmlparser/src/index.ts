import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";
// Run with "npm start -- danish_companies.xml"


function convert(args: string[]) {
    const file = args[0];

    if (!file) throw new Error("Define a file to convert");

    try {
        const xmlContent = readFileSync(file, "utf-8");
        const parser = new XMLParser();
        const companies = parser.parse(xmlContent).companies;
        console.log(companies);
    } catch (error) {
        console.error("Could not convert " + file + "to JSON");
        throw error;
    }
}

convert(process.argv.slice(2));
