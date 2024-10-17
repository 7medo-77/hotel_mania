'use client';

import styles from './logInForm.module.css';
import { logIn } from '@/lib/action';
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import Link from 'next/link';

export default function LogInForm() {
  const [state, formAction] = useFormState(logIn, undefined);
  const router = useRouter();
  useEffect(() => {
		state?.success && router.push("/");
	  }, [state?.success, router]);

	return (
		<div className={styles['form-container']}>
			<h1>Login</h1>
			<form className={styles.form} action={formAction}>
				<input type="text" placeholder="E-Mail Address or User Name" name="email" required />
				<input type="password" placeholder="Password" name="password" required />
				<p>You don&apos;t have an account? <Link href='/register' className={styles.signup}>Click here to sign up</Link></p>
				{state?.error && <p className={styles.error}>{state?.error}</p>}
				<button type="submit">Log in</button>
			</form>
		</div>
	);
}
