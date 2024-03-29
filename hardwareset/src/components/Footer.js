import React from 'react';

export default function Footer () {
    return (
        <footer style={styles.footer}>
            <p>17145, Team SCRUMptious</p>
            <p>Copyright © {new Date().getFullYear()} Super Cool Website. All Rights Reserved.</p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        textAlign: 'center',
        left: 0,
        bottom: 0,
        width: '100%',
        marginTop:'auto',
        boxSizing: 'border-box', // Include padding in width calculation
    }
};