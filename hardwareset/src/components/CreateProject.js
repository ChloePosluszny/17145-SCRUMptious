import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CreateProject({userID}){
    const[projectName, setProjectName] = useState('');
    const[description, setDescription] = useState('');
    const[projectID,setProjectID] = useState('')

    const handleSubmit =  async(e) => {
        e.preventDefault();
        fetch('/createProject', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({projectName, projectID, description, userID})
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert(data.message);
                return;
            }
            alert(data.message);
            console.log(data);
        });
    }

    return(
        <form onSubmit={handleSubmit} style={styles.container}>
            <h2 style={styles.title}>Create New Project</h2>
            <TextField
                label='Project Name'
                style={styles.input}
                variant='outlined'
                id="name"
                fullWidth
                onChange={(e) => setProjectName(e.target.value)}
                placeholder='Name of your project'
                required
            />

            <TextField
                label='Description'
                style={styles.input}
                variant='outlined'
                id="description"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Describe you project'
                required
            />

            <TextField
                label='ProjectID'
                style={styles.input}
                variant='outlined'
                id="ProjectID"
                fullWidth
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