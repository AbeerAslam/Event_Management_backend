
const db = require('../config/database'); // Import the database connection




exports.createEmp = (req, res) => {
    const { Full_Name, Phone, Email, Hire_Date, Role, Login_Password } = req.body;


    db.query('INSERT INTO EMPLOYEES (Full_Name, Phone, Email, Hire_Date, Role,  Login_Password ) VALUES (?, ?, ?, ?, ?, ?)',
        [Full_Name, Phone, Email, Hire_Date, Role, Login_Password], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Employee created successfully', id: result.insertId });
        });


};