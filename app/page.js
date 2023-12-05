import styles from './page.module.css'
import RunScraperButton from './components/RunScraperButton'
import DataContent from './components/DataContent';
import Navbar from './components/Navbar';

export default function Home( item ) {
  
  let searchParams = item.searchParams;

  return (
    <main className={styles.main}>
      <Navbar/>
      <RunScraperButton/>
      <DataContent data={searchParams}/>
    </main>
  )
}
