
import { useContext } from 'react';

import { Paper, Stack, Box, Typography, TextField, Button } from "@mui/material" //import mui-UI material
import { Context } from '../context';




const formData = [
    {
        id: 'firstname',
        type: 'text',
        label: 'Firstname'
    },
    {
        id: 'lastname',
        type: 'text',
        label: 'Lastname'
    },
    {
        id: 'department',
        type: 'text',
        label: 'Department'
    },
    {
        id: 'startdate',
        type: 'text',
        label: 'Startdate'
    },
    {
        id: 'salary',
        type: 'number',
        label: 'Salary'
    },
];


function EmployeeFormInput() {
    const {form, setForm, saveEmployeeToDatabase, employeeEdited} = useContext(Context);
    return (
        <Stack className="ag-theme-material" style={ { height: 400, width: 600, margin: 'auto' } }>
            <Typography>Employee Details</Typography>

            <Paper onSubmit={saveEmployeeToDatabase} component={"form"}>
                {
                    formData.map((field) => ( // Map display the form and fields
                        <Box>
                            <Typography>{field.label}</Typography>
                            <TextField
                                name={field.id}
                                id={field.id}
                                type={field.type}
                                fullWidth
                                value={form[field.id]}
                                onChange={(e) => 
                                    setForm({
                                    ...form,
                                    [e.target.name]: //Parse salary to int
                                        field.id === "salary" ? parseInt(e.target.value) : e.target.value,
                                })
                            }
                            /> 
                        </Box>
                    ))} 
                <Box sx={{ display: "flex", gap: "20px" }}>
                    <Button type="Submit" style= {{margin: 10}} color="primary" variant="outlined"> {employeeEdited ? 'Edit employee' : 'Add Employee'}</Button>
                </Box>
            </Paper>
        </Stack>

    );
}

export default EmployeeFormInput;