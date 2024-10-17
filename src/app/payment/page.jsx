/* Payment Page */
import { auth } from '../../../auth';
import Payment from '@/components/payment/payment';


export default async function CartPage() {
	const session = await auth();
	if (!session) {
	  redirect('/login');
	}
	return(<Payment session={session}/>
	)
}
