import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
const supabase = createClient(supabaseUrl, key);

export default supabase;
