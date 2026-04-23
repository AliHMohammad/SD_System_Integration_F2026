import { output } from "./utils.js";

const WS_URL = "ws://localhost:8080";

const socket = new WebSocket(WS_URL);

// Connection opened
socket.addEventListener("open", () => {
    output("Connected to voting server");
});

// Handle incoming messages
socket.addEventListener("message", (event) => {
    try {
        const data = JSON.parse(event.data);

        if (data.type === "state") {
            renderVotes(data.votes);
        } else if (data.type === "log") {
            if (Array.isArray(data.entries)) {
                // Initial log history
                data.entries.forEach((entry) => output(`State @ ${entry.timestamp}`, entry.votes));
            } else if (data.entry) {
                // Incremental log update
                output(`State @ ${data.entry.timestamp}`, data.entry.votes);
            }
        } else if (data.type === "error") {
            output("Error:", data.message);
        } else {
            output("Unknown message:", data);
        }
    } catch (e) {
        output("Invalid JSON received:", event.data);
    }
});

// Send vote
function sendVote(option) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(
            JSON.stringify({
                type: "vote",
                option: option,
            }),
        );
    } else {
        output("Connection is not open");
    }
}

// Render vote totals
function renderVotes(votes) {
    const container = document.querySelector("#votes");
    container.innerHTML = "";

    Object.entries(votes).forEach(([key, value]) => {
        const div = document.createElement("div");
        div.classList.add("inline");

        const keyPar = document.createElement("p");
        keyPar.innerText = key;
        div.append(keyPar);

        const valuePar = document.createElement("p");
        valuePar.classList.add("number");
        valuePar.innerText = value;
        div.append(valuePar);

        container.appendChild(div);
    });
}

// Button handlers
document.querySelector("#btnSmoerrebroed").addEventListener("click", () => {
    sendVote("Smørrebrød");
});

document.querySelector("#btnFlaeskesteg").addEventListener("click", () => {
    sendVote("Flæskesteg");
});

document.querySelector("#btnFrikadeller").addEventListener("click", () => {
    sendVote("Frikadeller");
});

// Disconnect
document.querySelector("#btnDisconnect").addEventListener("click", (e) => {
    e.preventDefault();
    socket.close();
});

// Connection closed
socket.addEventListener("close", () => {
    output("Disconnected from server");
});
