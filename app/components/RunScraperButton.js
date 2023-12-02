"use client";
import { useState } from 'react';
import {useRouter} from 'next/navigation'

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
    <div>
      <input
        placeholder="URL"
        value={url}
        onChange={handleInputChange}
      />
      <button onClick={handleClick}>Run Scraper</button>
    </div>
  );
};

export default RunScraperButton;
