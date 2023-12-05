"use client";
import { useState } from 'react';
import {useRouter} from 'next/navigation'
import styles from './styles.css'

const RunScraperButton = () => {
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
    <div className='input-box'>
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
