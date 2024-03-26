import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ProjectsPage from '../components/ProjectsPage.js'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function(){
    const navigate = useNavigate();
    const [login, setLogin] = useState({isLoggedIn: false, username: ''});
    
    useEffect(() => {
        const storedLogin = JSON.parse(localStorage.getItem('login'));
        if (storedLogin && storedLogin.isLoggedIn) {
            setLogin(storedLogin);
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        (async () => {
            if (login.isLoggedIn) {
                try {
                    const response = await fetch('/fetchProjects', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(login.username)
                    });
                    const responseData = await response.json();
                    console.log(responseData);
                } catch (error) {
                    console.error('fetching projects failed:', error);
                }
            }
        })();
    }, [login]);

    return(
    <>
        <Header />
        <div style={styles.container}>
            <div style={styles.content}>
                <ProjectsPage />
            </div>
            <Footer />
        </div>
    </>
    )
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