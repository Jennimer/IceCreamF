import { Stack, Typography} from "@mui/material" 
import { useContext} from 'react';
import { Context } from "../context";
import OneEmployee from "../Components/oneEmployee";



function Employees(){
    const {employees, setEmployees} = useContext(Context)

console.log(employees)

//Page load get a list of employees
return (
    <Stack>
    <Typography style={ {margin : 10}}>Employees List</Typography>
    {
        employees && employees.length > 0 ? employees.map(employee => <OneEmployee employee={employee}/>): null
    }
    </Stack>
);
}
export default Employees;