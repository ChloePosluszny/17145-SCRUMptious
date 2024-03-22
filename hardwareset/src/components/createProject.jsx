import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

function CreateProject({username}){
    const[name,setName] = useState('');
    const[description,setDescription] = useState('');
    const[projectID,setProjectID] = useState('')

    const handleSubmit =  async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('/createProject', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, name, description, projectID })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                alert("ProjectID already exist please enter a differnet one")
                throw new Error("ProjectID already exists");
              }
              

        } catch (error) {
            console.error('create project failed:', error);
        }

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
                onChange={(e) => setName(e.target.value)}
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

export default CreateProject;