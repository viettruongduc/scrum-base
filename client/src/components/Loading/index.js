import React from "react"
import styles from './style.module.scss'

export default function Loading() {
  return (
    <div className="spinner-container">
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  );
}