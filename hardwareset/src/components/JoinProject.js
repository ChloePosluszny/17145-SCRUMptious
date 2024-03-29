import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function JoinProject ({userID}) {
    const[projectID,setProjectID] = useState('');

    const handleSubmit =  async(e) => {
        e.preventDefault();
        fetch('/joinProject', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID, projectID})
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert(data.message);
                return;
            }
            console.log(data);
        });
    }

    return(
        <form onSubmit={handleSubmit} style={styles.container}>
            <h2 style={styles.title}>Join Existing Project</h2>

            <TextField
                label='ProjectID'
                style={styles.input}
                variant='outlined'
                id="ProjectID"
                fullWidth
                placeholder='Enter a project id to join existing project'
                onChange={(e) => setProjectID(e.target.value)}
                required
            />

            <Button type="submit" variant='contained' style={styles.button}>Submit</Button>
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