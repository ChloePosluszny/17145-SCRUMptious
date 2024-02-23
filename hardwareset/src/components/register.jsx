import React, { useState } from 'react';

function Register(){
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
          // Here you can implement your login logic
        e.preventDefault();
        if(password != confirmPassword){
          alert("Error: Passwords do not match")
        }
        console.log('Name:', name)
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    return(
        <form onSubmit={handleRegister} style={styles.container}>
            <h2 style={styles.title}>Register</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Joe Biden'required />

            <label htmlFor="username">Username:</label>
            <input type="text" style={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder='JoeBiden123' minLength={6} required />

            <label htmlFor="password">Password:</label>
            <input type="password" style={styles.input}value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder='password123' minLength={6} required />

            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input type="password" style={styles.input}value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmpassword" placeholder='password123' minLength={6} required />
          
            <button type="submit" style={styles.button}>Register</button>
        
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
      borderRadius: '5px',
      border: '1px solid #ccc',
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
  
export default Register