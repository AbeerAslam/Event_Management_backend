const db = require('../config/database');


exports.allEvents = (req, res) => {
    db.query('SELECT * from events', (err, results) => {
        console.log(results);
        if (err) {
            console.error('Database query error:', err); // Log errors
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            console.log(`No events`); // Log for empty results
            return res.status(404).json({ message: `No events found` });
        }
        res.status(200).json(results); // Send response
    });
};


