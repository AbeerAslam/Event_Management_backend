const bcrypt = require('bcrypt');

// Sample password to hash
const password = 'cpass';

// Hash the password
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed Password:', hashedPassword);

    // Now compare the password
    bcrypt.compare(password, hashedPassword, (compareErr, isMatch) => {
        if (compareErr) {
            console.error('Error comparing passwords:', compareErr);
        } else if (isMatch) {
            console.log('Passwords match!');
        } else {
            console.log('Passwords do not match.');
        }
    });
});
