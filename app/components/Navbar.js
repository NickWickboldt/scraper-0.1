import styles from '../styles.css'
export default function Navbar(){
  return(
    <div className='navbar-box'>
      <img src='./logo.png' alt='logo' className='nav-logo'/>
      <div className='nav-links-box'>
        <a href='' className='nav-links'>VinylVenue</a>
        <a href='' className='nav-links'>Collection</a>
      </div>
    </div>
  )
}