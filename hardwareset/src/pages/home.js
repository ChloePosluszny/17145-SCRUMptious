import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Login from '../components/Login.js';

export default function HomePage() {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.content}>
          <h2>Please log in to view the status of your hardware.</h2>
          <Login />
        </div>
        <Footer />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
    overflowX: 'hidden', // Prevent horizontal scrolling
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '80px', // Adjust as needed
  },
};
