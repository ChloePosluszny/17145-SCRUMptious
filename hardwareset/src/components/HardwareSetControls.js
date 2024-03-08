import { Button, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export default function HardwareSetControls ({projects, hardwareSets, updateProject, updateHardwareSet}) {
    const [projectSelection, setProjectSelection] = useState(projects[0]);
    const [hardwareSetSelection, setHardwareSetSelection] = useState(hardwareSets[0]);
    const [textFieldQuantity, setTextFieldQuantity] = useState("");
    const [inOutSelection, setInOutSelection] = useState("in");

    const handleCheckIn = () => {
        const quantity = parseInt(textFieldQuantity);
        const updatedHardwareSet = {...hardwareSetSelection};
        const updatedProject = {...projectSelection};
        updatedHardwareSet.available += quantity;
        for (let i = 0; i < hardwareSets.length; i++) {
            if (updatedHardwareSet.name === hardwareSets[i].name) {
                updatedProject.hardwareSetsCheckedOut[i] -= quantity;
            }
        }
        if (isNaN(quantity)) {
            alert("Error: invalid input");
            return;
        } else if (updatedHardwareSet.available > updatedHardwareSet.capacity) {
            alert("Error: trying to check in too many items");
            return;
        }
        updateHardwareSet(updatedHardwareSet);
        updateProject(updatedProject);
    };

    const handleCheckOut = () => {
        const quantity = parseInt(textFieldQuantity);
        const updatedHardwareSet = {...hardwareSetSelection};
        const updatedProject = {...projectSelection};
        updatedHardwareSet.available -= quantity;
        for (let i = 0; i < hardwareSets.length; i++) {
            if (updatedHardwareSet.name === hardwareSets[i].name) {
                updatedProject.hardwareSetsCheckedOut[i] += quantity;
            }
        }
        if (isNaN(quantity)) {
            alert("Error: invalid input");
            return;
        } else if (updatedHardwareSet.available < 0) {
            alert("Error: trying to check out too many items");
            return;
        }
        updateHardwareSet(updatedHardwareSet);
        updateProject(updatedProject);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inOutSelection === "in") {
            handleCheckIn();
        } else {
            handleCheckOut();
        }
    };
    
    return (
        <>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <FormControl >
                    <InputLabel id="select-project-label">Project</InputLabel>
                    <Select
                        labelId="select-project-label"
                        value={projectSelection}
                        onChange={(e) => setProjectSelection(e.target.value)}
                        required
                    >
                        <MenuItem value={projects[0]}>{projects[0].name}</MenuItem>
                        <MenuItem value={projects[1]}>{projects[1].name}</MenuItem>
                        <MenuItem value={projects[2]}>{projects[2].name}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl >
                    <InputLabel id="select-hardware-set-label">Hardware</InputLabel>
                    <Select 
                        labelId="select-hardware-set-label"
                        value={hardwareSetSelection}
                        onChange={(e) => {setHardwareSetSelection(e.target.value)}}
                        required
                    >
                        <MenuItem value={hardwareSets[0]} >{hardwareSets[0].name}</MenuItem>
                        <MenuItem value={hardwareSets[1]} >{hardwareSets[1].name}</MenuItem>
                    </Select>
                </FormControl>
                    
                <TextField 
                    label="Enter quantity" 
                    variant="filled" 
                    onChange={(e) => {setTextFieldQuantity(e.target.value)}} 
                    required
                />
                <ToggleButtonGroup
                    value={inOutSelection}
                    exclusive
                    onChange={(e, newSelection) => {
                        if (newSelection !== null) {
                            setInOutSelection(newSelection);
                        }
                    }}
                >
                    <ToggleButton value="in" >
                        Check in
                    </ToggleButton>
                    <ToggleButton value="out" >
                        Check out
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button variant="filled" type="submit" >Submit</Button>
            </form>
        </>
    );
}