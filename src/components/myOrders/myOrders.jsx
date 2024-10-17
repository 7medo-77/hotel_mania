'use client';
import CartContext from '@/context/cartContext';
import Link from 'next/link';
import styles from './myOrders.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';


export default function MyOrders({ user_id }) {
  const { discardCart, deleteItemFromCart, addItemToCart, cart, updateCart } = useContext(CartContext);
  const router = useRouter();
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch(`/api/orders/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  const myOrders = data.orders;
  console.log(data);
  const retrieveOrder = (order) => {
    discardCart();
    updateCart(JSON.parse(order.json).cartItems);
    if (!order.paid) {
      fetch(`/api/orders/${order.id}`,{ method: 'DELETE'});
    }
    router.push('/cart');
  }
  if (myOrders.length !== 0) {
    return (
      <div className={styles.container}>
        <div className={styles.ordersWrapper}>
          {myOrders.map((order) => (
            <div key={order.id} className={styles.orderContainer}>
              <span className={styles.orderHeader}>Order ID: {order.id}</span>
              <span>Payment:&nbsp;{order.paid? (<span className={styles.green}>Paid</span>):(<span className={styles.red} >Not paid</span>)}</span>
              <span>Delivery:&nbsp;{order.delivered? (<span className={styles.green}>Delivered</span>):(<span className={styles.red} >Not delivered yet</span>)}</span>
              <span>Delivery address:&nbsp;{order.delivery_address}</span>
              <span>Date of order:</span>{order.order_date}
              <button className={styles.button} onClick={() => retrieveOrder(order)}>Retrieve order</button>
              {(JSON.parse(order.json).cartItems).map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Image src={item.photo} alt={item.name} width={200} height={200} className={styles.cartItemImg} />
                  <p className={styles.itemName}>{item.name}</p>
                  <span className={styles.itemPrice}>Price per single order: {item.price} L.E</span>
                  <div className={styles.amount}>
                    <span>{item.quantity}</span>
                  </div>
                  <span className={styles.itemTotal}>Total: {item.price * item.quantity} L.E</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.container} ${styles.empty}`}>
        <Link href='/order' className={styles.redText}><h1>Make your first order from here</h1></Link>
      </div>
    )
  }
}
