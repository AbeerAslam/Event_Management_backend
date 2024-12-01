const db = require('../config/database'); // Import the database connection
const bcrypt = require('bcrypt');

const verifyPassword = (req, res) => {
    const { email, password } = req.body;

    console.log(`Querying for email: ${email}`); // Log the email
    console.log(`Querying for password: ${password}`);
    db.query('SELECT Login_Password FROM employees WHERE Email = ?', [email], (error, results) => {
        if (error) {
            console.error('Database error:', error.message); // Log the specific database error message
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (results[0].Login_Password == password) {
            return res.json({ message: 'Password is correct' });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        
        }

    });
};

module.exports = { verifyPassword };
