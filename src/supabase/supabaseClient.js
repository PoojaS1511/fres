import { createClient } from '@supabase/supabase-js';

// Directly setting the values for Supabase URL and Key
const supabaseUrl = 'https://cdozcvfnamrqbaqsrhnp.supabase.co';  // replace with your actual URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkb3pjdmZuYW1ycWJhcXNyaG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDIwNDEsImV4cCI6MjA1ODcxODA0MX0.CprHN0BfyN5PlQp9yfQoiZkyjnO18Rm7MAD3ObzafJ8';  // replace with your actual key

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
