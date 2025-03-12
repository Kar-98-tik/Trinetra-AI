import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ||"https://quwnhjwbyamairlofrgr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d25oandieWFtYWlybG9mcmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjM4NjEsImV4cCI6MjA1NzMzOTg2MX0.ySUgR5v5l_ojMdgBNC-7upy1EGrfp8gBe4KBJ1Bc_cY";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing.");
}

export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);
