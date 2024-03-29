import { useEffect, useState } from "react";
import HardwareSetTile from "./HardwareSetTile";
import ProjectTile from "./ProjectTile";
import HardwareSetDisplay from "./HardwareSetDisplay";
import { useNavigate } from "react-router-dom";

export default function ProjectsPage ({hardwareSets, updateHardwareSet}) {
    /*const [hardwareSets, setHardwareSets] = useState([
        {name: "HW1", index: 0, capacity: 100, available: 100},
        {name: "HW2", index: 1, capacity: 200, available: 200}
    ]);*/
    const users = ["User1", "User2", "User3"];
    const [projects, setProjects] = useState([
        {name: "Project 1", index: 0, users: [users[0], users[1]], hardwareCheckedOut: [0, 0]},
        {name: "Project 2", index: 1, users: [users[1], users[2]], hardwareCheckedOut: [0, 0]},
        {name: "Project 3", index: 2, users: [users[0], users[2]], hardwareCheckedOut: [0, 0]}
    ]);
    //const [projects, setProjects] = useState([]);
    //const [hardwareSets, setHardwareSets] = useState([]);

    const updateProject = (updatedProject) => {
        const updatedProjects = [...projects];
        updatedProjects[updatedProject.index] = updatedProject;
        setProjects(updatedProjects);
    };
    
    return (
        <>
            <div style={styles.projectsPage}>
                <h1>Projects</h1>
                <div style={styles.hardwareSetDisplaysContainer}>
                    {hardwareSets.map(hardwareSet => <HardwareSetDisplay hardwareSet={hardwareSet} />)}
                </div>
                <div style={styles.projectTilesContainer}>
                    {projects.map(project => 
                    <ProjectTile project={project} >
                        {hardwareSets.map(hardwareSet => 
                        <HardwareSetTile hardwareSet={hardwareSet} project={project} updateProject={updateProject} updateHardwareSet={updateHardwareSet} />)}
                    </ProjectTile>)}
                </div>
            </div>
        </>
    );
}

const styles = {
    projectsPage: {
        border: '1px',
        borderStyle: 'dashed',
        borderColor: 'black',
        padding: '10px',
        margin: '10px'
    },

    hardwareSetDisplaysContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    hardwareSetControlsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    projectTilesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
};