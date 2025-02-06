const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const newLoginRecord = { email, timestamp: new Date().toISOString() };

    // Read the current login records from the JSON file
    const loginRecordsPath = path.join(__dirname, 'loginRecords.json');
    fs.readFile(loginRecordsPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading login records.' });
        }

        const loginRecords = JSON.parse(data);
        loginRecords.push(newLoginRecord);

        // Write the updated login records to the JSON file
        fs.writeFile(loginRecordsPath, JSON.stringify(loginRecords, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving login record.' });
            }
            res.json({ success: true, message: 'Login recorded.', user: newLoginRecord });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
