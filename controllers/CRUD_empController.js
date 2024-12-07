const db = require('../config/database'); // Import the database connection
const bcrypt = require('bcrypt');

// Get all employees
exports.getEmployees = (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEES';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

// Get a single employee by ID
exports.getEmployeeById = (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEES WHERE Emp_ID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(result[0]);
    });
};



// Create a new employee
exports.createEmployee = (req, res) => {
    const { Full_Name, Phone, Email, Hire_Date, Role, Login_Password } = req.body;
    
   
    db.query('INSERT INTO EMPLOYEES (Full_Name, Phone, Email, Hire_Date, Role,  Login_Password ) VALUES (?, ?, ?, ?, ?, ?)',
        [Full_Name, Phone, Email, Hire_Date, Role, Login_Password], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Employee created successfully', id: result.insertId });
        });
    
    
};

// Update an employee by ID
exports.updateEmployee = (req, res) => {
    const { Full_Name, Phone, Email, Hire_Date, Role, Login_Password, Last_Login } = req.body;
    db.query('UPDATE EMPLOYEES SET Full_Name = ?, Phone = ?, Email = ?, Hire_Date = ?, Role = ?, Login_Password = ?, Last_Login = ? WHERE Emp_ID = ?',
        [Full_Name, Phone, Email, Hire_Date, Role, Login_Password, Last_Login, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    });
};

// Delete an employee by ID
exports.deleteEmployee = (req, res) => {
    db.query('DELETE FROM EMPLOYEES WHERE Emp_ID = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    });
};
