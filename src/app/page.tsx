"use client"
import styles from './page.module.css'
import { EpisodeManager } from './components/EpisodeManager/EpisodeManager'
import { BrowserRouter } from 'react-router-dom'

export default function Home() {


  return (
    <main className={styles.main}>
      <BrowserRouter>
        <EpisodeManager />
      </BrowserRouter>
    </main >
  )
}
