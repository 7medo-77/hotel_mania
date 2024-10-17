/* Cart Page */
import Cart from '@/components/cart/cart';
import { auth } from '../../../auth';


export default async function CartPage() {
	const session = await auth();
	return(<Cart session={session}/>
	)
}
