/* Not found Page */
import Link from "next/link";
import styles from './notFound.module.css'

const NotFoundPage = () => {
	return (
	  <div className={styles.container}>
		<h2>Ops not found</h2>
	    <p>This page doesn&apos;t exits</p>
		<Link href='/'>Return Home</Link>
	  </div>
  );
};

export default NotFoundPage;
