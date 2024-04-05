export default function ProjectTile ({children, project}) {
    return (
        <>
            <div style={styles.projectTile}>
                <p style={styles.projectName}>{project.name}</p>
                <p style={styles.projectUsers}>{project.users.slice(0, project.users.length - 1).map(user => <>{user}, </>)}{project.users[project.users.length - 1]}</p>
                <div style={styles.hardwareSetTilesContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}

const styles = {
    projectTile: {
        border: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundColor: 'lightgray',
        
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        borderRadius: '8px', 
    },

    hardwareSetTilesContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    projectName: {
        margin: '5px'
    },

    projectUsers: {
        margin: '5px'
    }
};