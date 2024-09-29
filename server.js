import express from 'express';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialize the Supabase client with environment variables
const supabaseUrl = 'https://ntldpxbxgxcebatayyju.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bGRweGJ4Z3hjZWJhdGF5eWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2NDQ2MjIsImV4cCI6MjA0MzIyMDYyMn0.XWRaFA0HBYf-hEGvw5miZsnbUiNK3TEBv1qTgDMQSXE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for handling contact form submissions
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Insert the form data into Supabase
    const { data, error } = await supabase
      .from('contacts')  // Assuming the table is called 'contacts'
      .insert([
        { name, email, message }
      ]);

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return res.status(500).json({ success: false, message: 'Failed to submit form' });
    }

    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
