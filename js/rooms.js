/**
 * Room Management Module
 * Handles room operations with Supabase
 */

const Rooms = {
    STORAGE_KEY: 'rooms',
    cachedRooms: null,

    /**
     * Get all rooms from Supabase
     * @returns {Promise<Array>} - Array of all rooms
     */
    async getAllRoomsAsync() {
        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.getAllRooms(); // Fallback to localStorage
            }

            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('room_number');

            if (error) throw error;

            // Convert snake_case to camelCase
            const rooms = data.map(room => ({
                id: room.id,
                roomNumber: room.room_number,
                floor: room.floor,
                type: room.type,
                price: parseFloat(room.price),
                status: room.status,
                description: room.description,
                tenantId: room.tenant_id,
                createdAt: room.created_at
            }));

            this.cachedRooms = rooms;
            return rooms;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            return this.getAllRooms(); // Fallback
        }
    },

    /**
     * Get all rooms (sync - uses cache or localStorage)
     * @returns {Array}
     */
    getAllRooms() {
        if (this.cachedRooms) {
            return this.cachedRooms;
        }
        return Storage.load(this.STORAGE_KEY) || [];
    },

    /**
     * Get available rooms
     * @returns {Array}
     */
    getAvailableRooms() {
        const rooms = this.getAllRooms();
        return rooms.filter(room => room.status === 'available');
    },

    /**
     * Get room by ID
     * @param {string} id
     * @returns {Object|null}
     */
    getRoomById(id) {
        const rooms = this.getAllRooms();
        return rooms.find(room => room.id === id) || null;
    },

    /**
     * Assign tenant to room
     * @param {string} roomId
     * @param {string} tenantId
     * @returns {Promise<Object|null>}
     */
    async assignTenant(roomId, tenantId) {
        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.assignTenantLocal(roomId, tenantId);
            }

            // Update room
            const { data: roomData, error: roomError } = await supabase
                .from('rooms')
                .update({ tenant_id: tenantId, status: 'occupied' })
                .eq('id', roomId)
                .select()
                .single();

            if (roomError) throw roomError;

            // Update user's room_id
            await supabase
                .from('users')
                .update({ room_id: roomId })
                .eq('id', tenantId);

            // Refresh cache
            await this.getAllRoomsAsync();

            return this.convertRoom(roomData);
        } catch (error) {
            console.error('Error assigning tenant:', error);
            return null;
        }
    },

    /**
     * Assign tenant locally (fallback)
     */
    assignTenantLocal(roomId, tenantId) {
        const rooms = Storage.load(this.STORAGE_KEY) || [];
        const roomIndex = rooms.findIndex(room => room.id === roomId);
        if (roomIndex === -1) return null;

        rooms[roomIndex].tenantId = tenantId;
        rooms[roomIndex].status = 'occupied';
        Storage.save(this.STORAGE_KEY, rooms);
        this.cachedRooms = rooms;

        const users = Storage.load('users') || [];
        const userIndex = users.findIndex(u => u.id === tenantId);
        if (userIndex !== -1) {
            users[userIndex].roomId = roomId;
            Storage.save('users', users);
        }

        return rooms[roomIndex];
    },

    /**
     * Remove tenant from room
     * @param {string} roomId
     * @returns {Promise<Object|null>}
     */
    async removeTenant(roomId) {
        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.removeTenantLocal(roomId);
            }

            // Get current tenant
            const room = this.getRoomById(roomId);
            const tenantId = room?.tenantId;

            // Update room
            const { data, error } = await supabase
                .from('rooms')
                .update({ tenant_id: null, status: 'available' })
                .eq('id', roomId)
                .select()
                .single();

            if (error) throw error;

            // Update user's room_id
            if (tenantId) {
                await supabase
                    .from('users')
                    .update({ room_id: null })
                    .eq('id', tenantId);
            }

            await this.getAllRoomsAsync();
            return this.convertRoom(data);
        } catch (error) {
            console.error('Error removing tenant:', error);
            return null;
        }
    },

    /**
     * Remove tenant locally (fallback)
     */
    removeTenantLocal(roomId) {
        const rooms = Storage.load(this.STORAGE_KEY) || [];
        const roomIndex = rooms.findIndex(room => room.id === roomId);
        if (roomIndex === -1) return null;

        const tenantId = rooms[roomIndex].tenantId;
        rooms[roomIndex].tenantId = null;
        rooms[roomIndex].status = 'available';
        Storage.save(this.STORAGE_KEY, rooms);
        this.cachedRooms = rooms;

        if (tenantId) {
            const users = Storage.load('users') || [];
            const userIndex = users.findIndex(u => u.id === tenantId);
            if (userIndex !== -1) {
                users[userIndex].roomId = null;
                Storage.save('users', users);
            }
        }

        return rooms[roomIndex];
    },

    /**
     * Update room details
     * @param {string} roomId
     * @param {Object} updates
     * @returns {Promise<Object|null>}
     */
    async updateRoom(roomId, updates) {
        try {
            const supabase = SupabaseClient.getClient();
            if (!supabase) {
                return this.updateRoomLocal(roomId, updates);
            }

            const updateData = {};
            if (updates.roomNumber !== undefined) updateData.room_number = updates.roomNumber;
            if (updates.type !== undefined) updateData.type = updates.type;
            if (updates.price !== undefined) updateData.price = updates.price;
            if (updates.description !== undefined) updateData.description = updates.description;
            if (updates.status !== undefined) updateData.status = updates.status;
            if (updates.floor !== undefined) updateData.floor = updates.floor;

            const { data, error } = await supabase
                .from('rooms')
                .update(updateData)
                .eq('id', roomId)
                .select()
                .single();

            if (error) throw error;

            await this.getAllRoomsAsync();
            return this.convertRoom(data);
        } catch (error) {
            console.error('Error updating room:', error);
            return null;
        }
    },

    /**
     * Update room locally (fallback)
     */
    updateRoomLocal(roomId, updates) {
        const rooms = Storage.load(this.STORAGE_KEY) || [];
        const roomIndex = rooms.findIndex(room => room.id === roomId);
        if (roomIndex === -1) return null;

        const allowedFields = ['roomNumber', 'type', 'price', 'description', 'status', 'floor'];
        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                rooms[roomIndex][field] = updates[field];
            }
        });

        Storage.save(this.STORAGE_KEY, rooms);
        this.cachedRooms = rooms;
        return rooms[roomIndex];
    },

    /**
     * Convert Supabase room to app format
     */
    convertRoom(room) {
        return {
            id: room.id,
            roomNumber: room.room_number,
            floor: room.floor,
            type: room.type,
            price: parseFloat(room.price),
            status: room.status,
            description: room.description,
            tenantId: room.tenant_id,
            createdAt: room.created_at
        };
    },

    /**
     * Get room statistics
     * @returns {Object}
     */
    getStatistics() {
        const rooms = this.getAllRooms();
        return {
            total: rooms.length,
            available: rooms.filter(r => r.status === 'available').length,
            occupied: rooms.filter(r => r.status === 'occupied').length
        };
    },

    /**
     * Get room type display name
     */
    getTypeDisplayName(type) {
        const types = { 'aircon': 'ห้องแอร์', 'fan': 'ห้องพัดลม' };
        return types[type] || type;
    },

    /**
     * Get status display name
     */
    getStatusDisplayName(status) {
        const statuses = { 'available': 'ว่าง', 'occupied': 'มีผู้เช่า', 'pending': 'เตรียมย้ายออก' };
        return statuses[status] || status;
    }
};
