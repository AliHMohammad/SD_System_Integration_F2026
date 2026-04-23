# Voting
WebSockets client.

It connects to the server at `ws://localhost:8080` and allows the user to vote for his/her preferred Danish food:
- Smørrebrød
- Flæskesteg
- Frikadeller

The corresponding request is JSON with the following format:
```json
{
    "type": "vote",
    "option": ONE_OF_THE_THREE_FOODS
}
```

The application displays the voting results, which it updates when receiving messages of the type `state` from the WebSockets server with the following JSON format:
```json
{
    "type": "state",
    "votes": {
        "Smørrebrød": NUMBER_OF_SMØRREBRØD_VOTES,
        "Flæskesteg": NUMBER_OF_FLÆSKESTEG_VOTES,
        "Frikadeller": NUMBER_OF_FRIKADELLER_VOTES
    }
}
```

## Tools
JavaScript / Water.css / CSS3 / HTML5

## Author
ChatGPT 5.2, prompted by Arturo Mora-Rioja