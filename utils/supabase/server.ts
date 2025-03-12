import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ||"https://quwnhjwbyamairlofrgr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d25oandieWFtYWlybG9mcmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjM4NjEsImV4cCI6MjA1NzMzOTg2MX0.ySUgR5v5l_ojMdgBNC-7upy1EGrfp8gBe4KBJ1Bc_cY";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase environment variables are missing. Check your .env.local file.");
}

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async getAll() {
        return (await cookieStore).getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(async ({ name, value, options }) => {
            (await cookieStore).set(name, value, options);
          });
        } catch (error) {
          console.warn("⚠️ Cannot set cookies from a Server Component.");
        }
      },
    },
  });
};