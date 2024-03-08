import { useState } from "react";
import HardwareSetTile from "./HardwareSetTile";
import ProjectTile from "./ProjectTile";
import HardwareSetDisplay from "./HardwareSetDisplay";
import HardwareSetControls from "./HardwareSetControls";

export default function ProjectsPage () {
    const [hardwareSets, setHardwareSets] = useState([
        {name: "HW1", capacity: 100, available: 100},
        {name: "HW2", capacity: 200, available: 200}
    ]);

    const users = ["User1", "User2", "User3"];

    const [projects, setProjects] = useState([
        {name: "Project 1", users: [users[0], users[1]], hardwareSetsCheckedOut: [0, 0]},
        {name: "Project 2", users: [users[1], users[2]], hardwareSetsCheckedOut: [0, 0]},
        {name: "Project 3", users: [users[0], users[2]], hardwareSetsCheckedOut: [0, 0]}
    ]);

    const updateHardwareSet = (updatedHardwareSet) => {
        const updatedHardwareSets = [...hardwareSets];
        for (let i = 0; i < hardwareSets.length; i++) {
            console.log(updatedHardwareSet.name + " " + hardwareSets[i].name);
            if (updatedHardwareSet.name === hardwareSets[i].name) {
                updatedHardwareSets[i] = updatedHardwareSet;
            }
        }
        console.log(JSON.stringify(updatedHardwareSets));
        setHardwareSets(updatedHardwareSets);
    };

    const updateProject = (updatedProject) => {
        const updatedProjects = [...projects];
        for (let i = 0; i < projects.length; i++) {
            console.log(updatedProject.name + " " + projects[i].name);
            if (updatedProject.name === projects[i].name) {
                updatedProjects[i] = updatedProject;
            }
        }
        console.log(JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
    };
    
    return (
        <>
            <div style={styles.projectsPage}>
                <h1>Projects</h1>
                <div style={styles.hardwareSetDisplaysContainer}>
                    <HardwareSetDisplay hardwareSet={hardwareSets[0]} />
                    <HardwareSetDisplay hardwareSet={hardwareSets[1]} />
                </div>
                <div style={styles.hardwareSetControlsContainer}>
                    <HardwareSetControls projects={projects} hardwareSets={hardwareSets} updateProject={updateProject} updateHardwareSet={updateHardwareSet} />
                </div>
                <div style={styles.projectTilesContainer}>
                    <ProjectTile project={projects[0]} >
                        <HardwareSetTile hardwareSet={hardwareSets[0]} checkedOut={projects[0].hardwareSetsCheckedOut[0]} />
                        <HardwareSetTile hardwareSet={hardwareSets[1]} checkedOut={projects[0].hardwareSetsCheckedOut[1]} />
                    </ProjectTile>
                    <ProjectTile project={projects[1]} >
                        <HardwareSetTile hardwareSet={hardwareSets[0]} checkedOut={projects[1].hardwareSetsCheckedOut[0]} />
                        <HardwareSetTile hardwareSet={hardwareSets[1]} checkedOut={projects[1].hardwareSetsCheckedOut[1]} />
                    </ProjectTile>
                    <ProjectTile project={projects[2]} >
                        <HardwareSetTile hardwareSet={hardwareSets[0]} checkedOut={projects[2].hardwareSetsCheckedOut[0]} />
                        <HardwareSetTile hardwareSet={hardwareSets[1]} checkedOut={projects[2].hardwareSetsCheckedOut[1]} />
                    </ProjectTile>
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