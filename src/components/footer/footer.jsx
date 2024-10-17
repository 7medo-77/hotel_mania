import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <h1>SNACKY</h1>
      </div>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>GET IN TOUCH</h2>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>LinkedIn</p>
        </div>
        <div className={styles.section}>
          <h2>Contributors</h2>
          <p>Ahmed Ramzy</p>
          <p>Mahmoud Metwalli</p>
          <p>Youssef Hassane</p>
          <p>Ahmed Abdelhameed</p>
        </div>
        <div className={styles.section}>
          <h2>LOCATION</h2>
          <p>Egypt, Cairo</p>
        </div>
      </div>
      <div className={styles.reserved}>
        <p>All rights are reserved by Snacky Corp</p>
      </div>
    </div>
  );
}

export default Footer;
