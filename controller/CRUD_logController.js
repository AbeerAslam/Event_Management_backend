const db = require('../db');

// Get all logs
exports.getLogs = (req, res) => {
    const sql = 'SELECT * FROM LOGS';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

// Get a single log by ID
exports.getLogById = (req, res) => {
    const sql = 'SELECT * FROM LOGS WHERE Log_ID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(result[0]);
    });
};

// Delete a log by ID
exports.deleteLog = (req, res) => {
    const sql = 'DELETE FROM LOGS WHERE Log_ID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Log deleted successfully' });
    });
};
