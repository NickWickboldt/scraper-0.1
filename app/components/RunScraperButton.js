"use client";
import { useState } from 'react';
import {useRouter} from 'next/navigation'
import styles from '../styles.css'

const RunScraperButton = (props) => {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const handleClick = () => {
    router.refresh(); 
    router.push(`/?runScraperButton=${true}&url=${encodeURIComponent(url)}`);
    setUrl(''); 
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className={props.position}>
      <p className='input-box-title'>Scraping the web, not records...</p>
      <p className='input-box-text'>Paste amazon product link, get results.</p>
      <input
        placeholder="URL"
        value={url}
        onChange={handleInputChange}
        className='user-entry'
      />
      <button onClick={handleClick} className='entry-button'>Run Scraper</button>
    </div>
  );
};

export default RunScraperButton;
