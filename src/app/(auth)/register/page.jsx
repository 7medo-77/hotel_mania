import RegisterForm from '@/components/registerForm/registerForm';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
	const session = await auth();
	if (session) {
		redirect('/');
	}
	return (
		<div>
			<RegisterForm />
		</div>
	)
};
