import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;


export const supabase = createClient('https://wuyooksuxnnhojujvqyp.supabase.co', supabaseKey)
