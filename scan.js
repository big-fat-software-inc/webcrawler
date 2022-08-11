const puppeteer = require("puppeteer");
const process = require("process");

const utils = require("./utils");
const options = require("./options");

async function ScanAndWriteLinks(__url) {
  let url;
  const args = process.argv.slice(2);

  if (args.length !== 0) {
    url = args[1];
  } else {
    url = __url;
  }
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.goto(url, {
    //   waitUntil: "networkidle2",
  });
  const INFO = await page.evaluate(() => {
    console.log("All URLs:", document.links.length);
    let h = {};

    Array.from(document.links).map((anchorElement) => {
      h[anchorElement.href] = anchorElement.href;
    });
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
      links: Object.keys(h),
    };
  });

  console.log("INFO", INFO);
  console.log("INFO.links", INFO.links);

  await utils.homogenizeAndWriteToFile(INFO.links, url);

  // const hostName = utils.getHostName(url);

  // await page.screenshot({
  //   path: path.join(__dirname, `screenshots/${hostName}.png`),
  // });

  // await page.pdf({ path: "hn.pdf", format: "a4" });

  await browser.close();
}

module.exports = ScanAndWriteLinks;
