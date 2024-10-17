import React, { useEffect } from 'react';
import styles from './breakfast.module.css';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BreakfastSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,  // Adjust the duration for faster animations (in milliseconds)
            once: true,
        });
    }, []);

    return (
        <div className={styles.container} data-aos="fade-up">
            <div className={styles.textContainer} data-aos="fade-right">
                <h1>Breakfast<br />To-Go</h1>
                <p>No time to linger? That&apos;s fine. We&apos;ve packed you a breakfast fit for kings. Emphasis on &quot;fit.&quot;<br />
                    Check out the ingredients:</p>
                <ul>
                    <li>Slow-roasted oats & grains</li>
                    <li>Vine-ripened grapes & berries</li>
                    <li>Naturally sweetened dried fruit</li>
                    <li>Homemade yogurt</li>
                    <li>Freshly harvested honey</li>
                </ul>
                <Link href="/order">
                    <button className={styles.orderButton}>ORDER NOW !!!</button>
                </Link>
            </div>
            <div className={styles.imageContainer} data-aos="fade-left">
                <img src="/breakfast3.png" alt="Breakfast jars" />
            </div>
        </div>
    );
};
export default BreakfastSection;
