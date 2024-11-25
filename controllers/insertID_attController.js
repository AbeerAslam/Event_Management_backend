const db = require('../config/database'); // Import the database connection

exports.attendeeActivity = (req, res) => {
    const { email } = req.body;
    console.log(`Received email: ${email}`);

    // Check if the email exists in the attendees table
    db.query('SELECT attendee_id FROM attendees WHERE email = ?', [email], (attErr, attResults) => {
        if (attErr) {
            console.error('Error fetching attendee ID:', attErr.message);
            return res.status(500).json({ error: 'Error fetching attendee ID' });
        }

        if (attResults.length > 0) {
            // Attendee exists
            return res.status(200).json({
                message: 'Attendee exists',
                attendee_id: attResults[0].attendee_id
            });
        }

        // Insert a new attendee if email is not found
        db.query('INSERT INTO attendees (email) VALUES (?)', [email], (insertErr, insertResults) => {
            if (insertErr) {
                console.error('Error inserting attendee:', insertErr.message);
                return res.status(500).json({ error: 'Error inserting attendee' });
            }

            // Return the newly added attendee_id
            return res.status(201).json({
                message: 'New attendee added',
                attendee_id: insertResults.insertId
            });
        });
    });
};
