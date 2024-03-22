import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import CreateProject from '../components/createProject.jsx';
import JoinProject from '../components/joinProject.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function() {
    const [login, setLogin] = useState({isLoggedIn: false, username: '', password: ''});
    const navigate = useNavigate();

    useEffect(() => {
        const storedLogin = JSON.parse(localStorage.getItem('login'));
        console.log(storedLogin);
        if (storedLogin.isLoggedIn) {
            setLogin(storedLogin);
            console.log(login);
        } else {
            navigate('/'); // Redirect to login page if not logged in
        }
    }, []);

    return(
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.content}>  
                    <div style={styles.projectContainer}>
                        <CreateProject/>
                        <JoinProject/>
                    </div>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '80px', // Adjust as needed
    },
    projectContainer: {
        display: 'flex',
        justifyContent: 'space-around', // Change this to adjust the space between the two components
        width: '100%', // Ensures the components take full width
        maxWidth: '800px', // Adjust the max-width as needed
    },
};
