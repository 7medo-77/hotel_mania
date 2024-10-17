"use client";
import Image from 'next/image';
import styles from './orderDetails.module.css';
import { useContext, useState } from 'react';
import CartContext from '@/context/cartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Details({ session }) {
	const { discardCart, deleteItemFromCart, addItemToCart, cart, address, setAddress } = useContext(CartContext);
	const router = useRouter();
	const proceedToPayment = () => {
		router.push('/payment');
	  }
	const backToCart = () => {
	  router.push('/cart');
	}
	const saveOrderHandler = async (userId, address, cart) => {
	  let deliveryAddress = address;
	  if (deliveryAddress === '') {
		  deliveryAddress = session.user.address;
	  }
	  await fetch('/api/orders/new', {
		method: "POST",
		header: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			userId: userId,
			deliveryAddress: deliveryAddress,
			cart: cart,
			paid: false
			 })
	  });
	  discardCart();
	  location.reload();
	};
	const totalAmount = cart?.cartItems?.reduce((acc, item) => acc + item.quantity * item.price, 0);
	if (session) {
	return (
		<div className={styles.container}>
			<div className={styles.cart}>
				<h2>Order details:</h2>
				{cart?.cartItems?.map((item) => (
					<div key={item.id} className={styles.cartItem}>
						<p>{item.name}</p>
						<span>{item.quantity} * {item.price} L.E</span>
						<span>Total: {item.price * item.quantity} L.E</span>
					</div>
				))}
			</div>
			<h3>Total Amount: {totalAmount || 0} .L.E</h3>
			<div className={styles.total}>
				{cart?.cartItems?.length > 0 ? (<div className={styles.purchase}>
					<br></br>
					<br></br>
					<div className={styles.updateField}>
					<form className={styles.updateForm} action="">
						<div>
					<strong>Want to change delivery address?: </strong>
						<input value={session.user.id} name="userId" className={styles.hidden} />
						<input value={cart} name="cart" className={styles.hidden} />
						<input type="text" placeholder={session.user.address} value={address} onChange={e => { setAddress(e.currentTarget.value); }}/>
						</div>
						<br></br>
						<button className={styles.saveButton} onClick={() => saveOrderHandler(session.user.id, address, cart)}>Save order without confirmation</button>
						</form>
						</div>
					<button className={styles.payButton} onClick={() => proceedToPayment()}>Proceed to payment</button>
					</div>) : (<div className={styles.empty}>Please add items</div>)}
					<br></br>
					<button className={styles.discardButton} onClick={() => backToCart()}>Go back to cart</button>
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
