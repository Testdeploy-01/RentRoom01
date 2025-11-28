/**
 * Supabase Configuration
 * Replace with your actual Supabase credentials
 */

const SUPABASE_CONFIG = {
    url: 'https://jdjhsyiunkcimcvyxykz.supabase.co', // เช่น https://xxxxx.supabase.co
    anonKey: 'sb_publishable_lOJ--5lLF74r5BD_Ca_0uQ_UF5FQUqn' // anon public key จาก Supabase Dashboard
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}
