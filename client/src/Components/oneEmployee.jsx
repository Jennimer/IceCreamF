import { useContext } from 'react';

import { Typography, Button, CardActions, CardContent, Card } from "@mui/material"
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
                <Button size="small"style= {{marginLeft: 10}} color="primary"  onClick={()=>getEmployeeDetailsById(_id)}>Details</Button>
                <Button size="small" style= {{marginLeft: 10}} color="primary" onClick={()=>editEmployee(employee)}>Edit</Button>
                <Button size="small" style= {{marginLeft: 10}} color="primary" onClick={()=>deleteEmployee(_id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}
export default OneEmployee; 