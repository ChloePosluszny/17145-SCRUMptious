import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

function JoinProject({username}){
    const[projectID,setProjectID] = useState('');

    const handleSubmit =  async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('/joinProject', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, projectID })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                alert("Not a valid projectid")
                throw new Error("Not valid projectid");
              }
              

        } catch (error) {
            console.error('Join project failed:', error);
        }

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

export default JoinProject;