import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function HardwareSetTile ({hardwareSet, project, updateProject, updateHardwareSet}) {
    const [textFieldQuantity, setTextFieldQuantity] = useState("");
    
    const handleCheckIn = async () => {
        const quantity = parseInt(textFieldQuantity);
        
        if (isNaN(quantity) || quantity === 0) {
            alert("Error: invalid input");
            return;
        }

        fetch('/updateHardwareSet', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({hardwareSetName: hardwareSet.name, projectID: project.projectID, projectCheckedOut: project.hardwareCheckedOut[hardwareSet.index], quantity: quantity})
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert(data.message);
                return;
            }

            const updatedHardwareSet = {...hardwareSet};
            const updatedProject = {...project};
            updatedHardwareSet.available += quantity;
            updatedProject.hardwareCheckedOut[updatedHardwareSet.index] -= quantity;
            updateHardwareSet(updatedHardwareSet);
            updateProject(updatedProject);
        });
    };

    const handleCheckOut = () => {
        const quantity = -1 * parseInt(textFieldQuantity);
        
        if (isNaN(quantity) || quantity === 0) {
            alert("Error: invalid input");
            return;
        }

        fetch('/updateHardwareSet', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({hardwareSetName: hardwareSet.name, projectID: project.projectID, projectCheckedOut: project.hardwareCheckedOut[hardwareSet.index], quantity: quantity})
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert(data.message);
                return;
            }

            const updatedHardwareSet = {...hardwareSet};
            const updatedProject = {...project};
            updatedHardwareSet.available += quantity;
            updatedProject.hardwareCheckedOut[updatedHardwareSet.index] -= quantity;
            updateHardwareSet(updatedHardwareSet);
            updateProject(updatedProject);
        });
    };

    return (
        <>
            <div style={styles.hardwareSetTile}>
                <p style={styles.hardwareSetInfo} >{hardwareSet.name}: {project.hardwareCheckedOut[hardwareSet.index]} checked out</p>
                <TextField id="filled-basic" label="Enter quantity" variant="filled" onChange={(e) => setTextFieldQuantity(e.target.value)} />
                <Button variant="outlined" onClick={handleCheckIn} >Check in</Button>
                <Button variant="outlined" onClick={handleCheckOut} >Check out</Button>
            </div>
        </>
    )
}

const styles = {
    hardwareSetTile: {
        width: '650px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    hardwareSetInfo: {
        width: '170px'
    }
};