const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Serve static files (your HTML, CSS, JS)
app.use(express.static('src'));

// Route to handle contact form submissions
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) throw error;

        res.status(200).json({ message: 'Thank you for your message!' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
