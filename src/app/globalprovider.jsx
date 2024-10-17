/* Global provider for cart context */
import { CartProvider } from '@/context/cartContext';

export default function GlobalProvider({ children }) {
  return(<CartProvider>{children}</CartProvider>)
}
