'use client'
import styles from '../styles.css'
import {useRouter} from 'next/navigation'

export default function RecentSearches(props){
  const router = useRouter();
  let recentSearches = props.data; 
  let imageList = []; 

  const handleClick = (img) => {
    console.log("clicked")
    router.refresh(); 
    router.push(`/?getRecentSearch=${true}&img=${encodeURIComponent(img)}`);
  }

  for (const [key, value] of Object.entries(recentSearches)) {
    imageList.push(
      <img src={key} alt='img' className='footer-list-item' onClick={() => handleClick(key)} />
    )
  }
  
  return (
    <div className='footer'>
      <p className='footer-text'>Recent Searches: </p>
      <div className='footer-list'>{...imageList}</div>
    </div>
  )
}