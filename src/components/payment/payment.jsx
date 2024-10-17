"use client";

import React, { useContext } from 'react';
import styles from './payment.module.css';
import CartContext from '@/context/cartContext';
import { useRouter } from 'next/navigation';

export default function Payment({ session }){
  const { discardCart, deleteItemFromCart, addItemToCart, cart, address, setAddress,} = useContext(CartContext);
  const router = useRouter();
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
        paid: true
         })
      });
		discardCart();
    router.push('/orderhistory');
    router.refresh();
	};
  return (
    <div className={styles.container}>
      {cart?.cartItems?.length > 0 ?
      (<div>
      <h1 className={styles.title}>Payment Page</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nameOnCard">Name on Card</label>
          <input type="text" id="nameOnCard" name="nameOnCard" required />
        </div>
        <button className={styles.submitButton} onClick={() => saveOrderHandler(session.user.id, address, cart)}>Submit Payment</button>
      </form>
    </div>) : (<div className={styles.emptyContainer}><h4>Your cart is empty, Happy ordering !!</h4></div>)}
    </div>
  );
};
