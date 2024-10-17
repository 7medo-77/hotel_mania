/* Order details page */

import { auth } from '../../../auth';
import Details from '@/components/orderDetails/orderDetails';


export default async function OrderDetails() {
	const session = await auth();
	return(<Details session={session}/>
	)
}
