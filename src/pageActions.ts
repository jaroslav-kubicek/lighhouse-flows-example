import { Browser, Page } from "puppeteer";

import { mainURL } from "./config";

export const searchForJerseys = async (page: Page) => {
  await page.waitForNetworkIdle();
  // mimic user who is first searching in menu
  await page.click('#openNav');
  await page.waitForSelector('[data-ga-label="Cycle"]', { visible: true });
  await page.click('#closeNav');

  // and then searching for jerseys through input
  await page.type('[name="s"]', 'jerseys', { delay: 50 });
  await page.waitForSelector('#mobile-search-type-ahead', { visible: true });
};

export const preheatBrowser = async (browser: Browser) => {
  const preheatPage = await browser.newPage();
  await preheatPage.goto(mainURL);
  await preheatPage.click('#truste-consent-button');
  await preheatPage.close();
};

export const scrollPage = async (page: Page) => {
  const session = await page.target().createCDPSession();
  await session.send('Input.synthesizeScrollGesture', {
    x: 100,
    y: 0,
    yDistance: -1000,
    speed: 1000,
    repeatCount: 2,
    repeatDelayMs: 250,
  });
}