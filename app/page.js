import RunScraperButton from './components/RunScraperButton'
import styles from './page.module.css'
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

export default function Home( item ) {
  let searchParams = item.searchParams
  if(searchParams.runScraperButton){
    runScraper(searchParams.url); 
  }

  return (
    <main className={styles.main}>
      <RunScraperButton/>
    </main>
  )
}

const runScraper = async (url) => {
  if(url != null){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url)

    scrapeData(page); 
  }
  
}

// const wait = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const scrapeData = async (page) => {
  const $ = cheerio.load(await page.content());

  const priceWhole = $('.a-price-whole:first').text();
  const priceDec = $('.a-price-fraction:first').text(); 
  console.log(priceWhole + priceDec); 
}