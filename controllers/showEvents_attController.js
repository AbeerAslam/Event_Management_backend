const db = require('../config/database');
// Get all events in a specific category

exports.getEventsByCategory = (req, res) => {
    const sql = 'SELECT e.event_id,e.event_name,e.event_date, e.event_timings,e.description,v.vendor_name,v.services,vn.venue_name,vn.venue_address,t.driver_name,t.vehicle_type,t.pickup_point,t.contact_info FROM events e LEFT JOIN vendor v ON e.vendor_id = v.vendor_id LEFT JOIN venues vn ON e.venue_id = vn.venue_id LEFT JOIN transport t ON e.transport_id = t.transport_id WHERE e.event_category = ? ';
    const category = req.params.category; // Extract the category
    console.log(`Category received: ${category}`); // Log for debugging

    db.query(sql, [category], (err, results) => {
        console.log(results); 
        if (err) {
            console.error('Database query error:', err); // Log errors
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            console.log(`No events found for category: ${category}`); // Log for empty results
            return res.status(404).json({ message: `No events found for category: ${category}` });
        }
        res.status(200).json(results); // Send response
    });
};


// Get registered events for an attendee by email
exports.getRegisteredEvents = (req, res) => {
    const attendeeEmail = req.params.email;
    const sql = `
        SELECT e.event_id,e.event_name,e.event_date 
        FROM events e
        JOIN registrations r ON r.event_id = e.event_id
        JOIN attendees a ON r.attendee_id = a.attendee_id
        WHERE a.email = ?`;

    db.query(sql, [attendeeEmail], (err, results) => {
        if (err) {
            console.error('Database query error:', err.stack || err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No registered events found for this attendee' });
        }

        res.status(200).json(results); // Send the list of registered events
    });
};
