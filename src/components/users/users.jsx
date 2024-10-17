'use client';
import styles from './users.module.css';
import { useState, useEffect } from 'react';



export default function Users() {
  const deleteUserHandler = async (id) => {
    await fetch(`/api/users/${id}`,{ method: 'DELETE'});
    location.reload();
  };
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/users/all')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  const users = data.users;
  return(<div className={styles.usersContainer}>{users.map((user) => (
    <div className={styles.users} key={user.username}>
      <span>ID:&nbsp;{user.id}</span>
      <span>User Name:&nbsp;{user.username}</span>
      <span>E-Mail:&nbsp;{user.email}</span>
      <span>First Name:&nbsp;{user.first_name}</span>
      <span>Last Name:&nbsp;{user.last_name}</span>
      <span>Phone Number:&nbsp;{user.phone_number}</span>
      <span>Address:&nbsp;{user.address}</span>
    {!user.admin && <button onClick={() => deleteUserHandler(user.id)} className={styles.deleteButton}>Delete</button>}
    </div>
))}</div>);
}
