/**
 * Supabase Configuration Example
 * Copy this file to supabase-config.js and fill in your credentials
 */

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL', // เช่น https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // anon public key จาก Supabase Dashboard
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}
