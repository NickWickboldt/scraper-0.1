'use server'
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
export default async function DataContent(props){
  let searchParams = props.data
  if(searchParams.runScraperButton){
    let info = await runScraper(searchParams.url)
    console.log(info)
    return (
        <div>
          <h1>{info.artist}</h1>
          <h1>{info.title}</h1>
          <h1>{info.price}</h1>
        </div>
      )
  }else{
    return <h1>no data</h1>
  }
}

const runScraper = async (url) => {
  if(url != null){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    await wait(3000);

    let info = await scrapeData(page)
    return info; 
  }
}

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const scrapeData = async (page) => {
  const $ = cheerio.load(await page.content());

  const priceWhole = $('.a-price-whole:first').text();
  const priceDec = $('.a-price-fraction:first').text(); 
  const price = priceWhole + priceDec; 
  const title = $('.product-title-word-break').text().trim(); 
  const artist = $('.author > a').text(); 
  const info = {
    price: price,
    title: title,
    artist: artist
  }
  return info; 
}