import styles from './page.module.css'
import RunScraperButton from './components/RunScraperButton'
import DataContent from './components/DataContent';


export default function Home( item ) {
  
  let searchParams = item.searchParams

  return (
    <main className={styles.main}>
      <RunScraperButton/>
      <DataContent data={searchParams}/>
    </main>
  )
}
