const puppeteer = require('puppeteer');
const path = require('path');

const OUT = path.join(__dirname, 'screenshots');
const BASE = 'http://localhost:5174';

async function shot(page, url, file, wait = 1500, beforeShot) {
  await page.goto(BASE + url, { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, wait));
  if (beforeShot) await beforeShot(page);
  await page.screenshot({ path: path.join(OUT, file), fullPage: false });
  console.log('saved', file);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1400, height: 800 },
  });
  const page = await browser.newPage();

  // 1. Home
  await shot(page, '/', 'home.png');

  // 2. Engines catalog
  await shot(page, '/engines', 'engines.png');

  // 3. Engine detail (first engine)
  await shot(page, '/engines/eng-1', 'engine_detail.png');

  // 4. Manufacturers
  await shot(page, '/manufacturers', 'manufacturers.png');

  // 5. Login page
  await shot(page, '/login', 'login.png', 500);

  // 6. Admin (need to login first)
  await page.goto(BASE + '/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  await page.type('input[type="email"]', 'admin@engines.ru');
  await page.type('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 2000));
  await page.goto(BASE + '/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT, 'admin.png'), fullPage: false });
  console.log('saved admin.png');

  await browser.close();
  console.log('Done');
})();
