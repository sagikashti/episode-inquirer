"use client"
import styles from './page.module.css'
import { EpisodeManager } from './components/EpisodeManager/EpisodeManager'

export default function Home() {


  return (
    <div className={styles.main}>
      <EpisodeManager />
    </div>
  )
}
