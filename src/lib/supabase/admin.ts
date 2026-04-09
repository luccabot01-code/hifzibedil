import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Admin client with service_role key — full access, bypasses RLS
// ONLY use in server-side code (API routes, server actions, scripts)
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
