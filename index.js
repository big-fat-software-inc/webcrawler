const path = require("path");
const utils = require("./utils");
const options = require("./options");
const ScanMiddleware = require("./scan.middleware");
const askQuestionsMiddleware = require("./askQuestions.middleware");

askQuestionsMiddleware(
  {
    question: `Please enter a URL::`,
  },
  res,
  (BASE_URL) => {
    ScanMiddleware(
      {
        BASE_URL,
      },
      res
    );
  }
);
