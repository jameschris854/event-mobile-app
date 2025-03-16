import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gpiraexzmskndtycuizg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaXJhZXh6bXNrbmR0eWN1aXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NDAwODMsImV4cCI6MjA1NzAxNjA4M30.xetLeLPF4_VwhhHWMOLqYku5_3fNrE3sy_wA9isNSPI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})