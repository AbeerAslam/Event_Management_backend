const db = require('../config/database'); 

const logUserActivity = (req, res) => {
    const { email, userRole, activity } = req.body; // Accept email, userRole, and activity
    console.log(`Received email: ${email}, userRole: ${userRole}, activity: ${activity}`);

    // Fetch the User_ID from the EMPLOYEES table using the email
    db.query('SELECT Emp_ID AS User_ID FROM EMPLOYEES WHERE Email = ?', [email], (userErr, userResults) => {
        if (userErr) {
            console.error('Error fetching user ID:', userErr.message);
            return res.status(500).json({ error: 'Error fetching user ID' });
        }

        // Check if the user is found in the result
        if (userResults.length > 0) {
            const userId = userResults[0].User_ID; // Access userId correctly (from User_ID)

            // Insert the log into the LOGS table
            db.query('INSERT INTO LOGS (User_ID, user_role, activity) VALUES (?, ?, ?)', [userId, userRole, activity], (logErr, logResults) => {
                if (logErr) {
                    console.error('Error inserting log:', logErr.message);
                    return res.status(500).json({ error: 'Error logging user activity' });
                }
                return res.json({ message: 'Activity logged successfully' });
            });
        } else {
            // If no user is found with the given email
            return res.status(404).json({ error: 'User not found' });
        }
    });
};

module.exports = { logUserActivity };
