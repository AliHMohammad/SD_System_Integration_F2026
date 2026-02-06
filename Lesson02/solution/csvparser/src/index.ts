import csv from "csvtojson";
// Run with "npm start -- danish_companies.csv"

interface ICompany {
    cvr: string;
    full_name: string;
    street: string;
    number: string;
    postal_code: string;
    city: string;
    email: string;
}

function convert(args: string[]) {
    const file = args[0];

    if (!file) throw new Error("Define a file to convert");

    try {
        csv()
            .fromFile(file)
            .then((json: ICompany[]) => {
                console.log(json);
            });
    } catch (error) {
        console.error("Could not convert " + file + "to JSON");
        throw error;
    }
}

convert(process.argv.slice(2));
