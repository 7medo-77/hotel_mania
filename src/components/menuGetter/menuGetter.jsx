
import { getMenu } from '@/lib/action';
import Order from '../order/order';
export default async function MenuGetter() {
  const menu = await getMenu();
  return(<Order menu={menu}/>
  )
}
