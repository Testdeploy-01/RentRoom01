/**
 * Main Application Logic
 * Dormitory Management System
 */

// Application State
const App = {
    currentPage: 'home',
    currentUser: null,

    // Initialize Application
    async init() {
        console.log('Dormitory Management System Initialized');
        
        // Initialize Supabase
        SupabaseClient.init();
        Storage.init();
        
        // Load data from Supabase or localStorage
        await this.loadData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check authentication
        this.checkAuth();
        
        // Show initial page
        UI.showPage('home');
    },

    // Load data from Supabase or Local Storage
    async loadData() {
        // Try to load from Supabase first
        if (SupabaseClient.isReady()) {
            try {
                await Rooms.getAllRoomsAsync();
                await Auth.getAllUsersAsync();
                await Issues.getAllIssuesAsync();
                console.log('Data loaded from Supabase');
                return;
            } catch (error) {
                console.error('Error loading from Supabase:', error);
            }
        }

        // Fallback to localStorage
        const rooms = Storage.load('rooms');
        if (!Storage.load('initialized') || !rooms || rooms.length < 8) {
            this.initializeSampleData();
            Storage.save('initialized', true);
        }
    },

    // Reset all data (for debugging)
    resetData() {
        Storage.clear();
        this.initializeSampleData();
        Storage.save('initialized', true);
        console.log('Data reset complete');
        location.reload();
    },

    // Initialize sample data
    initializeSampleData() {
        // Sample Owner Account
        const owner = {
            id: this.generateId(),
            username: 'owner',
            password: 'owner123',
            email: 'owner@dorm.com',
            phone: '0812345678',
            role: 'owner',
            createdAt: new Date().toISOString(),
            roomId: null
        };

        // Sample Tenant Account
        const tenant = {
            id: this.generateId(),
            username: 'tenant',
            password: 'tenant123',
            email: 'tenant@student.com',
            phone: '0898765432',
            role: 'tenant',
            createdAt: new Date().toISOString(),
            roomId: null
        };

        // Fixed 8 Rooms: Floor 1 (2 rooms), Floor 2 (3 rooms), Floor 3 (3 rooms)
        // ห้อง 101 = ห้องแอร์ 3,500 บาท, ห้องอื่น = ห้องพัดลม 3,000 บาท
        const rooms = [
            // ชั้น 1 - 2 ห้อง
            {
                id: 'room_101',
                roomNumber: '101',
                floor: 1,
                type: 'aircon',
                price: 3500,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'แอร์'],
                description: 'ห้องแอร์ ชั้น 1',
                tenantId: null
            },
            {
                id: 'room_102',
                roomNumber: '102',
                floor: 1,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 1',
                tenantId: null
            },
            // ชั้น 2 - 3 ห้อง
            {
                id: 'room_201',
                roomNumber: '201',
                floor: 2,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 2',
                tenantId: null
            },
            {
                id: 'room_202',
                roomNumber: '202',
                floor: 2,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 2',
                tenantId: null
            },
            {
                id: 'room_203',
                roomNumber: '203',
                floor: 2,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 2',
                tenantId: null
            },
            // ชั้น 3 - 3 ห้อง
            {
                id: 'room_301',
                roomNumber: '301',
                floor: 3,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 3',
                tenantId: null
            },
            {
                id: 'room_302',
                roomNumber: '302',
                floor: 3,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 3',
                tenantId: null
            },
            {
                id: 'room_303',
                roomNumber: '303',
                floor: 3,
                type: 'fan',
                price: 3000,
                status: 'available',
                amenities: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเรียน', 'พัดลม'],
                description: 'ห้องพัดลม ชั้น 3',
                tenantId: null
            }
        ];

        // Save to storage
        Storage.save('users', [owner, tenant]);
        Storage.save('rooms', rooms);
        Storage.save('bookings', []);
        Storage.save('issues', []);

        console.log('Sample data initialized');
    },

    // Setup Event Listeners
    setupEventListeners() {
        // Navigation toggle (mobile)
        const navToggle = document.getElementById('navbar-toggle');
        const navMenu = document.getElementById('navbar-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
                navMenu.classList.remove('active');
            });
        });

        // Mobile contact button
        const contactBtn = document.getElementById('nav-contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                this.navigateTo('contact');
            });
        }

        // Logout
        const logoutBtn = document.getElementById('nav-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logout();
                this.checkAuth();
                this.navigateTo('home');
                UI.showNotification('ออกจากระบบสำเร็จ', 'success');
            });
        }
    },

    // Navigate to page
    navigateTo(page) {
        // Check if page requires authentication
        if ((page === 'dashboard' || page === 'tenant' || page === 'owner' || page === 'bills') && !Auth.isAuthenticated()) {
            UI.showNotification('กรุณาเข้าสู่ระบบก่อน', 'warning');
            page = 'login';
        }
        
        // Bills page is owner only
        if (page === 'bills' && !Auth.hasRole('owner')) {
            UI.showNotification('เฉพาะเจ้าของหอเท่านั้น', 'warning');
            page = 'dashboard';
        }

        this.currentPage = page;
        UI.showPage(page);
        this.updateNavigation();
    },

    // Check authentication status
    checkAuth() {
        this.currentUser = Auth.getCurrentUser();
        this.updateNavigation();
    },

    // Update navigation based on auth status
    updateNavigation() {
        const loginLink = document.getElementById('nav-login');
        const dashboardLink = document.getElementById('nav-dashboard');
        const billsLink = document.getElementById('nav-bills');
        const logoutLink = document.getElementById('nav-logout');

        if (Auth.isAuthenticated()) {
            loginLink?.classList.add('hidden');
            dashboardLink?.classList.remove('hidden');
            logoutLink?.classList.remove('hidden');
            
            // Show bills link only for owner
            if (Auth.hasRole('owner')) {
                billsLink?.classList.remove('hidden');
            } else {
                billsLink?.classList.add('hidden');
            }
        } else {
            loginLink?.classList.remove('hidden');
            dashboardLink?.classList.add('hidden');
            billsLink?.classList.add('hidden');
            logoutLink?.classList.add('hidden');
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === this.currentPage) {
                link.classList.add('active');
            }
        });
    },

    // Generate unique ID
    generateId() {
        return 'id_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 11);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
