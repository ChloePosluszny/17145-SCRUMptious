import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
  return(
    <header style={styles.header}>
      <h1> SCRUMtious Website </h1>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to ="/">Home</Link></li>
          <li style={styles.navItem}><Link to ="/about">About</Link></li>
          <li style={styles.navItem}><Link to ="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    listStyleType: 'none', // Removes bullet points
    display: 'flex', // Display list items horizontally
    margin: 0, // Remove default margin
    padding: 0, // Remove default padding
  },
  navItem: {
    marginRight: '10px', // Add some space between list items
    marginLeft: '10px'
  }
}

export default Header;
