// const cheerio = require('cheerio');
// const cors = require('cors')({ origin: true });

// (async () => {
//    const url = 'https://kiranico.com/en/mh4u/monster/seltas';
//    const response = await fetch(url);

//    const $ = cheerio.load(await response.text());
//    //const $ = await cheerio.fromURL(url);
//    console.log($.html());
// })();

(async () => {
   const puppeteer = require('puppeteer');

   const fs = require('fs');

   const browser = await puppeteer.launch();

   const page = await browser.newPage();
   await page.goto('https://kiranico.com/en/mh4u/monster/seltas');

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
