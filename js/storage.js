/**
 * Storage Module
 * Handles data storage operations (Supabase + LocalStorage fallback)
 */

const Storage = {
    PREFIX: 'dorm_',
    useSupabase: false,

    /**
     * Initialize storage (check if Supabase is available)
     */
    init() {
        this.useSupabase = SupabaseClient.isReady();
        if (this.useSupabase) {
            console.log('Using Supabase for storage');
        } else {
            console.log('Using LocalStorage (Supabase not available)');
        }
    },

    /**
     * Save data to Local Storage (for session/temp data)
     * @param {string} key - Storage key
     * @param {any} data - Data to save
     * @returns {boolean} - Success status
     */
    save(key, data) {
        try {
            const serialized = this.serialize(data);
            localStorage.setItem(this.PREFIX + key, serialized);
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    },

    /**
     * Load data from Local Storage (for session/temp data)
     * @param {string} key - Storage key
     * @returns {any|null} - Retrieved data or null
     */
    load(key) {
        try {
            const data = localStorage.getItem(this.PREFIX + key);
            if (data === null) {
                return null;
            }
            return this.deserialize(data);
        } catch (error) {
            console.error('Storage load error:', error);
            return null;
        }
    },

    /**
     * Remove data from Local Storage
     * @param {string} key - Storage key
     * @returns {boolean} - Success status
     */
    remove(key) {
        try {
            localStorage.removeItem(this.PREFIX + key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },

    /**
     * Clear all app data from Local Storage
     */
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Storage clear error:', error);
        }
    },

    /**
     * Serialize data to JSON string
     * @param {any} data - Data to serialize
     * @returns {string} - JSON string
     */
    serialize(data) {
        return JSON.stringify(data);
    },

    /**
     * Deserialize JSON string to data
     * @param {string} jsonString - JSON string to deserialize
     * @returns {any} - Parsed data
     */
    deserialize(jsonString) {
        if (typeof jsonString !== 'string') {
            throw new Error('Input must be a string');
        }
        return JSON.parse(jsonString);
    },

    /**
     * Check if key exists in storage
     * @param {string} key - Storage key
     * @returns {boolean}
     */
    exists(key) {
        return localStorage.getItem(this.PREFIX + key) !== null;
    },

    /**
     * Get all keys with prefix
     * @returns {string[]} - Array of keys
     */
    getAllKeys() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.PREFIX)) {
                keys.push(key.replace(this.PREFIX, ''));
            }
        }
        return keys;
    }
};

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
