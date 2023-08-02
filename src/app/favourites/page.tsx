"use client"

import { EpisodeManager } from "../components/EpisodeManager/EpisodeManager";
import styles from "../page.module.css"
export default function Page() {
    return <div className={styles.main}>
        <EpisodeManager />
    </div>
}