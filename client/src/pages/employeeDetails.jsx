import { useContext } from 'react';

import {  Stack, Typography, Card, CardContent  } from "@mui/material" //import mui-UI material
import { Context } from '../context';



function EmployeeDetails() {

  const {employeeDetails} = useContext(Context)
  const {  firstname ,lastname, department, startdate,
  salary} = employeeDetails;

  return(
    <Stack>
    <Card>
    <CardContent sx={{ height: 80 , margin:8}}>
        <Typography>{firstname} {lastname}</Typography>
       
        <Typography>Department:  {department}</Typography>
        <Typography>Startdate:  {startdate}</Typography>
        <Typography>Salary:  {salary}</Typography>
    </CardContent>

</Card></Stack>

  );
}

      
     

export default EmployeeDetails;