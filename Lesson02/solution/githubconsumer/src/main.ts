import { init } from "./controller.js";
import { readInput, rl } from "./utils.js";
import { initialRender } from "./view.js";

// Main async function
const main = async () => {
    while (true) {
        await init();
    }

    // Close the readline interface
    rl.close();
};

// Call the main async function
main();
