"use client";
import Image from 'next/image';
import styles from './cart.module.css';
import { useContext } from 'react';
import CartContext from '@/context/cartContext';
import Link from 'next/link';
import { addOrder } from '@/lib/action';
import { useRouter } from 'next/navigation';


export default function Cart({ session }) {
	const { discardCart, deleteItemFromCart, addItemToCart, cart } = useContext(CartContext);

	const router = useRouter();
	const increaseQty = (cartItem) => {
		const newQty = cartItem.quantity + 1;
		if (newQty > Number(cartItem.stock)) return;
		addItemToCart({ ...cartItem, quantity: newQty });
	};

	const decreaseQty = (cartItem) => {
		const newQty = cartItem.quantity - 1;
		if (newQty <= 0) return;
		addItemToCart({ ...cartItem, quantity: newQty });
	};
	const proceedHandler = () => {
		router.push('/orderdetails');
	};
	const totalAmount = cart?.cartItems?.reduce((acc, item) => acc + item.quantity * item.price, 0);
	if (session) {
	return (
		<div className={styles.container}>
			<div className={styles.cart}>
				{cart?.cartItems?.map((item) => (
					<div key={item.id} className={styles.cartItem}>
						<Image src={item.photo} alt={item.name} width={200} height={200} />
						<p>{item.name}</p>
						<span>Price per single order: {item.price} L.E</span>
						<div className={styles.amount}>
							<button onClick={() => decreaseQty(item)}>-</button>
							<span>{item.quantity}</span>
							<button onClick={() => increaseQty(item)}>+</button>
						</div>
						<span>Total: {item.price * item.quantity} L.E</span>
						<button className={styles.removeButton} onClick={() => deleteItemFromCart(item.id)}>Remove</button>
					</div>
				))}
			</div>
			<div className={styles.total}>
				<h1>Total Amount: {totalAmount || 0} .L.E</h1>
				{cart?.cartItems?.length > 0 ? (<div className={styles.purchase}>
					<button className={styles.payButton} onClick={() => proceedHandler()}>Proceed</button>
					<button className={styles.discardButton} onClick={() => discardCart()}>Discard Cart</button>
				</div>) : (<div className={styles.empty}>Please add items to display cart</div>)}
			</div>
		</div>
	);
} else {
	return(
		<div className={styles.signIncontainer}>
			<h1>You need to sign in before accessing cart content</h1>
			<Link href='/login' className={styles.redText}>
				<button className={styles.b1}>Sign In</button>
			</Link>
		</div>
	);
}
}
