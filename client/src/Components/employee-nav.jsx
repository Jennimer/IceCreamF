import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from './icecreamlogo.png'



//  display our Navbar
function EmployeeNav() {
 return (
  <AppBar position="relative" style={ {marginBottom : 5}} >
<Toolbar> <Box>
      <img src={logo}  alt="Ice Cream Logo" style={ {width : 150, margin : 10}} />
    </Box>

  <Box style= { {} }>
 
      <Link style= {{margin: 10}} color="default" to= {'/'}>Home</Link>
      <Link style= {{margin: 10}} color="default"to= {'/employees'}>Employees</Link>
  </Box>
</Toolbar>
</AppBar>

 );
}
export default EmployeeNav;