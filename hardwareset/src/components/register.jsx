import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Error: Passwords do not match");
        }
        console.log('Name:', name);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <form onSubmit={handleRegister} style={styles.container}>
            <h2 style={styles.title}>Register</h2>

            <TextField
                label='Full Name'
                style={styles.input}
                variant='outlined'
                id="name"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                placeholder='Joe Biden'
                required
            />

            <TextField
                label='Username'
                style={styles.input}
                variant='outlined'
                id="username"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                placeholder='JoeBiden123'
                minLength={6}
                required
            />

            <TextField
                label='Password'
                style={styles.input}
                type={showPassword ? 'text' : 'password'}
                variant='outlined'
                id="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password123'
                minLength={6}
                required
                InputProps={{
                    inputProps: { minLength: 6 }, 
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                label='Confirm Password'
                style={styles.input}
                type={showConfirmPassword ? 'text' : 'password'}
                variant='outlined'
                id="confirmpassword"
                fullWidth
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='password123'
                minLength={6}
                required
                InputProps={{
                  inputProps: { minLength: 6 }, 
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button type="submit" variant='contained' style={styles.button}>Register</Button>
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

export default Register;
