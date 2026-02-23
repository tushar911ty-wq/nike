const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic API URL endpoint
app.get('/api/status', (req, res) => {
    res.json({ status: 'Online', message: 'Nike backend is running!' });
});

const fs = require('fs');
const MESSAGE_FILE = path.join(__dirname, 'makemsg.json');

// Initialize the array if json file doesn't exist
if (!fs.existsSync(MESSAGE_FILE)) {
    fs.writeFileSync(MESSAGE_FILE, JSON.stringify([]));
}

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    fs.readFile(MESSAGE_FILE, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }
        messages.push(newMessage);

        fs.writeFile(MESSAGE_FILE, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save message' });
            }
            res.json({ success: true, message: 'Message saved successfully' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`API URL is available at http://localhost:${PORT}/api/status`);
});
