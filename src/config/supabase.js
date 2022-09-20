const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.DB_DATABASE_URL;
const supabaseKey = process.env.DB_DATABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
