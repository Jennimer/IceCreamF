const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('./models/employees');



//Fetch all employees
router.get("/employee-list", async (req, res, next) => {
  try {
    const allEmployees = await Employee.find();
    res.send(allEmployees)
  } catch (err) {
    console.log(err.message)
    return res.status(404).json({ messageInfo: err.message });
  }
})
// Fetch employee by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ _id: id });
    res.status(200).json(employee);
  } catch (error) {
    res.send(404).json({ errorInfo: error.message })
  }
});

//create one employee
router.post("/employee-create", async (req, res) => {
  const {
    firstname,
    lastname,
    department,
    startdate,
    salary,
  } = req.body;

  //Create new employee

  const createdEmployee = new Employee({
    firstname,
    lastname,
    department,
    startdate,
    salary,
  });

  try {
    await createdEmployee.save();
    res.status(201).json(createdEmployee);
  } catch (error) {
    
    res.send(409).json({ errorInfo: error.message });
  }
});

//edit employee
router.patch('/employee-update/:id', async (req, res) => {
  console.log('problem')
  const { id } = req.params;
  const  {
    firstname,
    lastname,
    department,
    startdate,
    salary,
  } = req.body;

  // is ID  valid
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404)
      .send('Id is not valid');
    }
    const employeeUpdated = {
      firstname,
      lastname,
      department,
      startdate,
      salary,
      _id: id,
    };
    await Employee.findByIdAndUpdate(id, employeeUpdated, { new : true });
    res.json({ message: "Employee succesfully updated" })
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500).json({ errorInfo: error.message });
  
  }
});


// Delete employees by id
router.delete('/employee-delete/:id', async (req, res) => {
  const { id } = req.params;
  try {

 // is ID valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
      .status(404)
      .send (`cannot find any product with ID ${id}`)
    }
    
    await Employee.findByIdAndDelete(id);
    res.json({ message: `Product deleted` })
  } catch (error) {
    res.send(500).json({ errorInfo: error.message })
  }
});




module.exports = router;