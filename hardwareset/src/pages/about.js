import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import React from 'react'
import backgroundImage from '../assets/cat.gif';

export default function(){
    return (
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.content}>
                    <h2>Project by Rahman,Chloe,Spencer,& Erik.</h2>
                    <img src= {backgroundImage} />
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
