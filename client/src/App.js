import { Stack} from "@mui/material" //import mui-UI materialI
import { Route, Routes } from "react-router-dom";// We use Route in order to define the different routes of our application
import EmployeeFormInput  from "./pages/form"; // import the components 
import EmployeeNav from "./Components/employee-nav";  
import "./App.css";
import EmployeeDetails from "./pages/employeeDetails";
import Employees from "./pages/employee";



function App() { 

 return ( // Routes, Pages navigation
   <div>
     <Stack>
      <EmployeeNav />
      <Routes> 
      <Route  path="/" element={<EmployeeFormInput/>} /> 
       <Route  path="/employees" element={<Employees/>} />
       <Route path="/employees/:employeeId" element={<EmployeeDetails/>} />
       </Routes>
     </Stack>
   </div>
 );
};
 
export default App;
