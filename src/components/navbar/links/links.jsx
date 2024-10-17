'use client';

import { useState, useContext, useEffect } from 'react';
import styles from './links.module.css';
import NavLink from './navLink/navLink';
import Image from 'next/image';
import { logOut } from '@/lib/action';
import CartContext from '@/context/cartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const links = [
  { title: 'Home', path: '/' },
  { title: 'Order', path: '/order' },
  { title: 'Contact', path: '/contact' },
];

const auths = [
  { title: 'LogIn', path: '/login' },
  { title: 'Register', path: '/register' },
];

const Links = ({ session }) => {
  const { deleteItemFromCart, addItemToCart, cart } = useContext(CartContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  let admin = false;
  if (session) {
    admin = session.user.admin;
  }

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {session && session.user ? (
          <div className={styles.hello}>Hi There<br />{session.user.firstName} {session.user.lastName}</div>
        ) : (
          <div></div>
        )}
        {links.map(link => (
          <NavLink item={link} key={link.title} />
        ))}
        {session ? (
          <div className={styles.all}>
            {admin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
          </div>
        ) : (
          auths.map(auth => (
            <NavLink item={auth} key={auth.title} />
          ))
        )}
        <div className={styles.all}>
          <div className={styles.cart}>
            <Link href='/cart' className={styles.cart}>
              <Image src='/shopping.png' alt='shopping' width={40} height={40} />
            </Link>
            <span>{cart?.cartItems?.length || 0}</span>
          </div>
          {session && (
            <div className={styles.profileIcon} onClick={() => setProfileOpen(prev => !prev)}>
              <Image src='/icons8-user-100.png' alt='Profile' width={40} height={40} />
              {profileOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href='/myprofile'>
                    <button>
                      <FontAwesomeIcon icon={faCog} className={styles.icon} /> Setting
                    </button>
                  </Link>
                  <hr className={styles.separator} />
                  <Link href='/orderhistory'>
                    <button>
                      <FontAwesomeIcon icon={faHistory} className={styles.icon} /> Order History
                    </button>
                  </Link>
                  <hr className={styles.separator} />
                  <button className={styles.logout} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} /> Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Image className={styles.menuButton} src='/newmenu.png' alt='' height={30} width={30} onClick={() => setOpen(prev => !prev)} />
      {open && (
        <div className={styles.mobileLinks}>
          {session && session.user ? (
            <div className={styles.hello}>Hi There<br />{session.user.firstName} {session.user.lastName}</div>
          ) : (
            <div></div>
          )}
          {links.map(link => (
            <NavLink item={link} key={link.title} />
          ))}
          {session ? (
            <div className={styles.allMobile}>
              <NavLink item={{ title: 'My Profile', path: '/myprofile' }} />
              <NavLink item={{ title: 'Order History', path: '/orderhistory' }} />
              {admin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
            </div>
          ) : (
            auths.map(auth => (
              <NavLink item={auth} key={auth.title} />
            ))
          )}
          <div className={styles.all}>
            <div className={styles.cart}>
              <Link href='/cart' className={styles.cart}>
                <Image src='/shopping.png' alt='shopping' width={40} height={40} />
              </Link>
              <span>{cart?.cartItems?.length || 0}</span>
            </div>
            {session && (
              <button className={styles.logoutM} onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
