const db = require('../config/database'); // Import the database connection

// Get all logs
exports.getLogs = (req, res) => {
    
    db.query('SELECT * FROM LOGS', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

// Get a single log by ID
exports.getLogById = (req, res) => {
   
    db.query('SELECT * FROM LOGS WHERE Log_ID = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(result[0]);
    });
};

// Delete a log by ID
exports.deleteLog = (req, res) => {
    
    db.query('DELETE FROM LOGS WHERE Log_ID = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Log deleted successfully' });
    });
};
