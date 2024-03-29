import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState({ isLoggedIn: false, userID: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedLogin = JSON.parse(localStorage.getItem('login'));
        if (storedLogin) {
            setLogin(storedLogin);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('login', JSON.stringify(login));
        if (login.isLoggedIn) {
            navigate('/projects');
        }
    }, [login]);

    const handleLogin = async (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID, password }),
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert(data.message);
                setLogin({ isLoggedIn: false, userID: userID });
                return;
            }
            setLogin({ isLoggedIn: true, userID: userID });
        });
    };

    return (
        <form onSubmit={handleLogin} style={styles.container}>
            <h2 style={styles.title}>Login</h2>

            <TextField
                label="UserID"
                style={styles.input}
                variant="outlined"
                id="userID"
                value={userID}
                fullWidth
                onChange={(e) => setUserID(e.target.value)}
                placeholder="JoeBiden123"
                minLength={6}
                required
            />

            <TextField
                label="Password"
                type="password"
                style={styles.input}
                variant="outlined"
                id="Password"
                value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password123"
                minLength={6}
                required
            />
            <Button type="submit" variant="contained" style={styles.button}>
                Login
            </Button>
        </form>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '300px',
        margin: '0 auto',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
};