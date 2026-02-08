import { init } from "./controller.js";

async function main() {
    while (true) {
        await init();
    }
}

main();
