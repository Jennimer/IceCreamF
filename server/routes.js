const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Employee = require('./models/employees');

//Fetch all employees
router.get("/employee-list", async (req, res, next) => {
  try {
    const allEmployees = await Employee.find();
    res.send(allEmployees)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})
// Fetch employee by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ _id: id });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

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

  const updatedEmployee = new Employee({
    firstname,
    lastname,
    department,
    startdate,
    salary
  });

  try {
    await updatedEmployee.save();
    res.status(201).json(updatedEmployee);
  } catch (error) {
    console.log(error.message);
    res.send(409).json({ message: err.message });
  }
});

//edit employee
router.patch('/employee-update/:id', async (req, res) => {
  const { id } = req.params;
  const  {
    firstname,
    lastname,
    department,
    startdate,
    salary,
  } = req.body

  // is ID  valid
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('Id is not valid');
    }
    const employeeUpdated = {
      firstname,
      lastname,
      department,
      startdate,
      salary,
      _id: id,
    };
    await Employee.findbyIdAndUpdate(id, employeeUpdated, { new: true });
    res.json({ message: "Employee succesfully updated" })
  } catch (error) {
    console.log(error.message);
    res.send(500).json({ message: err.message });
  }
});


// Add employees

// Delete employees by id
router.delete('/employee-delete/:id', async (req, res) => {
  const { id } = req.params;
  try {

 // is ID valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
      .status(404)
      .send ({ message: `cannot find any product with ID ${id}` })
    }
    
    await Employee.findByIdAndDelete(id);
    res.json({ message: `Product deleted` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})




module.exports = router;