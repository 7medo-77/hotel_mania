/* Order Histroy Page */
import MyOrdersGetter from '@/components/myOrdersGetter/myOrdersGetter';
import { redirect } from 'next/navigation';
import { auth } from '../../../auth';

export default async function OrderHistory() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	return (
	  <MyOrdersGetter/>
  );
}
