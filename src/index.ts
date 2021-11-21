import fs from 'fs';
import puppeteer from 'puppeteer';
// @ts-ignore
import { startFlow } from 'lighthouse/lighthouse-core/fraggle-rock/api';

import { preheatBrowser, scrollPage, searchForJerseys } from "./pageActions";
import { settings, mainURL, categoryURL } from "./config";

const generateReport = async () => {
  const browser = await puppeteer.launch({ headless: true });
  await preheatBrowser(browser);

  const page = await browser.newPage();
  const flow = await startFlow(page, { name: 'Landing page load', config: settings });

  await flow.navigate(mainURL, { stepName: 'Load homepage' });
  await searchForJerseys(page);
  await flow.snapshot({ stepName: 'Search for jerseys' });

  await flow.navigate(categoryURL, { stepName: 'Load "jerseys" product category' });
  await flow.startTimespan({ stepName: 'scroll in list' });
  await page.goto(categoryURL, {waitUntil: 'networkidle0'});
  await scrollPage(page);
  await flow.endTimespan();

  await browser.close();

  const report = flow.generateReport();
  fs.writeFileSync('reports/wiggle.html', report);
};

generateReport().catch((error) => {
  console.log(error);
  process.exit(1);
});