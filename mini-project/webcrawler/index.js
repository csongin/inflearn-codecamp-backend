import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import { Starbucks } from './models/starbucksSchema.model.js';

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mydocker');

async function startCrawling() {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  const img = await page.$$eval('.product_list img[src]', imgs => imgs.map(img => img.getAttribute('src')));
  const name = await page.$$eval('.product_list img[alt]', names => names.map(name => name.getAttribute('alt')));

  for (let i = 0; i < img.length; i++) {

    const starbucks = await new Starbucks({
      name: name[i],
      img: img[i],
    });

    await starbucks.save();
  }
  await browser.close();
}

startCrawling();