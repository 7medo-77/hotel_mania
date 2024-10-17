'use client';

import styles from './registerForm.module.css';
import { register } from '@/lib/action';
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
	const [state, formAction] = useFormState(register, undefined);
	const router = useRouter();

	useEffect(() => {
		if (state?.success) {
			router.push("/login");
		}
	}, [state?.success, router]);

	return (
		<div className={styles['form-container']}>
			<h1>Register</h1>
			<form className={styles.form} action={formAction}>
				<div className={styles['name-fields']}>
					<input type="text" placeholder="First Name" name="firstName" required />
					<input type="text" placeholder="Last Name" name="lastName" required />
				</div>
				<input type="text" placeholder="User Name" name="userName" required />
				<input type="email" placeholder="E-Mail Address" name="email" required />
				<input type="tel" placeholder="Phone Number" name="phoneNumber" required />
				<input type="text" placeholder="Address" name="address" required />
				<input type="password" placeholder="Password" name="passWord" required />
				<input type="password" placeholder="Retype Password" name="rePassWord" required />
				<p>Already have an account? <Link href='/login' className={styles.signin}>Click here to sign in</Link></p>
				{state?.error && <p className={styles.error}>{state?.error}</p>}
				<button type="submit">Register</button>
			</form>
		</div>
	);
}