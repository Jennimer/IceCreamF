import { useContext } from 'react';

import { Typography, CardActions, CardContent, Card, Button } from "@mui/material"
import { Context } from '../context';



function OneEmployee({employee}) {
    const {getEmployeeDetailsById, deleteEmployee, editEmployee} = useContext(Context)
    const { firstname, lastname, _id } = employee;
    return (
        <Card>
            <CardContent>
                <Typography>{firstname} {lastname}</Typography>
 
            </CardContent>
            <CardActions>
                <Button style= {{margin: 10}} color="primary" variant="outlined" onClick={()=>getEmployeeDetailsById(_id)}>Details</Button>
                <Button style= {{margin: 10}} color="primary" variant="outlined"onClick={()=>editEmployee(employee)}>Edit</Button>
                <Button style= {{margin: 10}} color="primary" variant="outlined"onClick={()=>deleteEmployee(_id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}
export default OneEmployee; 