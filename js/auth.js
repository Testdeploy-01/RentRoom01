/**
 * Authentication Module
 * Handles user operations with Supabase
 */

const Auth = {
    SESSION_KEY: 'currentUser',
    cachedUsers: null,

    /**
     * Register a new user
     * @param {Object} userData
     * @returns {Promise<Object>}
     */
    async register(userData) {
        const validation = this.validateRegistration(userData);
        if (!validation.valid) {
            return { error: validation.errors };
        }

        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.registerLocal(userData);
            }

            // Check if username exists
            const { data: existing } = await supabase
                .from('users')
                .select('id')
                .eq('username', userData.username)
                .single();

            if (existing) {
                return { error: { username: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' } };
            }

            // Create user
            const { data, error } = await supabase
                .from('users')
                .insert([{
                    username: userData.username.trim(),
                    display_name: userData.displayName?.trim() || userData.username.trim(),
                    password: userData.password,
                    line_id: userData.lineId?.trim() || '',
                    phone: userData.phone?.trim() || '',
                    email: userData.email?.trim() || '',
                    role: 'tenant'
                }])
                .select()
                .single();

            if (error) throw error;

            this.cachedUsers = null; // Clear cache
            return this.convertUser(data);
        } catch (error) {
            console.error('Register error:', error);
            return this.registerLocal(userData);
        }
    },

    /**
     * Register locally (fallback)
     */
    registerLocal(userData) {
        const users = Storage.load('users') || [];
        const existingUser = users.find(u => u.username === userData.username);
        if (existingUser) {
            return { error: { username: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' } };
        }

        const newUser = {
            id: this.generateId(),
            username: userData.username.trim(),
            displayName: userData.displayName?.trim() || userData.username.trim(),
            password: userData.password,
            lineId: userData.lineId?.trim() || '',
            phone: userData.phone?.trim() || '',
            email: userData.email?.trim() || '',
            role: 'tenant',
            createdAt: new Date().toISOString(),
            roomId: null
        };

        users.push(newUser);
        Storage.save('users', users);
        return newUser;
    },

    /**
     * Validate registration data
     */
    validateRegistration(userData) {
        const errors = {};
        if (!userData.username || userData.username.trim() === '') {
            errors.username = 'กรุณากรอกชื่อผู้ใช้';
        } else if (userData.username.trim().length < 3) {
            errors.username = 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร';
        }
        if (!userData.password || userData.password === '') {
            errors.password = 'กรุณากรอกรหัสผ่าน';
        } else if (userData.password.length < 4) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร';
        }
        return { valid: Object.keys(errors).length === 0, errors };
    },

    /**
     * Login user
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Object|null>}
     */
    async login(username, password) {
        if (!username || !password) return null;

        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.loginLocal(username, password);
            }

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();

            if (error || !data) {
                return this.loginLocal(username, password);
            }

            const user = this.convertUser(data);
            this.setSession(user);
            return user;
        } catch (error) {
            console.error('Login error:', error);
            return this.loginLocal(username, password);
        }
    },

    /**
     * Login locally (fallback)
     */
    loginLocal(username, password) {
        const users = Storage.load('users') || [];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            this.setSession(user);
            return user;
        }
        return null;
    },

    /**
     * Logout current user
     */
    logout() {
        Storage.remove(this.SESSION_KEY);
    },

    /**
     * Get current logged in user
     */
    getCurrentUser() {
        return Storage.load(this.SESSION_KEY);
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    },

    /**
     * Check if current user has specific role
     */
    hasRole(role) {
        const user = this.getCurrentUser();
        return user !== null && user.role === role;
    },

    /**
     * Set user session
     */
    setSession(user) {
        const sessionUser = { ...user };
        delete sessionUser.password;
        Storage.save(this.SESSION_KEY, sessionUser);
    },

    /**
     * Get user by ID
     * @param {string} userId
     * @returns {Object|null}
     */
    getUserById(userId) {
        if (this.cachedUsers) {
            return this.cachedUsers.find(u => u.id === userId) || null;
        }
        const users = Storage.load('users') || [];
        return users.find(u => u.id === userId) || null;
    },

    /**
     * Get all users with specific role
     * @param {string} role
     * @returns {Array}
     */
    getUsersByRole(role) {
        if (this.cachedUsers) {
            return this.cachedUsers.filter(u => u.role === role);
        }
        const users = Storage.load('users') || [];
        return users.filter(u => u.role === role);
    },

    /**
     * Get all users async from Supabase
     */
    async getAllUsersAsync() {
        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return Storage.load('users') || [];
            }

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('created_at');

            if (error) throw error;

            this.cachedUsers = data.map(u => this.convertUser(u));
            return this.cachedUsers;
        } catch (error) {
            console.error('Error fetching users:', error);
            return Storage.load('users') || [];
        }
    },

    /**
     * Convert Supabase user to app format
     */
    convertUser(user) {
        return {
            id: user.id,
            username: user.username,
            displayName: user.display_name,
            password: user.password,
            lineId: user.line_id,
            phone: user.phone,
            email: user.email,
            role: user.role,
            roomId: user.room_id,
            createdAt: user.created_at
        };
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 11);
    }
};
