import React from 'react';
import Link from 'next/link';
import styles from "./page.module.css"

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js</h1>
      <p className={styles.description}>This is the home page.</p>

        <Link href="/Pagination">
        <div className={styles.link}>Pagination</div>
        </Link>
        <br/>
        <Link href="/Scroll">
          <div className={styles.link}>Scroll</div>
        </Link>
      </div>
  );
}

export default Home;
