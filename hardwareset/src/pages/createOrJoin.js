import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import CreateProject from '../components/CreateProject.js';
import JoinProject from '../components/JoinProject.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function() {
    const [login, setLogin] = useState({isLoggedIn: false, username: ''});
    const navigate = useNavigate();
    useEffect(() => {
        const storedLogin = JSON.parse(localStorage.getItem('login'));
        if (storedLogin) {
            setLogin(storedLogin);
            if (!storedLogin.isLoggedIn) {
                navigate('/');
            }
        }
    }, []);

    return(
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.content}>  
                    <div style={styles.projectContainer}>
                        <CreateProject username={login.username} />
                        <JoinProject username={login.username} />
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
