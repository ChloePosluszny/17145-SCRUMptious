import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>17145, Team SCRUMptious</p>
      <p>Copyright © {new Date().getFullYear()} Super Cool Website. All Rights Reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%'
  }
};

export default Footer;
