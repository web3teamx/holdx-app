import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nxlleblykoxcxzjwzsbq.supabase.co'
const supabaseKey = 'sb_publishable_HF5YL6QVQgRWeGPKqfTp6Q_C8g9lpFW'

export const supabase = createClient(supabaseUrl, supabaseKey)