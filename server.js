// Import required modules using CommonJS
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables from the .env file

// Initialize the Express application
const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data

// Initialize Supabase client with the environment variables
const supabaseUrl = 'https://ntldpxbxgxcebatayyju.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bGRweGJ4Z3hjZWJhdGF5eWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2NDQ2MjIsImV4cCI6MjA0MzIyMDYyMn0.XWRaFA0HBYf-hEGvw5miZsnbUiNK3TEBv1qTgDMQSXE';
const supabase = createClient(supabaseUrl, supabaseKey);


// API Route to fetch data from the Supabase database
app.get('/api', async (req, res) => {
    try {
        const { data, error } = await supabase.from('portfolioDB').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching data from Supabase' });
    }
});

// API Route to insert new data
app.post('/api', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const { data, error } = await supabase
            .from('portfolioDB')
            .insert([{ name, email, message }]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error adding data to Supabase' });
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
