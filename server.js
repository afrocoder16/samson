const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.json());

// API endpoint to handle the form data
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const supabaseUrl = 'https://ntldpxbxgxcebatayyju.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bGRweGJ4Z3hjZWJhdGF5eWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2NDQ2MjIsImV4cCI6MjA0MzIyMDYyMn0.XWRaFA0HBYf-hEGvw5miZsnbUiNK3TEBv1qTgDMQSXE';
    const supabase = createClient(supabaseUrl, supabaseKey);
    

    const { data, error } = await supabase
        .from('portfolioDB')
        .insert([{ name, email, message }]);

    if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error saving data');
    }

    res.send('Message received, we will get back to you shortly.');
});

// Serve index.html for the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
