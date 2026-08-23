const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const supabase = supabaseConfigured ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;
export const projectImageBucket = 'project-images';

