const readline = require("readline");
let readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestions(q) {
  readlineInterface.setPrompt(q);
  readlineInterface.prompt();

  return new Promise((res, rej) => {
    let response;
    readlineInterface.on("line", (userInput) => {
      if (userInput.indexOf("http") === -1) {
        rej("Invalid or Empty input");
      } else {
        response = userInput;
        readlineInterface.close();
      }
    });

    readlineInterface.on("close", () => {
      res(response);
    });
  });
}

module.exports = askQuestions;
