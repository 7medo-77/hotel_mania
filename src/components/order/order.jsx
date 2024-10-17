"use client";
import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import SearchBar from '@/components/search/search';
import styles from './order.module.css';
import { useContext } from 'react';
import CartContext from '@/context/cartContext';
import Link from 'next/link';

export default function Order({ menu }) {
	const products = menu;
    const { deleteItemFromCart, addItemToCart, cart } = useContext(CartContext);
	const addItemToCartHandler = (item) => {
		addItemToCart({
			id: item.id,
			name: item.name,
			info: item.info,
			price: item.price,
			photo: item.photo,
	});
	}
	const isItemExist = (item) => {
		return cart?.cartItems?.find((i) => i.id === item.id)};
	// Search bar
	const [searchTerm, setSearchTerm] = useState('');
	// Filter products based on search term
	const filteredProducts = Object.values(products).filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<>
			<div>
				<SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			</div>
			<div className={styles.container}>
				{filteredProducts.map((item, index) => (
					<div key={index} className={styles.product}>
						<div className={styles.Image}>
							<Image src={item.photo} alt={item.name} width={200} height={200} />
						</div>
						<div className={styles.info}>
							<h2 className={styles.name}>{item.name}</h2>
							<p className={styles.text}>{item.info}</p>
							<p>Price: {item.price} L.E.</p>
						</div>
						<div className={styles.cartContainer}>
						<div className={styles.cart}>
        <Link  href='/cart' className={styles.cart}><Image src='/shopping.png' alt='shopping' width={30} height={30} />
         </Link>
         <span>{cart?.cartItems?.length || 0}</span>
        </div>
		{isItemExist(item)? (<div><button className={styles.removeButton} onClick={() => deleteItemFromCart(item.id)}>Remove from cart</button></div>):(<div><button className={styles.button} onClick={() => addItemToCartHandler(item)}>Add to cart</button></div>)}
		
		</div>
					</div>
				))}
			</div>
		</>
	);
}
