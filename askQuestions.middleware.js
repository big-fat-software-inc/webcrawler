module.exports = ({ question }, res, next) => {
  let readlineInterface = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readlineInterface.setPrompt(question);
  readlineInterface.prompt();

  let response;
  readlineInterface.on("line", (userInput) => {
    if (userInput.indexOf("http") === -1) {
      throw "Invalid or Empty input";
    } else {
      response = userInput;
      readlineInterface.close();
    }
  });

  readlineInterface.on("close", () => {
    next(response);
  });
};
