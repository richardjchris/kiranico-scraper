const fs = require('fs');
const readline = require('node:readline');
const puppeteer = require('puppeteer');

function askURL(query) {
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
   });

   return new Promise((resolve) =>
      rl.question(query, (ans) => {
         rl.close();
         resolve(ans);
      })
   );
}

(async () => {
   const url = await askURL('Paste in URL to extract:\n');
   const browser = await puppeteer.launch();

   const page = await browser.newPage();
   await page.goto(url);

   const dataPromise = await page.evaluate(() => {
      return Promise.resolve({ js_vars });
   });

   const title = await page.title();
   const name = await title.split(' ');
   browser.close();

   const data = JSON.stringify(dataPromise);
   fs.writeFile(`./${name[0]}.json`, data, (err) => {
      if (err) console.log(err);
      else {
         console.log('File written successfully\n');
      }
   });
})();
