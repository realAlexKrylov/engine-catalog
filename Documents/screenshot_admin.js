const puppeteer = require('puppeteer');
const path = require('path');

const OUT = path.join(__dirname, 'screenshots');
const BASE = 'http://localhost:5174';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1400, height: 800 },
  });
  const page = await browser.newPage();

  // Set localStorage directly before page load
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });

  // Login via API directly and set localStorage
  const loginRes = await page.evaluate(async () => {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@engines.ru', password: 'password' })
    });
    return r.json();
  });

  await page.evaluate((data) => {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }, loginRes);

  // Navigate to admin
  await page.goto(BASE + '/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT, 'admin.png'), fullPage: false });
  console.log('Admin screenshot saved');

  await browser.close();
})();
