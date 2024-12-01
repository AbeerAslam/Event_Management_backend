const db = require('../config/database');

// Submit a query
exports.queries = (req, res) => {
    const { event_id, attendee_email, question } = req.body;

    if (!event_id || !attendee_email || !question) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Query sent by ${attendee_email} for event ${event_id}`);

    db.query('SELECT attendee_id FROM attendees WHERE email = ?', [attendee_email], (err, results) => {
        if (err) {
            console.error('Error retrieving attendee_id:', err.stack || err.message);
            return res.status(500).json({ error: 'Error retrieving attendee_id' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Attendee not found' });
        }

        const attendee_id = results[0].attendee_id;

        db.query(
            'INSERT INTO query (question, attendee_id, event_id) VALUES (?, ?, ?)',
            [question, attendee_id, event_id],
            (err) => {
                if (err) {
                    console.error('Error inserting query:', err.stack || err.message);
                    return res.status(500).json({ error: 'Error inserting query' });
                }

                return res.status(200).json({ message: 'Query submitted successfully' });
            }
        );
    });
};

// Submit an answer
exports.answers = (req, res) => {
    const { query_id, support_email, answer } = req.body;

    if (!query_id || !support_email || !answer) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Query answered by ${support_email} for query ${query_id}`);


    db.query('SELECT emp_id FROM employees WHERE email = ?', [support_email], (err, results) => {
        if (err) {
            console.error('Error retrieving support_id:', err.stack || err.message);
            return res.status(500).json({ error: 'Error retrieving support_id' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'support not found' });
        }

        const support_id = results[0].emp_id;

        db.query(
            'UPDATE query SET answer = ?, support_id = ?, status = "answered" WHERE query_id = ?',
            [answer, support_id, query_id],
            (err, results) => {
                if (err) {
                    console.error('Error updating query:', err.stack || err.message);
                    return res.status(500).json({ error: 'Error updating query' });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: 'Query not found or no changes made' });
                }

                res.status(200).json({ message: 'Query updated successfully' });
            }
        );

    });
}


    // Display unanswered queries for an event
    exports.display_unanswered = (req, res) => {
        const { event_id } = req.body;

        if (!event_id) {
            return res.status(400).json({ error: 'Missing event_id' });
        }

        console.log(`Unanswered queries for event ${event_id}`);

        db.query('SELECT * FROM query WHERE status = "unanswered" AND event_id = ?', [event_id], (err, results) => {
            if (err) {
                console.error('Error retrieving queries:', err.stack || err.message);
                return res.status(500).json({ error: 'Error retrieving queries' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'No unanswered queries found' });
            }

            res.status(200).json(results);
        });
    };

    // Display all queries submitted by an attendee
    exports.display_all_a = (req, res) => {
        const { attendee_email } = req.body;

        if (!attendee_email) {
            return res.status(400).json({ error: 'Missing attendee_email' });
        }

        console.log(`Display queries by ${attendee_email}`);

        db.query('SELECT attendee_id FROM attendees WHERE email = ?', [attendee_email], (err, results) => {
            if (err) {
                console.error('Error retrieving attendee_id:', err.stack || err.message);
                return res.status(500).json({ error: 'Error retrieving attendee_id' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Attendee not found' });
            }

            const attendee_id = results[0].attendee_id;

            db.query('SELECT e.event_name,q.* FROM query q join events e on e.event_id=q.event_id WHERE attendee_id = ?', [attendee_id], (err, queries) => {
                if (err) {
                    console.error('Error retrieving queries:', err.stack || err.message);
                    return res.status(500).json({ error: 'Error retrieving queries' });
                }

                if (queries.length === 0) {
                    return res.status(404).json({ error: 'No queries found' });
                }

                res.status(200).json(queries);
            });
        });
    };

exports.display_all_s = (req, res) => {
    const { support_email } = req.body;

    if (!support_email) {
        return res.status(400).json({ error: 'Missing attendee_email' });
    }

    console.log(`Display queries by ${support_email}`);

    db.query('SELECT emp_id FROM employees WHERE email = ?', [support_email], (err, results) => {
        if (err) {
            console.error('Error retrieving support_id:', err.stack || err.message);
            return res.status(500).json({ error: 'Error retrieving support_id' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'support not found' });
        }

        const support_id = results[0].emp_id;

        db.query('SELECT * FROM query WHERE support_id = ? and status="answered"', [support_id], (err, queries) => {
            if (err) {
                console.error('Error retrieving queries:', err.stack || err.message);
                return res.status(500).json({ error: 'Error retrieving queries' });
            }

            if (queries.length === 0) {
                return res.status(404).json({ error: 'No queries found' });
            }

            res.status(200).json(queries);
        });
    });
};
