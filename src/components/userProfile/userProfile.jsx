'use client';

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { updateAddress, updatePhoneNumber } from '@/lib/action';
import styles from './userProfile.module.css';



export default function UserProfile({ session }) {
	const [phoneState, phoneFormAction] = useFormState(updatePhoneNumber, undefined);
	const [addressState, addressFormAction] = useFormState(updateAddress, undefined);
	const router = useRouter();
	useEffect(() => {
		phoneState?.success && router.refresh();
	  }, [phoneState?.success, router]);
	useEffect(() => {
		addressState?.success && router.refresh();
	  }, [addressState?.success, router]);
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<div className={styles.photo}>
					<img src={session.user.photo || '/User1.png'} alt="User Photo" className={styles.avatar} />
					<form className={styles.uploadForm}>
						<label htmlFor="file-upload" className={styles.uploadLabel}>Upload Photo</label>
						<input id="file-upload" type="file" accept="image/*" className={styles.fileInput} />
					</form>
				</div>
				<div className={styles.info}>
					<div><strong>User Name:</strong> {session.user.username}</div>
					<div><strong>User Email Address:</strong> {session.user.email}</div>

					<div><strong>First Name:</strong> {session.user.firstName}</div>
					<div><strong>Last Name:</strong> {session.user.lastName}</div>
					<div className={styles.updateField}>
						<strong>Phone Number:</strong>
						<form className={styles.updateForm} action={phoneFormAction}>
							<input value={session.user.id} name="id" className={styles.hidden}></input>
							<input type="text" placeholder={session.user.phone_number || 'Update phone number'} name="phoneNumber" />
							<button type="submit" className={styles.updateButton}>Update</button>
						</form>
						{phoneState?.error && <p className={styles.error}>{phoneState?.error}</p>}
						{phoneState?.success && <p className={styles.success}>{phoneState?.success}</p>}
					</div>
					<div className={styles.updateField}>
						<strong>Address:</strong>
						<form className={styles.updateForm} action={addressFormAction}>
							<input value={session.user.id} name="id" className={styles.hidden}></input>
							<input type="text" placeholder={session.user.address || 'Update address'} name="address" />
							<button type="submit" className={styles.updateButton}>Update</button>
						</form>
						{addressState?.error && <p className={styles.error}>{addressState?.error}</p>}
						{addressState?.success && <p className={styles.success}>{addressState?.success}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
