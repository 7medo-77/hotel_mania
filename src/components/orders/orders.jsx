'use client';
import styles from './orders.module.css';
import { orderPayment, orderDelivery } from '@/lib/action';
import { useState, useEffect } from 'react';


export default function Orders() {
  const [ordersData, setOrdersData] = useState(null)
  const [ordersIsLoading, setOrdersIsLoading] = useState(true)
  const [usersData, setusersData] = useState(null)
  const [usersIsLoading, setUsersIsLoading] = useState(true)
  useEffect(() => {
    fetch('/api/orders/all')
      .then((res) => res.json())
      .then((data) => {
        setOrdersData(data)
        setOrdersIsLoading(false)
      });
    fetch('/api/users/all')
      .then((res) => res.json())
      .then((data) => {
        setusersData(data)
        setUsersIsLoading(false)
      });
  }, [])
 
  if (ordersIsLoading) return <p>Loading...</p>
  if (!ordersData) return <p>No orders data</p>
  const orders = ordersData.orders;
  if (usersIsLoading) return <p>Loading...</p>
  const users = usersData.users; 
  const deleteOrderHandler = async (id) => {
    await fetch(`/api/orders/${id}`,{ method: 'DELETE'});
    location.reload();
  };
  const updateOrderPayment = (id, paid) => {
    const reversePaid = !paid;
    orderPayment(id, reversePaid);
    location.reload();
  };
  const updateOrderDelivery = (id, delivered) => {
    const reverseDelivered = !delivered;
    orderDelivery(id, reverseDelivered);
    location.reload();
  };
  const userNameGetter = (id) => {
    const user = users.find(
      (user) => user.id === id
    );
    return user.username;
  }
  const userEmailGetter = (id) => {
    const user = users.find(
      (user) => user.id === id
    );
    return user.email;
  }
  const userPhoneNumberGetter = (id) => {
    const user = users.find(
      (user) => user.id === id
    );
    return user.phone_number;
  }
  return(
    <div className={styles.ordersContainer}>
      {orders.map((order) => (
      <div className={styles.orders} key={order.id}>
        <span>Order ID:&nbsp;{order.id}</span>
        <span>User ID:&nbsp;{order.user_id}</span>
        <span>User Name:&nbsp;{userNameGetter(order.user_id)}</span>
        <span>User E-Mail:&nbsp;{userEmailGetter(order.user_id)}</span>
        <span>User Phone Number:&nbsp;{userPhoneNumberGetter(order.user_id)}</span>
        <span>Payment:&nbsp;{order.paid? (<button className={styles.green} onClick={() => updateOrderPayment(order.id, order.paid)}>Paid</button>):(<button className={styles.red} onClick={() => updateOrderPayment(order.id, order.paid)}>Not paid</button>)}</span>
        <span>Delivery:&nbsp;{order.delivered? (<button className={styles.green} onClick={() => updateOrderDelivery(order.id, order.delivered)}>Delivered</button>):(<button className={styles.red} onClick={() => updateOrderDelivery(order.id, order.delivered)}>Not delivered yet</button>)}</span>
        <span>Date of order:</span>{order.order_date}
        <span>Delivery address:&nbsp;{order.delivery_address}</span>
        <span>Order items:</span>
        {(JSON.parse(order.json).cartItems).map((item) => (
					<div key={item.id} className={styles.cartItem}>
						<span>{item.name}&nbsp;&nbsp;</span>
						<span>*&nbsp;{item.quantity}</span>
					</div>
              ))}
        <span>Order total: {(JSON.parse(order.json).cartItems).reduce((acc, item) => acc + item.quantity * item.price, 0)}.L.E </span>
        <button onClick={() => deleteOrderHandler(order.id)} className={styles.deleteButton}>Delete</button>
      </div>
))}</div>);
}
