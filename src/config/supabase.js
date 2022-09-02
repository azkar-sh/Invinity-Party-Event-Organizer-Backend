const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://kctonydsflujnjjntton.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdG9ueWRzZmx1am5qam50dG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwODc3MTksImV4cCI6MTk3NzY2MzcxOX0.cJhd2mPK4_RSCQmJCJZF2L0rg18EkqNZQqqPSv2q6cM";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
