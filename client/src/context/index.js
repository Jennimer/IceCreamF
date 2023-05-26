import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export const Context = createContext(null);

const initialState =
{
    firstname: "",
    lastname: "",
    department: "",
    startdate: "",
    salary: null,

};


const GlobalState = ({ children }) => {
    const [formInput, setFormInput] = useState(initialState);
    const [employees, setEmployees] = useState([]);
    const [isEmployeeSaved, setIsEmployeeSaved] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [employeeEdited, setEmployeeEdited] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function saveEmployeeToDatabase(e) { // save employee info to the database
        e.preventDefault();  // choose the method and route if edited is false or true
        const Response = await fetch(employeeEdited ? `http://localhost:5001/employees/employee-update/${formInput._id}` : 'http://localhost:5001/employees/employee-create',
            {
                method: employeeEdited ? "PATCH" : "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formInput),
            });

        const results = await Response.json(); //
        console.log(results);
        if (results) {
            setIsEmployeeSaved(true);//Set employee save true
        }
    }
    useEffect(() => {
        if (isEmployeeSaved) { //when is  saved  navigate to the  epmployee -list page
            setFormInput(initialState);
            navigate("/employees");
        }
    }, [isEmployeeSaved, navigate]);


    async function getEmployeeList() {

        const Response = await fetch('http://localhost:5001/employees/employee-list');
        const results = await Response.json();

        console.log(results);
        if (results && results.length > 0) {
            setEmployees(results); 
        }
    }

    useEffect(() => {
        if (location.pathname === '/employees') { // check a location 
            setIsEmployeeSaved(false); //set employee saved false
            getEmployeeList(); // display list of employees
            setFormInput(initialState);// clean the form
            setEmployeeEdited(false); //set edited false 
        }

    }, [setEmployees, location]);

    async function getEmployeeDetailsById(currentId) {
        console.log(currentId)
        const response = await fetch(`http://localhost:5001/employees/${currentId}`)
        const results = await response.json();
        console.log(results);
        if (results) {
            setEmployeeDetails(results);
            navigate(`employees/${currentId}`) 
        }
    }
    async function deleteEmployee(currentId) {
        const response = await fetch(`http://localhost:5001/employees/employee-delete/${currentId}`, {
            method: "DELETE",
        });
        console.log(response);
        if (response.ok) { // updated list of employees
            getEmployeeList();
        }
    }
  

    function editEmployee(getCurrentDetails) { //Editing employee
        console.log(getCurrentDetails);
        setFormInput(getCurrentDetails); // Get the new details from the form
        navigate('/') // Navigate to homepage
        setEmployeeEdited(true);
    }
    return (
        <Context.Provider value={{
            formInput,
            setFormInput,
            employees,
            setEmployees,
            isEmployeeSaved,
            setIsEmployeeSaved,
            saveEmployeeToDatabase,
            getEmployeeDetailsById,
            deleteEmployee,
            employeeDetails,
            editEmployee,
            employeeEdited
        }}>
            {children}
        </Context.Provider>
    );
};


export default GlobalState;