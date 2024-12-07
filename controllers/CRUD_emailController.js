
const nodemailer = require('nodemailer');
// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service
    auth: {
        user: 'abeeraslam20@gmail.com', // Replace with your email
        pass: 'ahdrlxbhfjokuwpa', // Replace with your app password
    },
});

const db = require('../config/database'); // Import the database connection

exports.getReminderEntries = (req, res) => {
    const sql = 'SELECT * FROM reminders';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};


// Create a new reminder entry and send emails
exports.createReminderEntry = (req, res) => {
    const { reminder, event_id, event_name,support_email } = req.body;

    // Check if required fields are provided
    if (!reminder || !event_id || !support_email) {
        return res.status(400).json({ error: 'All fields (reminder, event_id, event_name,support_email) are required.' });
    }

    db.query('SELECT emp_id FROM employees WHERE email = ?', [support_email], (err, results) => {
        if (err) {
            console.error('Error retrieving support_id:', err.stack || err.message);
            return res.status(500).json({ error: 'Error retrieving support_id' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Support person not found' });
        }

        const support_id = results[0].emp_id;

        // Get attendee emails for the event
        db.query(
            `SELECT email 
             FROM attendees 
             WHERE attendee_id IN (
                SELECT attendee_id 
                FROM registrations 
                WHERE event_id = ? AND registration_status = 'registered'
             )`,
            [event_id],
            (err, attendees) => {
                if (err) {
                    console.error('Error retrieving attendee emails:', err.stack || err.message);
                    return res.status(500).json({ error: 'Error retrieving attendee emails' });
                }

                if (attendees.length === 0) {
                    return res.status(404).json({ error: 'No attendees found for this event.' });
                }

                // Insert the reminder into the database
                db.query(
                    'INSERT INTO reminder (reminder, event_id, support_id) VALUES (?, ?, ?)',
                    [reminder, event_id, support_id],
                    (err, result) => {
                        if (err) {
                            console.error('Error creating reminder entry:', err.stack || err.message);
                            return res.status(500).json({ error: 'Error creating reminder entry' });
                        }

                        const reminder_id = result.insertId;

                        // Send email to all attendees
                        const emailPromises = attendees.map((attendee) => {
                            const mailOptions = {
                                from: support_email,
                                to: attendee.email,
                                subject: `We await your presence at ${event_name}`,
                                text: reminder,
                            };

                            return transporter.sendMail(mailOptions);
                        });

                        Promise.all(emailPromises)
                            .then(() => {
                                res.status(201).json({
                                    message: 'Reminder entry created and emails sent successfully',
                                    reminder_id,
                                });
                            })
                            .catch((emailErr) => {
                                console.error('Error sending emails:', emailErr.stack || emailErr.message);
                                res.status(500).json({ error: 'Reminder created, but failed to send some emails.' });
                            });
                    }
                );
            }
        );
    });
};

exports.updateReminderEntry = (req, res) => {
    const { reminder, event_id, support_id } = req.body;

    // Log the ID to ensure it's being passed correctly
    console.log('Updating reminder entry with ID:', req.params.id);

    // Check if required fields are provided
    if (!reminder || !event_id || !support_id) {
        return res.status(400).json({ error: 'All fields (reminder, event_id, support_id) are required.' });
    }

    const sql = 'UPDATE reminder SET reminder = ?, event_id = ?, support_id = ? WHERE reminder_id = ?';
    db.query(sql, [reminder, event_id, support_id, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'reminder entry not found' });
        }
        res.status(200).json({ message: 'reminder entry updated successfully' });
    });
};

// Delete a marketing entry by ID
exports.deleteReminderEntry = (req, res) => {
    const sql = 'DELETE FROM reminder WHERE reminder_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reminder entry not found' });
        }
        res.status(200).json({ message: 'Reminder entry deleted successfully' });
    });
};
