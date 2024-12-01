const db = require('../config/database'); // Import the database connection

// Get all marketing entries
exports.getMarketingEntries = (req, res) => {
    const sql = 'SELECT * FROM marketing';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

// Create a new marketing entry
exports.createMarketingEntry = (req, res) => {
    const { marketing, event_id, support_email } = req.body;

    // Check if required fields are provided
    if (!marketing || !event_id || !support_email) {
        return res.status(400).json({ error: 'All fields (marketing, event_id, support_id) are required.' });
    }

    db.query('SELECT emp_id FROM employees WHERE email = ?', [support_email], (err, results) => {
        if (err) {
            console.error('Error retrieving support_id:', err.stack || err.message);
            return res.status(500).json({ error: 'Error retrieving support_id' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'support not found' });
        }

        const support_id = results[0].emp_id;

        db.query('INSERT INTO marketing (marketing, event_id, support_id) VALUES (?, ?, ?)', [marketing, event_id, support_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Marketing entry created successfully', id: result.insertId });
        });
    });
};

exports.updateMarketingEntry = (req, res) => {
    const { marketing, event_id, support_id } = req.body;

    // Log the ID to ensure it's being passed correctly
    console.log('Updating marketing entry with ID:', req.params.id);

    // Check if required fields are provided
    if (!marketing || !event_id || !support_id) {
        return res.status(400).json({ error: 'All fields (marketing, event_id, support_id) are required.' });
    }

    const sql = 'UPDATE marketing SET marketing = ?, event_id = ?, support_id = ? WHERE marketing_id = ?';
    db.query(sql, [marketing, event_id, support_id, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Marketing entry not found' });
        }
        res.status(200).json({ message: 'Marketing entry updated successfully' });
    });
};

// Delete a marketing entry by ID
exports.deleteMarketingEntry = (req, res) => {
    const sql = 'DELETE FROM marketing WHERE marketing_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Marketing entry not found' });
        }
        res.status(200).json({ message: 'Marketing entry deleted successfully' });
    });
};
