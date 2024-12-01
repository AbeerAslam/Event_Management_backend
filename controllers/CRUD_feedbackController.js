const db = require('../config/database'); // Import the database connection

// Get all feedback entries
exports.getFeedbackEntries = (req, res) => {
    const sql = 'SELECT * FROM feedback';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

// Create a new Feedback entry
exports.createFeedbackEntry = (req, res) => {
    const { feedback, event_id, attendee_email } = req.body;

    // Check if required fields are provided
    if (!feedback || !event_id || !attendee_email) {
        return res.status(400).json({ error: 'All fields (feedback, event_id, attendee_id) are required.' });
    }

    db.query('SELECT attendee_id FROM attendees WHERE email = ?', [attendee_email], (err, results) => {
        if (err) {
            console.error('Error retrieving attendee_id:', err.stack || err.message);
            return res.status(500).json({ error: 'Error retrieving attendee_id' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'attendee not found' });
        }

        const attendee_id = results[0].attendee_id;

        db.query('INSERT INTO feedback (feedback, event_id, attendee_id) VALUES (?, ?, ?)', [feedback, event_id, attendee_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Feedback entry created successfully', id: result.insertId });
        });
    });
};

exports.updateFeedbackEntry = (req, res) => {
    const { feedback, event_id, attendee_id } = req.body;

    // Log the ID to ensure it's being passed correctly
    console.log('Updating feedback entry with ID:', req.params.id);

    // Check if required fields are provided
    if (!feedback || !event_id || !attendee_id) {
        return res.status(400).json({ error: 'All fields (feedback, event_id, attendee_id) are required.' });
    }

    const sql = 'UPDATE feedback SET feedback = ?, event_id = ?, attendee_id = ? WHERE feedback_id = ?';
    db.query(sql, [feedback, event_id, attendee_id, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Feedback entry not found' });
        }
        res.status(200).json({ message: 'Feedback entry updated successfully' });
    });
};

// Delete a Feedback entry by ID
exports.deleteFeedbackEntry = (req, res) => {
    const sql = 'DELETE FROM feedback WHERE feedback_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Feedback entry not found' });
        }
        res.status(200).json({ message: 'Feedback entry deleted successfully' });
    });
};
