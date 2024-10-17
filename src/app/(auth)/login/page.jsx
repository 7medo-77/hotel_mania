import LogInForm from '@/components/logInForm/logInForm';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function LogInPage() {
	const session = await auth();
	if (session) {
		redirect('/');
	}
	return (
		<div>
			<LogInForm />
		</div>
	)
};
