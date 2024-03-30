import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ProjectsPage from '../components/ProjectsPage.js'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProjectPage () {
    const [projects, setProjects] = useState([]);
    const [hardwareSets, setHardwareSets] = useState([]);
    const navigate = useNavigate();
    const [login, setLogin] = useState({isLoggedIn: false, userID: ''});

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
                fetch('/fetchProjects', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userID: login.userID})
                }).then(response => response.json()).then(data => {
                    if (!data.success) {
                        alert(data.message);
                        navigate('/createOrJoin')
                        return;
                    }
                    setProjects(data.projects);
                });
                fetch('/fetchHardwareSets', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'}
                }).then(response => response.json()).then(data => {
                    if (!data.success) {
                        alert(data.message);
                        return;
                    }
                    setHardwareSets(data.hardwareSets);
                });
            }
        })();
    }, [login]);

    const updateHardwareSet = (updatedHardwareSet) => {
        const updatedHardwareSets = [...hardwareSets];
        updatedHardwareSets[updatedHardwareSet.index] = updatedHardwareSet;
        setHardwareSets(updatedHardwareSets);
    };

    const updateProject = (updatedProject) => {
        const updatedProjects = [...projects];
        updatedProjects[updatedProject.index] = updatedProject;
        setProjects(updatedProjects);
    };

    return(
    <>
        <Header />
        <div style={styles.container}>
            <div style={styles.content}>
                <ProjectsPage hardwareSets={hardwareSets} updateHardwareSet={updateHardwareSet} projects={projects} updateProject={updateProject} />
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