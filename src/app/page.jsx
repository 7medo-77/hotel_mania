/* Home Page */
"use client";
import styles from './home.module.css';
import BreakfastSection from '../components/home/breakfast'; // Step 3: Import the BreakfastSection component
import React, { useRef } from 'react';
import Link from 'next/link'; // Step 1: Import Link from next/link

const Home = () => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* hero */}
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Feeling Snacky?</h1>
          <p className={styles.desc}>Healthy snacks for a healthy life.</p>
          <div className={styles.buttons}>
            <Link href="/order"> {/* Step 2: Wrap the button with Link and set href */}
              <button className={styles.button_1}>Order Now</button>
            </Link>
            <button onClick={scrollToSection} className={styles.button_2}>Learn More</button>
          </div>
        </div>
      </div>

      {/* breakfast */}
      <BreakfastSection/>

      {/* about us */}
      <div ref={sectionRef} className={styles.container_1}>
        <h1 className={styles.title_1}>About Us</h1>
        <p className={styles.description}>
          Welcome to Snacky, your number one source for all Healthy food. We&apos;re dedicated to giving you the very best of Healthy food (snacks), with a focus on quality, freshness, and customer service.
        </p>
        <p className={styles.description}>
          Founded in 2023, Snacky has come a long way from its beginnings. When we first started out, our passion for healthy and delicious snacks drove us to do tons of research so that Snacky can offer you the world&apos;s most advanced snacking options. We now serve customers all over the country and are thrilled that we&apos;re able to turn our passion into our own website.
        </p>
        <p className={styles.description}>
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don&apos;t hesitate to contact us.
        </p>
        <p className={styles.signature}>
          Sincerely,<br />
          Snacky Team
        </p>
      </div>
    </>
  );
};

export default Home;
