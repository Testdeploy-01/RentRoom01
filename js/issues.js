/**
 * Issue Reporting Module
 * Handles issue operations with Supabase
 */

const Issues = {
    STORAGE_KEY: 'issues',
    cachedIssues: null,

    /**
     * Create a new issue
     * @param {string} tenantId
     * @param {Object} issueData
     * @returns {Promise<Object>}
     */
    async createIssue(tenantId, issueData) {
        const validation = this.validateIssue(issueData);
        if (!validation.valid) {
            return { error: validation.errors };
        }

        const tenant = Auth.getUserById(tenantId);
        if (!tenant) return { error: 'ไม่พบข้อมูลผู้เช่า' };
        if (!tenant.roomId) return { error: 'คุณยังไม่มีห้องพัก ไม่สามารถแจ้งปัญหาได้' };

        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.createIssueLocal(tenantId, issueData, tenant.roomId);
            }

            const { data, error } = await supabase
                .from('issues')
                .insert([{
                    tenant_id: tenantId,
                    room_id: tenant.roomId,
                    title: issueData.title.trim(),
                    category: issueData.category || 'other',
                    description: issueData.description.trim(),
                    status: 'pending'
                }])
                .select()
                .single();

            if (error) throw error;

            this.cachedIssues = null;
            return this.convertIssue(data);
        } catch (error) {
            console.error('Create issue error:', error);
            return this.createIssueLocal(tenantId, issueData, tenant.roomId);
        }
    },

    /**
     * Create issue locally (fallback)
     */
    createIssueLocal(tenantId, issueData, roomId) {
        const issues = Storage.load(this.STORAGE_KEY) || [];
        const newIssue = {
            id: this.generateId(),
            tenantId: tenantId,
            roomId: roomId,
            title: issueData.title.trim(),
            category: issueData.category || 'other',
            description: issueData.description.trim(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        issues.push(newIssue);
        Storage.save(this.STORAGE_KEY, issues);
        return newIssue;
    },

    /**
     * Validate issue data
     */
    validateIssue(issueData) {
        const errors = {};
        if (!issueData.title || issueData.title.trim() === '') {
            errors.title = 'กรุณากรอกหัวข้อปัญหา';
        }
        if (!issueData.description || issueData.description.trim() === '') {
            errors.description = 'กรุณากรอกรายละเอียดปัญหา';
        }
        return { valid: Object.keys(errors).length === 0, errors };
    },

    /**
     * Get all issues
     */
    getAllIssues() {
        if (this.cachedIssues) return this.cachedIssues;
        return Storage.load(this.STORAGE_KEY) || [];
    },

    /**
     * Get all issues async from Supabase
     */
    async getAllIssuesAsync() {
        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) return this.getAllIssues();

            const { data, error } = await supabase
                .from('issues')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.cachedIssues = data.map(i => this.convertIssue(i));
            return this.cachedIssues;
        } catch (error) {
            console.error('Error fetching issues:', error);
            return this.getAllIssues();
        }
    },

    /**
     * Get issues by tenant
     */
    getIssuesByTenant(tenantId) {
        const issues = this.getAllIssues();
        return issues.filter(issue => issue.tenantId === tenantId);
    },

    /**
     * Get issues by status
     */
    getIssuesByStatus(status) {
        const issues = this.getAllIssues();
        return issues.filter(issue => issue.status === status);
    },

    /**
     * Update issue status
     * @param {string} issueId
     * @param {string} status
     * @returns {Promise<Object>}
     */
    async updateIssueStatus(issueId, status) {
        const validStatuses = ['pending', 'in-progress', 'resolved'];
        if (!validStatuses.includes(status)) {
            return { error: 'สถานะไม่ถูกต้อง' };
        }

        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.updateIssueStatusLocal(issueId, status);
            }

            const { data, error } = await supabase
                .from('issues')
                .update({ status: status, updated_at: new Date().toISOString() })
                .eq('id', issueId)
                .select()
                .single();

            if (error) throw error;

            this.cachedIssues = null;
            return this.convertIssue(data);
        } catch (error) {
            console.error('Update issue error:', error);
            return this.updateIssueStatusLocal(issueId, status);
        }
    },

    /**
     * Update issue status locally (fallback)
     */
    updateIssueStatusLocal(issueId, status) {
        const issues = Storage.load(this.STORAGE_KEY) || [];
        const issueIndex = issues.findIndex(issue => issue.id === issueId);
        if (issueIndex === -1) return { error: 'ไม่พบรายการปัญหา' };

        issues[issueIndex].status = status;
        issues[issueIndex].updatedAt = new Date().toISOString();
        Storage.save(this.STORAGE_KEY, issues);
        this.cachedIssues = issues;
        return issues[issueIndex];
    },

    /**
     * Get issue statistics
     */
    getStatistics() {
        const issues = this.getAllIssues();
        return {
            total: issues.length,
            pending: issues.filter(i => i.status === 'pending').length,
            inProgress: issues.filter(i => i.status === 'in-progress').length,
            resolved: issues.filter(i => i.status === 'resolved').length
        };
    },

    /**
     * Get all issues with details
     */
    getAllIssuesWithDetails() {
        const issues = this.getAllIssues();
        return issues.map(issue => {
            const room = Rooms.getRoomById(issue.roomId);
            const tenant = Auth.getUserById(issue.tenantId);
            return {
                ...issue,
                room: room,
                tenant: tenant ? {
                    id: tenant.id,
                    username: tenant.username,
                    email: tenant.email,
                    phone: tenant.phone
                } : null
            };
        });
    },

    /**
     * Convert Supabase issue to app format
     */
    convertIssue(issue) {
        return {
            id: issue.id,
            tenantId: issue.tenant_id,
            roomId: issue.room_id,
            title: issue.title,
            category: issue.category,
            description: issue.description,
            status: issue.status,
            createdAt: issue.created_at,
            updatedAt: issue.updated_at
        };
    },

    /**
     * Get status display name
     */
    getStatusDisplayName(status) {
        const statuses = {
            'pending': 'รอดำเนินการ',
            'in-progress': 'กำลังดำเนินการ',
            'resolved': 'แก้ไขแล้ว'
        };
        return statuses[status] || status;
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return 'issue_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 11);
    }
};
