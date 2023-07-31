"use client"
import styles from './page.module.css'
import { EpisodeManager } from './components/EpisodeManager/EpisodeManager'

export default function Home() {


  return (
    <main className={styles.main}>
      <EpisodeManager />
    </main >
  )
}
