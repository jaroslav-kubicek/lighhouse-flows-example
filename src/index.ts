import fs from 'fs';
import puppeteer from 'puppeteer';
import { startFlow } from 'lighthouse';

import { preheatBrowser, scrollPage, searchForJerseys } from './pageActions.js';
import { settings, mainURL, categoryURL } from './config.js';

const generateReport = async () => {
  const browser = await puppeteer.launch({ headless: false });
  await preheatBrowser(browser);

  const page = await browser.newPage();
  const flow = await startFlow(page, {
    name: 'Landing page load',
    config: settings,
  });

  await flow.navigate(mainURL);
  await searchForJerseys(page);
  await flow.snapshot();

  await flow.navigate(categoryURL);
  await flow.startTimespan();
  await page.goto(categoryURL, { waitUntil: 'networkidle0' });
  await scrollPage(page);
  await flow.endTimespan();

  await browser.close();

  const report = await flow.generateReport();
  fs.writeFileSync('reports/wiggle.html', report);
};

generateReport().catch((error) => {
  console.log(error);
  process.exit(1);
});
