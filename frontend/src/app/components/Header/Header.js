import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/home">
                        <span className={styles.logoText}>Apollo</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="/home" className={styles.navLink}>
                                Home
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/admin/add-doctor" className={styles.navLink}>
                                Add Doctors
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 