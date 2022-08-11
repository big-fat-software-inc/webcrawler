const fs = require("fs");
const path = require("path");
const urls = require("./BASEURLs");

function homogenize(links) {
  let h = {};
  urls.concat(links).map((href) => {
    h[href] = href;
  });
  return Object.keys(h);
}

function homogenizeAndWriteToFile(links, url) {
  let allLinks = homogenize(links);

  const hostName = getHostName(url);
  const filePath = path.join(__dirname, `array.${hostName}.${Date.now()}.js`);

  writeArrayToFile(allLinks, filePath);
}

async function writeArrayToFile(allLinks, filePath) {
  let str = `const allLinks = [`;

  allLinks.forEach(function (v) {
    if (v.indexOf("http") !== -1) {
      str += `"${v}" ,\n`;
    }
  });
  str += `];\n\n module.exports = allLinks;`;
  console.log("--------");
  console.log("str");
  fs.writeFileSync(filePath, str);
}

// async function writeArrayToFile(allLinks, filePath) {
//   const file = fs.createWriteStream(filePath);
//   file.on("error", function (err) {
//     /* error handling */
//     console.log("Error", err);
//   });
//   file.write(`module.exports = [`);

//   allLinks.forEach(function (v) {
//     file.write(`${v}, `);
//   });

//   file.write(`];`);
//   file.end();
// }
function getHostName(__fromURL) {
  const url = new URL(__fromURL);
  return url.hostname;
}

const utils = {
  homogenizeAndWriteToFile,
  getHostName,
};

module.exports = utils;
