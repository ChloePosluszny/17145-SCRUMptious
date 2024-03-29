import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Register from '../components/Register.js';

export default function RegisterPage () {
    return (
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.content}>
                    <h2>Please log in to view the status of your hardware.</h2>
                    <Register/>
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