import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_PRIVATE_KEY;
const supabase = createClient(supabaseUrl, key);

export default supabase;
