import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdoiamxnnrwmxoryfqxa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkb2lhbXhubnJ3bXhvcnlmcXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzczMzYsImV4cCI6MjA0Mjg1MzMzNn0.pFtjUyFWFyszsunxlOIzUWaS9qNLATdesZhCW5tlJ1s";
const supabase = createClient(supabaseUrl, supabaseKey); 

export default supabase;
