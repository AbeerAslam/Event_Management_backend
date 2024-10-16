
const db = require('../config/database'); // Import the database connection
const bcrypt = require('bcrypt');
const verifyPassword = (req, res) => {
    const { email, password } = req.body;

    console.log(`Querying for email: ${email}`); // Log the email
    db.query('SELECT Login_Password FROM employees WHERE Email = ?', [email], (error, results) => {
        if (error) {
            console.error('Database error:', error.message); // Log the specific database error message
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const hashedPassword = results[0].Login_Password; // Changed to Login_Password

        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error comparing passwords' });
            if (isMatch) {
                return res.json({ message: 'Password is correct' });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        });
    });
};
module.exports = { verifyPassword };
