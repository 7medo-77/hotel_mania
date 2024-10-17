import { getMyOrders } from '@/lib/action';
import MyOrders from '../myOrders/myOrders';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';


export default async function MyOrdersGetter() {
  const session = await auth();
  if (!session) {
		redirect('/login');
	}
  return(<MyOrders user_id={session.user.id}>
  </MyOrders>)
}
