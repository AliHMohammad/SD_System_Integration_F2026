import { readFile } from "node:fs";

function convert() {
    readFile("danish_companies.txt", "utf-8" ,(err, data) => {
        if (err) throw err;

        const companies = data.split("~");
        const result = [];
        
        companies.forEach(com => {
            const details = com.split("|");
            const company = {
                cvr: details[0],
                full_name: details[1],
                street: details[2],
                number: details[3],
                postal_code: details[4],
                city: details[5],
                email: details[6].replace("#EOF#\n", ""),
            };

            result.push(company)
        });
                
        const JSONResult = JSON.stringify(result)
        console.log(JSONResult);
    });
}

convert();
