/**
 * Supabase Client
 * Handles all Supabase operations
 */

const SupabaseClient = {
    client: null,

    /**
     * Initialize Supabase client
     */
    init() {
        if (!window.supabase) {
            console.error('Supabase library not loaded');
            return false;
        }

        try {
            this.client = window.supabase.createClient(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey
            );
            console.log('Supabase client initialized');
            return true;
        } catch (error) {
            console.error('Failed to initialize Supabase:', error);
            return false;
        }
    },

    /**
     * Get Supabase client instance
     */
    getClient() {
        if (!this.client) {
            this.init();
        }
        return this.client;
    },

    /**
     * Check if Supabase is ready
     */
    isReady() {
        return this.client !== null;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseClient;
}
