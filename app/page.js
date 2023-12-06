import styles from './styles.css'
import RunScraperButton from './components/RunScraperButton'
import Navbar from './components/Navbar';
import RunTracker from './components/RunTracker';
import RecentSearches from './components/RecentSearches';
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let recentSearches = {
  // 'https://m.media-amazon.com/images/I/B1a-2NJITxS._SY355_.jpg': {
  //   artist: 'Clairo',
  //   album: 'dairy 001',
  //   price: '19.97'
  // },
  // 'https://m.media-amazon.com/images/I/81yJk22VcSL._SY355_.jpg': {
  //   artist: 'Clairo',
  //   album: 'Fader Label Immunity',
  //   price: '25.99'
  // }
}; 

export default async function Home( props ) {
  
  let searchParams = props.searchParams;
  let inputBoxPos = 'input-box'

  if(searchParams.getRecentSearch){
    inputBoxPos += ' input-box-update';
    let info = recentSearches[searchParams.img]
    return (
      <main>
        <Navbar/>
        <div className='data-division'>
          <RunScraperButton position={inputBoxPos}/>
          <div className='data-content-box'>
            <img src={searchParams.img} alt='albumIMG' className='album-img'/>
            <p className='album-name'>{info.album}</p>
            <p className='artist-name'>{info.artist}</p>
            <p className='album-price'>{info.price}</p>
            <RunTracker/>
          </div>
        </div>
        <RecentSearches data={recentSearches}/>
      </main>
    )
  }else if(searchParams.runScraperButton){
    inputBoxPos += ' input-box-update';
    let info = await runScraper(searchParams.url)
    addRecentSearch(info); 
    return (
      <main>
        <Navbar/>
        <div className='data-division'>
          <RunScraperButton position={inputBoxPos}/>
          <div className='data-content-box'>
            <img src={info.img} alt='albumIMG' className='album-img'/>
            <p className='album-name'>{info.title}</p>
            <p className='artist-name'>{info.artist}</p>
            <p className='album-price'>{info.price}</p>
            <RunTracker/>
          </div>
        </div>
        <RecentSearches data={recentSearches}/>
      </main>
    )
  }else{
    return (
      <main>
        <Navbar/>
        <div className='data-division'>
          <RunScraperButton position={inputBoxPos}/>
        </div>
      </main>
    )
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
  const price = "$" + priceWhole + priceDec; 
  let title = $('.product-title-word-break').text().trim(); 
  const artist = $('.author > a').text(); 
  const imgSrc = $('#landingImage').attr('src'); 
  
  if(title.includes("Explicit Lyrics")){
    title = title.replace('Explicit Lyrics','');
  }
  
  const info = {
    price: price,
    title: title,
    artist: artist,
    img: imgSrc
  }
  return info; 
}

const addRecentSearch = (obj) => {
  let imageSRC = obj.img

  recentSearches[imageSRC] = {
    album: obj.title,
    artist: obj.artist,
    price: obj.price
  }
}