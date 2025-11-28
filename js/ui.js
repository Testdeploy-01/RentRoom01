/**
 * UI Module
 * Handles page rendering and UI utilities
 */

// Phosphor Icons Helper
const Icons = {
    home: '<i class="ph-duotone ph-house"></i>',
    bed: '<i class="ph-duotone ph-bed"></i>',
    phone: '<i class="ph-duotone ph-phone"></i>',
    user: '<i class="ph-duotone ph-user-circle"></i>',
    dashboard: '<i class="ph-duotone ph-squares-four"></i>',
    receipt: '<i class="ph-duotone ph-receipt"></i>',
    wrench: '<i class="ph-duotone ph-wrench"></i>',
    check: '<i class="ph-duotone ph-check-circle"></i>',
    users: '<i class="ph-duotone ph-users"></i>',
    water: '<i class="ph-duotone ph-drop"></i>',
    electric: '<i class="ph-duotone ph-lightning"></i>',
    location: '<i class="ph-duotone ph-map-pin"></i>',
    star: '<i class="ph-duotone ph-star"></i>',
    list: '<i class="ph-duotone ph-list-checks"></i>',
    walk: '<i class="ph-duotone ph-person-simple-walk"></i>',
    store: '<i class="ph-duotone ph-storefront"></i>',
    tools: '<i class="ph-duotone ph-hammer"></i>',
    building: '<i class="ph-duotone ph-buildings"></i>',
    ruler: '<i class="ph-duotone ph-ruler"></i>',
    money: '<i class="ph-duotone ph-money"></i>',
    snowflake: '<i class="ph-duotone ph-snowflake"></i>',
    fan: '<i class="ph-duotone ph-fan"></i>',
    camera: '<i class="ph-duotone ph-camera"></i>',
    shower: '<i class="ph-duotone ph-shower"></i>',
    bulb: '<i class="ph-duotone ph-lightbulb"></i>',
    pin: '<i class="ph-duotone ph-push-pin"></i>',
    card: '<i class="ph-duotone ph-credit-card"></i>',
    print: '<i class="ph-duotone ph-printer"></i>',
    send: '<i class="ph-duotone ph-paper-plane-tilt"></i>',
    wifi: '<i class="ph-duotone ph-wifi-high"></i>',
    clock: '<i class="ph-duotone ph-clock"></i>',
    warning: '<i class="ph-duotone ph-warning"></i>',
    info: '<i class="ph-duotone ph-info"></i>',
    calendar: '<i class="ph-duotone ph-calendar"></i>',
    edit: '<i class="ph-duotone ph-pencil-simple"></i>',
    trash: '<i class="ph-duotone ph-trash"></i>',
    plus: '<i class="ph-duotone ph-plus-circle"></i>',
    food: '<i class="ph-duotone ph-bowl-food"></i>',
    map: '<i class="ph-duotone ph-map-trifold"></i>',
    signOut: '<i class="ph-duotone ph-sign-out"></i>',
    qr: '<i class="ph-duotone ph-qr-code"></i>',
    bank: '<i class="ph-duotone ph-bank"></i>',
};

const UI = {
    /**
     * Show a specific page
     * @param {string} pageName - Page name to show
     */
    showPage(pageName) {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        // Render page content based on page name
        let content = '';
        switch (pageName) {
            case 'home':
                content = this.renderHomePage();
                break;
            case 'rooms':
                content = this.renderRoomsPage();
                break;
            case 'contact':
                content = this.renderContactPage();
                break;
            case 'login':
                content = this.renderLoginPage();
                break;
            case 'dashboard':
                content = this.renderDashboard();
                break;
            case 'bills':
                content = this.renderBillsPage();
                break;
            default:
                content = this.renderHomePage();
        }

        mainContent.innerHTML = content;
        this.attachPageEventListeners(pageName);
    },

    /**
     * Render home page
     */
    renderHomePage() {
        const rooms = Rooms.getAvailableRooms().slice(0, 4);
        const totalRooms = Rooms.getAllRooms().length;
        const availableCount = Rooms.getAvailableRooms().length;
        const tenantCount = Auth.getUsersByRole('tenant').length;
        const secondaryCtaPage = Auth.isAuthenticated() ? 'dashboard' : 'login';

        return `
            <div class="page active">
                <section class="hero-section">
                    <div class="container">
                        <div class="hero-shell">
                            <div class="hero-left">
                                <span class="hero-badge">${Icons.building} หอพักธรานภากร</span>
                                <h1 class="hero-title">หอพักใกล้มหาวิทยาลัย</h1>
                                <p class="hero-subtitle">ร้านอาหาร ร้านสะดวกซื้อครบ นัดดูห้องติดต่อเจ้าของหอโดยตรง</p>
                                <div class="hero-actions">
                                    <a href="#" class="btn btn-primary btn-lg" data-page="contact">${Icons.phone} ติดต่อเจ้าของหอ</a>
                                    <a href="#map-section" class="btn btn-ghost btn-lg">${Icons.location} ดูแผนที่</a>
                                </div>

                                <div class="hero-pill-grid">
                                    <div class="pill-card">
                                        <span class="pill-icon">${Icons.walk}</span>
                                        <div class="pill-text">
                                            <strong>5 นาที</strong>
                                            <span>ถึง ม.ราชภัฏสงขลา</span>
                                        </div>
                                    </div>
                                    <div class="pill-card">
                                        <span class="pill-icon">${Icons.store}</span>
                                        <div class="pill-text">
                                            <strong>5 นาที</strong>
                                            <span>ถึง 7-Eleven และตลาด</span>
                                        </div>
                                    </div>
                                    <div class="pill-card">
                                        <span class="pill-icon">${Icons.tools}</span>
                                        <div class="pill-text">
                                            <strong>ซ่อมแซม</strong>
                                            <span>มีทีมช่างประจำ</span>
                                        </div>
                                    </div>
                                    <div class="pill-card">
                                        <span class="pill-icon">${Icons.home}</span>
                                        <div class="pill-text">
                                            <strong>${totalRooms} ห้อง</strong>
                                            <span>เจ้าของดูแลเอง</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="hero-right">
                                <div class="hero-spotlight">
                                    <div class="spotlight-top">
                                        <span class="spotlight-kicker">ขั้นตอนง่ายๆ</span>
                                        <div class="spotlight-metric">
                                            <div class="metric-value">${totalRooms} ห้อง</div>
                                            <div class="metric-label">เจ้าของดูแลเอง</div>
                                        </div>
                                    </div>
                                    <div class="steps-timeline">
                                        <div class="timeline-step">
                                            <div class="timeline-badge">1</div>
                                            <div class="timeline-content">
                                                <div class="timeline-icon">${Icons.phone}</div>
                                                <div class="timeline-text">
                                                    <strong>ติดต่อเจ้าของ</strong>
                                                    <span>สอบถามรายละเอียด โทร 081-234-5678</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-step">
                                            <div class="timeline-badge">2</div>
                                            <div class="timeline-content">
                                                <div class="timeline-icon">${Icons.home}</div>
                                                <div class="timeline-text">
                                                    <strong>นัดดูห้อง</strong>
                                                    <span>ตกลงวันเวลา พร้อมพาเข้าดูห้อง</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-step">
                                            <div class="timeline-badge">3</div>
                                            <div class="timeline-content">
                                                <div class="timeline-icon"><i class="ph-duotone ph-file-text"></i></div>
                                                <div class="timeline-text">
                                                    <strong>ทำสัญญา</strong>
                                                    <span>ค่าเช่า + มัดจำ เงื่อนไขชัดเจน</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-step">
                                            <div class="timeline-badge">4</div>
                                            <div class="timeline-content">
                                                <div class="timeline-icon"><i class="ph-duotone ph-key"></i></div>
                                                <div class="timeline-text">
                                                    <strong>เข้าพัก</strong>
                                                    <span>ขนของพร้อมเข้าอยู่</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        <h2 class="section-title">ทำความรู้จักหอของเรา</h2>
                        <div class="info-grid">
                            <div class="card">
                                <h3>${Icons.location} ทำเล</h3>
                                <p>หอพักอยู่ซอย 7 · ใกล้มหาวิทยาลัยราชภัฏสงขลา · ใกล้มหาวิทยาลัยทักษิณ</p>
                            </div>
                            <div class="card">
                                <h3>${Icons.star} สิ่งอำนวยความสะดวก</h3>
                                <p>WiFi ฟรี · ที่จอดรถ · กล้องวงจรปิด · ใกล้ร้านซักผ้าหยอดเหรียญ</p>
                            </div>
                            <div class="card">
                                <h3>${Icons.list} กฎการอยู่ร่วมกัน</h3>
                                <p>ห้ามเลี้ยงสัตว์ · ห้ามสูบบุหรี่ในห้อง · ห้ามส่งเสียงดังรบกวนผู้อื่น</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ห้องตัวอย่าง -->
                <section class="section sample-room-section">
                    <div class="container">
                        <div class="mb-3">
                            <h2 class="section-title mb-1">ห้องตัวอย่าง</h2>
                            <p class="text-secondary">ดูรายละเอียดห้องพักแบบครบถ้วนก่อนตัดสินใจ</p>
                        </div>
                        <div class="sample-room-grid">
                            ${this.renderSampleRoomCard('aircon')}
                            ${this.renderSampleRoomCard('fan')}
                        </div>
                    </div>
                </section>

                <section class="section section-soft">
                    <div class="container">
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <h2 class="section-title mb-0">ห้องว่าง</h2>
                                <p class="text-secondary mb-0" style="font-size: 0.9rem;">ดูห้องที่ชอบ แล้วติดต่อเจ้าของเพื่อจองคิว</p>
                            </div>
                            <a href="#" class="btn btn-secondary" data-page="rooms">ดูทั้งหมด</a>
                        </div>
                        <div class="room-grid">
                            ${rooms.length > 0 ? rooms.map(room => this.renderRoomCard(room)).join('') : 
                            '<div class="empty-state"><p>ไม่มีห้องว่างในขณะนี้</p></div>'}
                        </div>
                    </div>
                </section>

                <!-- แผนที่ -->
                <section class="section" id="map-section">
                    <div class="container">
                        <h2 class="section-title">แผนที่และที่ตั้ง</h2>
                        <p class="text-secondary mb-3">ใกล้มหาวิทยาลัยราชภัฏสงขลา · เดินเพียง 5 นาทีถึงมหาวิทยาลัย</p>
                        <div class="map-container">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.6515415737675!2d100.6119105522193!3d7.171441663745058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d32ce87369b7f%3A0x3c6b99e70c86f3ab!2sSongkhla%20Rajabhat%20University!5e0!3m2!1sen!2sth!4v1764269199810!5m2!1sen!2sth"
                                width="100%" 
                                height="400" 
                                style="border:0; border-radius: 16px;" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                            <a href="https://maps.app.goo.gl/qqBmHhBdMPrMn2Fe6" target="_blank" class="map-link">
                                ${Icons.map} เปิดใน Google Maps
                            </a>
                        </div>
                        <div class="map-info mt-3">
                            <div class="map-info-item">
                                <span class="map-icon">${Icons.walk}</span>
                                <span>เดิน 5 นาที ถึงมหาวิทยาลัยราชภัฏสงขลา</span>
                            </div>
                            <div class="map-info-item">
                                <span class="map-icon">${Icons.store}</span>
                                <span>ใกล้ร้านสะดวกซื้อ 7-Eleven</span>
                            </div>
                            <div class="map-info-item">
                                <span class="map-icon">${Icons.food}</span>
                                <span>ใกล้ร้านอาหารและตลาด</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Render rooms page
     */
    renderRoomsPage() {
        const rooms = Rooms.getAllRooms();
        const floor1 = rooms.filter(r => r.floor === 1 || r.roomNumber.startsWith('1'));
        const floor2 = rooms.filter(r => r.floor === 2 || r.roomNumber.startsWith('2'));
        const floor3 = rooms.filter(r => r.floor === 3 || r.roomNumber.startsWith('3'));
        const availableCount = rooms.filter(r => r.status === 'available').length;
        
        return `
            <div class="page active">
                <!-- ห้องพักทั้งหมด -->
                <section class="section">
                    <div class="container">
                        <div class="mb-4">
                            <h2 class="section-title mb-1">ห้องพักทั้งหมด</h2>
                            <p class="text-secondary">ทั้งหมด ${rooms.length} ห้อง · ว่าง ${availableCount} ห้อง</p>
                        </div>
                        
                        <!-- ชั้น 1 -->
                        <div class="mb-4">
                            <h3 class="floor-title">ชั้น 1 <span class="floor-count">${floor1.length} ห้อง</span></h3>
                            <div class="room-grid">
                                ${floor1.map(room => this.renderRoomCard(room)).join('')}
                            </div>
                        </div>
                        
                        <!-- ชั้น 2 -->
                        <div class="mb-4">
                            <h3 class="floor-title">ชั้น 2 <span class="floor-count">${floor2.length} ห้อง</span></h3>
                            <div class="room-grid">
                                ${floor2.map(room => this.renderRoomCard(room)).join('')}
                            </div>
                        </div>
                        
                        <!-- ชั้น 3 -->
                        <div class="mb-4">
                            <h3 class="floor-title">ชั้น 3 <span class="floor-count">${floor3.length} ห้อง</span></h3>
                            <div class="room-grid">
                                ${floor3.map(room => this.renderRoomCard(room)).join('')}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Render contact page
     */
    renderContactPage() {
        return `
            <div class="page active">
                <section class="section contact-section">
                    <div class="container">
                        <div class="contact-layout">
                            <div class="contact-panel">
                                <span class="contact-chip">${Icons.phone} ช่องทางติดต่อ</span>
                                <h2 class="contact-title">นัดดูห้อง ติดต่อทางนี้เท่านั้น!</h2>
                                <p class="contact-subtitle">ติดต่อเจ้าของหอโดยตรง เลือกช่องทางที่สะดวกแล้วโทรหรือแชทได้เลย</p>

                                <div class="contact-badges">
                                    <div class="contact-badge">${Icons.warning} กรุณาติดต่อผ่านช่องทางด้านบนเท่านั้น</div>
                                    <div class="contact-badge">${Icons.clock} เปิดให้นัดดูห้อง: 09:00 - 18:00 น.</div>
                                </div>
                            </div>

                            <div class="contact-card-grid">
                                <div class="contact-card">
                                    <div class="contact-card-header">
                                        <div class="contact-avatar">${Icons.user}</div>
                                        <div>
                                            <div class="contact-name">ลุงเอียด</div>
                                            <div class="contact-role">เจ้าของหอ</div>
                                        </div>
                                    </div>
                                    <div class="contact-actions">
                                        <a href="tel:0812345678" class="contact-btn phone">
                                            ${Icons.phone}
                                            <span>081-234-5678</span>
                                        </a>
                                        <a href="https://line.me/ti/p/@sompong" target="_blank" class="contact-btn line">
                                            <i class="ph-fill ph-chat-circle-text"></i>
                                            <span>@sompong</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="contact-card">
                                    <div class="contact-card-header">
                                        <div class="contact-avatar">${Icons.user}</div>
                                        <div>
                                            <div class="contact-name">ป้าเอ๋ย</div>
                                            <div class="contact-role">เจ้าของหอ</div>
                                        </div>
                                    </div>
                                    <div class="contact-actions">
                                        <a href="tel:0898765432" class="contact-btn phone">
                                            ${Icons.phone}
                                            <span>089-876-5432</span>
                                        </a>
                                        <a href="https://line.me/ti/p/@paaey" target="_blank" class="contact-btn line">
                                            <i class="ph-fill ph-chat-circle-text"></i>
                                            <span>@paaey</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Get sample room data with images
     */
    getSampleRoomData(type) {
        const isAircon = type === 'aircon';
        return {
            type: type,
            name: isAircon ? 'ห้องแอร์' : 'ห้องพัดลม',
            price: isAircon ? 3500 : 3000,
            size: '16 ตร.ม.',
            features: isAircon 
                ? ['เครื่องปรับอากาศ', 'เตียง 3.5 ฟุต', 'ตู้เสื้อผ้า', 'โต๊ะเขียนหนังสือ', 'ห้องน้ำในตัว', 'WiFi ฟรี', 'ระเบียงส่วนตัว', 'กุญแจการ์ด']
                : ['พัดลมเพดาน', 'เตียง 3.5 ฟุต', 'ตู้เสื้อผ้า', 'โต๊ะเขียนหนังสือ', 'ห้องน้ำในตัว', 'WiFi ฟรี', 'ระเบียงส่วนตัว', 'กุญแจการ์ด'],
            images: isAircon ? [
                { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', label: 'ภาพรวมห้อง' },
                { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', label: 'เตียงนอน' },
                { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop', label: 'ห้องน้ำ' },
                { url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop', label: 'โต๊ะทำงาน' },
                { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop', label: 'ตู้เสื้อผ้า' },
                { url: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=800&h=600&fit=crop', label: 'แอร์' }
            ] : [
                { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', label: 'ภาพรวมห้อง' },
                { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop', label: 'เตียงนอน' },
                { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop', label: 'ห้องน้ำ' },
                { url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=600&fit=crop', label: 'โต๊ะทำงาน' },
                { url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&h=600&fit=crop', label: 'ตู้เสื้อผ้า' },
                { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop', label: 'พัดลม' }
            ],
            utilities: [
                { name: 'ค่าน้ำ', price: 'ตามมิเตอร์ (หน่วยละ 18 บาท)' },
                { name: 'ค่าไฟ', price: 'ตามมิเตอร์ (หน่วยละ 7 บาท)' },
                { name: 'ค่าอินเทอร์เน็ต', price: 'ฟรี' },
                { name: 'ค่าส่วนกลาง', price: 'รวมในค่าเช่า' }
            ],
            rules: [
                'ห้ามเลี้ยงสัตว์',
                'ห้ามสูบบุหรี่ในห้อง',
                'เวลาเข้า-ออก 06:00 - 23:00',
                'ผู้มาเยี่ยมต้องลงทะเบียน'
            ],
            description: isAircon 
                ? 'ห้องพักติดแอร์ เย็นสบาย เหมาะสำหรับผู้ที่ต้องการความเย็นตลอดทั้งวัน พร้อมสิ่งอำนวยความสะดวกครบครัน'
                : 'ห้องพักพัดลม ประหยัดค่าไฟ เหมาะสำหรับผู้ที่ชอบอากาศธรรมชาติ พร้อมสิ่งอำนวยความสะดวกครบครัน'
        };
    },

    /**
     * Render sample room card for showcase
     */
    renderSampleRoomCard(type) {
        const roomData = this.getSampleRoomData(type);
        const isAircon = type === 'aircon';

        return `
            <div class="sample-room-card" data-room-type="${type}">
                <div class="sample-room-gallery">
                    <div class="sample-room-main-image">
                        <img src="${roomData.images[0].url}" alt="${roomData.name}" loading="lazy">
                        <div class="sample-room-badge">${isAircon ? Icons.snowflake + ' แอร์' : Icons.fan + ' พัดลม'}</div>
                        <div class="sample-room-image-count">${Icons.camera} ${roomData.images.length} รูป</div>
                    </div>
                    <div class="sample-room-thumbs">
                        ${roomData.images.slice(1, 4).map((img, i) => `
                            <div class="sample-thumb">
                                <img src="${img.url}" alt="${img.label}" loading="lazy">
                                ${i === 2 && roomData.images.length > 4 ? `<div class="thumb-more">+${roomData.images.length - 4}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="sample-room-content">
                    <h3 class="sample-room-title">${roomData.name}</h3>
                    <p class="sample-room-desc">${roomData.description}</p>
                    <div class="sample-room-meta">
                        <span>${Icons.ruler} ${roomData.size}</span>
                        <span>${Icons.money} ฿${roomData.price.toLocaleString()}/เดือน</span>
                    </div>
                    <div class="sample-room-features">
                        ${roomData.features.slice(0, 4).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    </div>
                    <button class="btn btn-secondary btn-block mt-2" onclick="UI.showRoomDetailModal('${type}')">
                        ดูรายละเอียดและรูปภาพทั้งหมด
                    </button>
                </div>
            </div>
        `;
    },

    // Current gallery index for modal
    currentGalleryIndex: 0,
    currentGalleryImages: [],

    /**
     * Show room detail modal
     */
    showRoomDetailModal(type) {
        const roomData = this.getSampleRoomData(type);
        const isAircon = type === 'aircon';
        
        // Store images for gallery navigation
        this.currentGalleryImages = roomData.images;
        this.currentGalleryIndex = 0;

        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay active" id="room-detail-modal">
                <div class="modal modal-xl">
                    <div class="modal-header">
                        <h3 class="modal-title">${roomData.name} - รายละเอียด</h3>
                        <button class="modal-close" onclick="UI.closeRoomDetailModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <!-- Room Images Gallery -->
                        <div class="room-gallery-full">
                            <div class="gallery-main-container">
                                <button class="gallery-nav gallery-prev" onclick="UI.prevGalleryImage()">❮</button>
                                <div class="gallery-main-image" id="gallery-main-image">
                                    <img src="${roomData.images[0].url}" alt="${roomData.images[0].label}" id="gallery-current-img">
                                    <div class="gallery-image-label" id="gallery-image-label">${roomData.images[0].label}</div>
                                    <div class="gallery-counter" id="gallery-counter">1 / ${roomData.images.length}</div>
                                </div>
                                <button class="gallery-nav gallery-next" onclick="UI.nextGalleryImage()">❯</button>
                            </div>
                            <div class="gallery-thumbnails" id="gallery-thumbnails">
                                ${roomData.images.map((img, i) => `
                                    <div class="gallery-thumb-item ${i === 0 ? 'active' : ''}" onclick="UI.setGalleryImage(${i})">
                                        <img src="${img.url}" alt="${img.label}" loading="lazy">
                                        <span>${img.label}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Room Info -->
                        <div class="room-detail-info">
                            <div class="room-detail-header">
                                <div>
                                    <h4>${roomData.name}</h4>
                                    <p class="text-secondary">${roomData.description}</p>
                                </div>
                                <div class="room-detail-price">
                                    <span class="price-value">฿${roomData.price.toLocaleString()}</span>
                                    <span class="price-unit">/เดือน</span>
                                </div>
                            </div>

                            <div class="room-detail-meta">
                                <div class="meta-item">
                                    <span class="meta-icon">${Icons.ruler}</span>
                                    <span>ขนาด ${roomData.size}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-icon">${isAircon ? Icons.snowflake : Icons.fan}</span>
                                    <span>${isAircon ? 'ติดแอร์' : 'พัดลมเพดาน'}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-icon">${Icons.shower}</span>
                                    <span>ห้องน้ำในตัว</span>
                                </div>
                            </div>

                            <!-- Features -->
                            <div class="room-detail-section">
                                <h5>${Icons.star} สิ่งอำนวยความสะดวก</h5>
                                <div class="feature-grid">
                                    ${roomData.features.map(f => `<span class="feature-item"><i class="ph-fill ph-check"></i> ${f}</span>`).join('')}
                                </div>
                            </div>

                            <!-- Utilities -->
                            <div class="room-detail-section">
                                <h5>${Icons.bulb} ค่าสาธารณูปโภค</h5>
                                <div class="utility-list">
                                    ${roomData.utilities.map(u => `
                                        <div class="utility-item">
                                            <span>${u.name}</span>
                                            <span>${u.price}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Rules -->
                            <div class="room-detail-section">
                                <h5>📋 กฎระเบียบ</h5>
                                <ul class="rules-list">
                                    ${roomData.rules.map(r => `<li>${r}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="UI.closeRoomDetailModal()">ปิด</button>
                        <a href="#" class="btn btn-primary" data-page="rooms" onclick="UI.closeRoomDetailModal()">ดูห้องว่าง</a>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add click outside to close
        const modal = document.getElementById('room-detail-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeRoomDetailModal();
            }
        });
    },

    /**
     * Close room detail modal
     */
    closeRoomDetailModal() {
        const modal = document.getElementById('room-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        this.currentGalleryIndex = 0;
        this.currentGalleryImages = [];
    },

    /**
     * Set gallery image by index
     */
    setGalleryImage(index) {
        if (index < 0 || index >= this.currentGalleryImages.length) return;
        
        this.currentGalleryIndex = index;
        const img = this.currentGalleryImages[index];
        
        // Update main image
        const mainImg = document.getElementById('gallery-current-img');
        const label = document.getElementById('gallery-image-label');
        const counter = document.getElementById('gallery-counter');
        
        if (mainImg) mainImg.src = img.url;
        if (mainImg) mainImg.alt = img.label;
        if (label) label.textContent = img.label;
        if (counter) counter.textContent = `${index + 1} / ${this.currentGalleryImages.length}`;
        
        // Update thumbnail active state
        const thumbs = document.querySelectorAll('.gallery-thumb-item');
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    },

    /**
     * Next gallery image
     */
    nextGalleryImage() {
        const nextIndex = (this.currentGalleryIndex + 1) % this.currentGalleryImages.length;
        this.setGalleryImage(nextIndex);
    },

    /**
     * Previous gallery image
     */
    prevGalleryImage() {
        const prevIndex = (this.currentGalleryIndex - 1 + this.currentGalleryImages.length) % this.currentGalleryImages.length;
        this.setGalleryImage(prevIndex);
    },

    /**
     * Render room card
     */
    renderRoomCard(room) {
        const statusClass = room.status === 'available' ? 'badge-available' : 
                           room.status === 'occupied' ? 'badge-occupied' : 'badge-pending';
        return `
            <div class="card room-card" data-room-id="${room.id}">
                <div class="room-image">${Icons.bed}</div>
                <div class="room-content">
                    <div class="flex justify-between items-center">
                        <span class="room-number">ห้อง ${room.roomNumber}</span>
                        <span class="badge ${statusClass}">${Rooms.getStatusDisplayName(room.status)}</span>
                    </div>
                    <p class="room-type">${Rooms.getTypeDisplayName(room.type)}</p>
                    <p class="room-desc">${room.description || ''}</p>
                    <p class="room-price">฿${room.price.toLocaleString()} <span>/เดือน</span></p>
                </div>
            </div>
        `;
    },

    /**
     * Render login page
     */
    renderLoginPage() {
        return `
            <div class="page active">
                <section class="section" style="display: flex; align-items: center; min-height: calc(100vh - 140px);">
                    <div class="container" style="max-width: 420px;">
                        <div class="card">
                            <h2 class="text-center mb-1" style="font-size: 1.6rem;">เข้าสู่ระบบ</h2>
                            <p class="text-center text-secondary mb-3" style="font-size: 0.95rem;">ใช้บัญชีที่ได้รับจากหอหรือสมัครใหม่เพื่อเริ่มจัดการห้องพัก</p>
                            <form id="login-form">
                                <div class="form-group">
                                    <label class="form-label">ชื่อผู้ใช้</label>
                                    <input type="text" class="form-input" id="login-username" placeholder="username" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">รหัสผ่าน</label>
                                    <input type="password" class="form-input" id="login-password" placeholder="••••••••" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">เข้าสู่ระบบ</button>
                            </form>
                            <p class="text-center mt-3 text-secondary" style="font-size: 0.85rem;">
                                หากยังไม่มีบัญชี กรุณาติดต่อเจ้าของหอพัก
                            </p>
                            <div class="test-info mt-3">
                                <p><strong>ทดสอบระบบ:</strong></p>
                                <p>เจ้าของหอ: owner / owner123</p>
                                <p>ผู้เช่า: tenant / tenant123</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Render dashboard based on user role
     */
    renderDashboard() {
        const user = Auth.getCurrentUser();
        if (!user) return this.renderLoginPage();

        if (user.role === 'owner') {
            return this.renderOwnerDashboard();
        } else {
            return this.renderTenantDashboard();
        }
    },

    /**
     * Render tenant dashboard
     */
    renderTenantDashboard() {
        const user = Auth.getCurrentUser();
        const issues = Issues.getIssuesByTenant(user.id);
        const myRoom = user.roomId ? Rooms.getRoomById(user.roomId) : null;

        return `
            <div class="page active">
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">สวัสดี, ${user.displayName || user.username}</h2>

                        <!-- My Room -->
                        ${myRoom ? `
                        <div class="card mb-3">
                            <h3 class="card-title">${Icons.home} ห้องของฉัน</h3>
                            <div class="card-body">
                                <p><strong>ห้อง:</strong> ${myRoom.roomNumber}</p>
                                <p><strong>ประเภท:</strong> ${Rooms.getTypeDisplayName(myRoom.type)}</p>
                                <p><strong>ค่าเช่า:</strong> ฿${myRoom.price.toLocaleString()} /เดือน</p>
                            </div>
                        </div>
                        ` : `
                        <div class="card mb-3">
                            <h3 class="card-title">${Icons.home} ยังไม่มีห้องพัก</h3>
                            <p class="text-secondary">กรุณาติดต่อเจ้าของหอพักเพื่อเข้าพัก</p>
                        </div>
                        `}

                        <!-- WiFi Info -->
                        ${myRoom ? `
                        <div class="card mb-3" style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); border: 1px solid #93c5fd;">
                            <h3 class="card-title" style="color: #1e40af;">${Icons.wifi} WiFi หอพัก</h3>
                            <div class="card-body">
                                <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                                    <div>
                                        <p style="font-size: 0.8rem; color: #3b82f6; margin-bottom: 0.25rem;">ชื่อผู้ใช้</p>
                                        <p style="font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin: 0;">R${myRoom.roomNumber}</p>
                                    </div>
                                    <div>
                                        <p style="font-size: 0.8rem; color: #3b82f6; margin-bottom: 0.25rem;">รหัสผ่าน</p>
                                        <p style="font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin: 0;">${myRoom.roomNumber}_50107</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ` : ''}

                        <!-- Issue Report Form -->
                        ${myRoom ? `
                        <div class="card mb-3">
                            <h3 class="card-title">${Icons.wrench} แจ้งปัญหา</h3>
                            <form id="issue-form">
                                <div class="form-group">
                                    <label class="form-label">รายละเอียดปัญหา</label>
                                    <textarea class="form-textarea" id="issue-description" placeholder="อธิบายปัญหาที่พบ เช่น ไฟไม่ติด, น้ำรั่ว, แอร์เสีย ฯลฯ" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">${Icons.send} ส่งแจ้งปัญหา</button>
                            </form>
                        </div>
                        ` : ''}

                        <!-- My Issues -->
                        <div class="card">
                            <h3 class="card-title">${Icons.list} ประวัติการแจ้งปัญหา</h3>
                            ${this.renderIssueList(issues)}
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Render owner dashboard
     */
    renderOwnerDashboard() {
        const roomStats = Rooms.getStatistics();
        const issueStats = Issues.getStatistics();
        const allIssues = Issues.getAllIssuesWithDetails().filter(i => i.status !== 'resolved');
        const tenants = Auth.getUsersByRole('tenant').filter(t => t.roomId);
        const allTenants = Auth.getUsersByRole('tenant');

        return `
            <div class="page active">
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">แดชบอร์ดเจ้าของหอ</h2>
                        
                        <!-- Stats -->
                        <div class="stats-grid mb-4">
                            <div class="stat-card">
                                <div class="stat-icon primary">${Icons.home}</div>
                                <div class="stat-value">${roomStats.total}</div>
                                <div class="stat-label">ห้องทั้งหมด</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon success">${Icons.check}</div>
                                <div class="stat-value">${roomStats.available}</div>
                                <div class="stat-label">ห้องว่าง</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon warning">${Icons.users}</div>
                                <div class="stat-value">${tenants.length}</div>
                                <div class="stat-label">ผู้เช่าปัจจุบัน</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon danger">${Icons.wrench}</div>
                                <div class="stat-value">${issueStats.pending + issueStats.inProgress}</div>
                                <div class="stat-label">ปัญหารอแก้ไข</div>
                            </div>
                        </div>

                        <!-- Add Tenant Form -->
                        <div class="card mb-3">
                            <h3 class="card-title">${Icons.plus} เพิ่มลูกบ้านใหม่</h3>
                            <form id="add-tenant-form">
                                <div class="grid gap-2" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
                                    <div class="form-group">
                                        <label class="form-label">ชื่อผู้เช่า <span style="color: red;">*</span></label>
                                        <input type="text" class="form-input" id="tenant-displayname" placeholder="ชื่อ-นามสกุล(ชื่อเล่น)" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">ชื่อผู้ใช้ (เข้าระบบ) <span style="color: red;">*</span></label>
                                        <input type="text" class="form-input" id="tenant-username" placeholder="R101" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">รหัสผ่าน <span style="color: red;">*</span></label>
                                        <input type="password" class="form-input" id="tenant-password" placeholder="รหัสผ่าน" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">LINE ID / ชื่อ LINE</label>
                                        <input type="text" class="form-input" id="tenant-line" placeholder="@lineid หรือ ชื่อไลน์">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">เบอร์โทรศัพท์</label>
                                        <input type="tel" class="form-input" id="tenant-phone" placeholder="0812345678">
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">เพิ่มลูกบ้าน</button>
                            </form>
                        </div>

                        <!-- Issues -->
                        <div class="card mb-3">
                            <h3 class="card-title">${Icons.wrench} ปัญหาที่แจ้ง (${allIssues.length})</h3>
                            ${allIssues.length > 0 ? `
                            <div class="issue-list">
                                ${[...allIssues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(i => {
                                    const tenant = i.tenant ? Auth.getUserById(i.tenant.id) : null;
                                    return `
                                    <div class="issue-card" style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                            <span style="font-weight: 600; color: #92400e;"><i class="ph-duotone ph-house"></i> ห้อง ${i.room?.roomNumber || 'N/A'} - ${tenant?.displayName || i.tenant?.username || 'ไม่ระบุ'}</span>
                                            <span style="font-size: 0.75rem; color: #b45309;"><i class="ph-duotone ph-clock"></i> ${i.category || new Date(i.createdAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                        </div>
                                        <p style="margin: 0 0 0.75rem 0; color: #78350f; font-size: 0.9rem; line-height: 1.5;">${i.description}</p>
                                        <button class="btn btn-sm btn-success" onclick="UI.markIssueResolved('${i.id}')">${Icons.check} แก้ไขแล้ว</button>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                            ` : '<p class="text-secondary">ไม่มีปัญหาที่รอแก้ไข</p>'}
                        </div>

                        <!-- Room Management -->
                        <div class="card mb-3">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="card-title mb-0">${Icons.bed} จัดการห้องพัก</h3>
                                <span class="badge">${Rooms.getAllRooms().length} ห้อง</span>
                            </div>
                            <div class="room-grid">
                                ${Rooms.getAllRooms().map(room => this.renderOwnerRoomCard(room)).join('')}
                            </div>
                        </div>

                        <!-- Tenant List -->
                        <div class="card">
                            <h3 class="card-title">${Icons.users} รายชื่อผู้เช่า (${tenants.length})</h3>
                            ${tenants.length > 0 ? `
                            <div class="table-container">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>ชื่อผู้เช่า</th>
                                            <th>ชื่อผู้ใช้</th>
                                            <th>รหัสผ่าน</th>
                                            <th>ห้อง</th>
                                            <th>LINE ID</th>
                                            <th>โทรศัพท์</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tenants.map(t => {
                                            const room = Rooms.getRoomById(t.roomId);
                                            const fullUser = Auth.getUserById(t.id);
                                            return `
                                            <tr>
                                                <td><strong>${t.displayName || t.username}</strong></td>
                                                <td style="color: #64748b; font-size: 0.85rem;">${t.username}</td>
                                                <td><code style="background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.8rem;">${fullUser?.password || '-'}</code></td>
                                                <td>${room?.roomNumber || 'ยังไม่มีห้อง'}</td>
                                                <td>${t.lineId || '-'}</td>
                                                <td>${t.phone || '-'}</td>
                                            </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                            ` : '<p class="text-secondary">ยังไม่มีผู้เช่า</p>'}
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Render owner room card with edit/delete buttons
     */
    renderOwnerRoomCard(room) {
        const statusClass = room.status === 'available' ? 'badge-available' : 
                           room.status === 'occupied' ? 'badge-occupied' : 'badge-pending';
        const tenant = room.tenantId ? Auth.getUserById(room.tenantId) : null;
        const tenants = Auth.getUsersByRole('tenant').filter(t => !t.roomId);
        
        return `
            <div class="card room-card room-card-manage" data-room-id="${room.id}">
                <div class="room-content">
                    <div class="flex justify-between items-center mb-1">
                        <span class="room-number">ห้อง ${room.roomNumber}</span>
                        <span class="badge ${statusClass}">${Rooms.getStatusDisplayName(room.status)}</span>
                    </div>
                    <p class="room-type">${Rooms.getTypeDisplayName(room.type)} · ชั้น ${room.floor || Math.floor(parseInt(room.roomNumber) / 100)}</p>
                    <p class="room-price">฿${room.price.toLocaleString()} <span>/เดือน</span></p>
                    ${tenant ? `
                        <div class="tenant-info mt-2" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.6rem 0.8rem;">
                            <p style="font-size: 0.85rem; font-weight: 600; color: #166534; margin: 0;">${Icons.user} ${tenant.displayName || 'ไม่ระบุชื่อ'}</p>
                            ${tenant.phone ? `<p style="font-size: 0.75rem; color: #15803d; margin: 0.2rem 0 0 0;">${Icons.phone} ${tenant.phone}</p>` : ''}
                            ${tenant.lineId ? `<p style="font-size: 0.75rem; color: #15803d; margin: 0.2rem 0 0 0;"><i class="ph-duotone ph-chat-circle-text"></i> ${tenant.lineId}</p>` : ''}
                        </div>
                    ` : ''}
                    
                    <div class="room-actions mt-2">
                        ${room.status === 'available' && tenants.length > 0 ? 
                            `<button class="btn btn-sm btn-success" onclick="UI.showAssignTenantModal('${room.id}')"><i class="ph-duotone ph-user-plus"></i> เพิ่มผู้เช่า</button>` : ''}
                        ${room.status === 'occupied' ? 
                            `<button class="btn btn-sm btn-warning" onclick="UI.markPrepareToMove('${room.id}')"><i class="ph-duotone ph-package"></i> เตรียมย้ายออก</button>` : ''}
                        ${room.status === 'pending' ? 
                            `<button class="btn btn-sm btn-danger" onclick="UI.confirmRemoveTenant('${room.id}')">${Icons.check} ย้ายออกแล้ว</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Show edit room modal
     */
    showEditRoomModal(roomId) {
        const room = Rooms.getRoomById(roomId);
        if (!room) return;

        const modalHTML = `
            <div class="modal-overlay active" id="edit-room-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${Icons.edit} แก้ไขห้อง ${room.roomNumber}</h3>
                        <button class="modal-close" onclick="UI.closeModal('edit-room-modal')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-room-form">
                            <input type="hidden" id="edit-room-id" value="${room.id}">
                            <div class="form-group">
                                <label class="form-label">เลขห้อง</label>
                                <input type="text" class="form-input" id="edit-room-number" value="${room.roomNumber}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">ประเภทห้อง</label>
                                <select class="form-select" id="edit-room-type">
                                    <option value="fan" ${room.type === 'fan' ? 'selected' : ''}>ห้องพัดลม</option>
                                    <option value="aircon" ${room.type === 'aircon' ? 'selected' : ''}>ห้องแอร์</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">ชั้น</label>
                                <select class="form-select" id="edit-room-floor">
                                    <option value="1" ${room.floor == 1 ? 'selected' : ''}>ชั้น 1</option>
                                    <option value="2" ${room.floor == 2 ? 'selected' : ''}>ชั้น 2</option>
                                    <option value="3" ${room.floor == 3 ? 'selected' : ''}>ชั้น 3</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">ค่าเช่า (บาท/เดือน)</label>
                                <input type="number" class="form-input" id="edit-room-price" value="${room.price}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">รายละเอียด</label>
                                <textarea class="form-textarea" id="edit-room-desc">${room.description || ''}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="UI.closeModal('edit-room-modal')">ยกเลิก</button>
                        <button class="btn btn-primary" onclick="UI.saveRoomEdit()"><i class="ph-duotone ph-floppy-disk"></i> บันทึก</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    /**
     * Save room edit
     */
    saveRoomEdit() {
        const roomId = document.getElementById('edit-room-id').value;
        const updates = {
            roomNumber: document.getElementById('edit-room-number').value,
            type: document.getElementById('edit-room-type').value,
            floor: parseInt(document.getElementById('edit-room-floor').value),
            price: parseInt(document.getElementById('edit-room-price').value),
            description: document.getElementById('edit-room-desc').value
        };

        const result = Rooms.updateRoom(roomId, updates);
        if (result) {
            this.showNotification('บันทึกข้อมูลห้องเรียบร้อย', 'success');
            this.closeModal('edit-room-modal');
            this.showPage('dashboard');
        } else {
            this.showNotification('เกิดข้อผิดพลาด', 'error');
        }
    },

    /**
     * Show assign tenant modal
     */
    showAssignTenantModal(roomId) {
        const room = Rooms.getRoomById(roomId);
        const tenants = Auth.getUsersByRole('tenant').filter(t => !t.roomId);

        if (tenants.length === 0) {
            this.showNotification('ไม่มีผู้เช่าที่ยังไม่มีห้อง', 'warning');
            return;
        }

        const modalHTML = `
            <div class="modal-overlay active" id="assign-tenant-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title"><i class="ph-duotone ph-user-plus"></i> เพิ่มผู้เช่าห้อง ${room.roomNumber}</h3>
                        <button class="modal-close" onclick="UI.closeModal('assign-tenant-modal')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">เลือกผู้เช่า</label>
                            <select class="form-select" id="assign-tenant-select">
                                ${tenants.map(t => `<option value="${t.id}">${t.displayName || 'ไม่ระบุชื่อ'} (${t.username})</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="UI.closeModal('assign-tenant-modal')">ยกเลิก</button>
                        <button class="btn btn-primary" onclick="UI.assignTenantToRoom('${roomId}')">${Icons.check} ยืนยัน</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    /**
     * Assign tenant to room
     */
    assignTenantToRoom(roomId) {
        const tenantId = document.getElementById('assign-tenant-select').value;
        const result = Rooms.assignTenant(roomId, tenantId);
        
        if (result) {
            this.showNotification('เพิ่มผู้เช่าเรียบร้อย', 'success');
            this.closeModal('assign-tenant-modal');
            this.showPage('dashboard');
        } else {
            this.showNotification('เกิดข้อผิดพลาด', 'error');
        }
    },

    /**
     * Mark room as prepare to move out
     */
    markPrepareToMove(roomId) {
        const room = Rooms.getRoomById(roomId);
        const tenant = room.tenantId ? Auth.getUserById(room.tenantId) : null;
        
        if (confirm(`ยืนยันเปลี่ยนสถานะห้อง ${room.roomNumber} (${tenant?.displayName || 'ผู้เช่า'}) เป็น "เตรียมย้ายออก"?`)) {
            // Update room status to pending (prepare to move)
            Rooms.updateRoom(roomId, { status: 'pending' });
            this.showNotification(`ห้อง ${room.roomNumber} - ${tenant?.displayName || 'ผู้เช่า'} เตรียมย้ายออก`, 'warning');
            this.showPage('dashboard');
        }
    },

    /**
     * Confirm remove tenant
     */
    confirmRemoveTenant(roomId) {
        const room = Rooms.getRoomById(roomId);
        const tenant = room.tenantId ? Auth.getUserById(room.tenantId) : null;

        if (confirm(`ยืนยันย้าย ${tenant?.displayName || 'ผู้เช่า'} ออกจากห้อง ${room.roomNumber}?`)) {
            const result = Rooms.removeTenant(roomId);
            if (result) {
                this.showNotification('ย้ายผู้เช่าออกเรียบร้อย', 'success');
                this.showPage('dashboard');
            }
        }
    },

    /**
     * Confirm delete room
     */
    confirmDeleteRoom(roomId) {
        const room = Rooms.getRoomById(roomId);
        
        if (confirm(`ยืนยันลบห้อง ${room.roomNumber}? การกระทำนี้ไม่สามารถย้อนกลับได้`)) {
            const result = Rooms.deleteRoom(roomId);
            if (result) {
                this.showNotification('ลบห้องเรียบร้อย', 'success');
                this.showPage('dashboard');
            } else {
                this.showNotification('ไม่สามารถลบห้องที่มีผู้เช่าได้', 'error');
            }
        }
    },

    /**
     * Close modal by ID
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    /**
     * Render issue list
     */
    renderIssueList(issues) {
        if (issues.length === 0) {
            return '<p class="text-secondary">ยังไม่มีประวัติการแจ้งปัญหา</p>';
        }

        // Sort by createdAt descending (newest first)
        const sortedIssues = [...issues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return `
            <div class="issue-list">
                ${sortedIssues.map(i => {
                    return `
                    <div class="issue-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.75rem; color: #64748b;">🕐 ${i.category || new Date(i.createdAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}</span>
                        </div>
                        <p style="margin: 0; color: #1e293b; font-size: 0.9rem; line-height: 1.5;">${i.description}</p>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${type === 'success' ? '<i class="ph-duotone ph-check-circle"></i>' : type === 'error' ? '<i class="ph-duotone ph-x-circle"></i>' : type === 'warning' ? '<i class="ph-duotone ph-warning"></i>' : '<i class="ph-duotone ph-info"></i>'}</span>
            <span>${message}</span>
        `;

        container.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Show loading overlay
     */
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.remove('hidden');
    },

    /**
     * Hide loading overlay
     */
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.add('hidden');
    },

    /**
     * Update issue status (called from owner dashboard)
     */
    updateIssueStatus(issueId, status) {
        const result = Issues.updateIssueStatus(issueId, status);
        if (result.error) {
            this.showNotification(result.error, 'error');
        } else {
            this.showNotification('อัปเดตสถานะสำเร็จ', 'success');
        }
    },

    /**
     * Mark issue as resolved
     */
    markIssueResolved(issueId) {
        if (confirm('ยืนยันว่าแก้ไขปัญหานี้แล้ว?')) {
            const result = Issues.updateIssueStatus(issueId, 'resolved');
            if (result.error) {
                this.showNotification(result.error, 'error');
            } else {
                this.showNotification('แก้ไขปัญหาเรียบร้อย', 'success');
                this.showPage('dashboard');
            }
        }
    },

    /**
     * Attach event listeners for specific page
     */
    attachPageEventListeners(pageName) {
        // Navigation links within pages - use event delegation to avoid duplicate listeners
        document.querySelectorAll('[data-page]').forEach(link => {
            // Remove old listener by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                App.navigateTo(newLink.dataset.page);
            });
        });

        switch (pageName) {
            case 'login':
                this.attachLoginListeners();
                break;

            case 'rooms':
                this.attachRoomListeners();
                break;
            case 'dashboard':
                this.attachDashboardListeners();
                break;
            case 'bills':
                this.attachBillsListeners();
                break;
        }
    },

    /**
     * Attach bills page listeners
     */
    attachBillsListeners() {
        // Add input listeners for auto-calculate - use onchange to avoid duplicate
        document.querySelectorAll('.bill-meter, .bill-extra').forEach(input => {
            input.oninput = () => {
                const roomId = input.dataset.room;
                this.calculateBillTotal(roomId);
            };
        });
    },

    /**
     * Attach login form listeners
     */
    attachLoginListeners() {
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('login-username').value;
                const password = document.getElementById('login-password').value;

                const user = Auth.login(username, password);
                if (user) {
                    App.checkAuth();
                    this.showNotification('เข้าสู่ระบบสำเร็จ', 'success');
                    App.navigateTo('dashboard');
                } else {
                    this.showNotification('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
                }
            });
        }
    },

    /**
     * Attach room page listeners
     */
    attachRoomListeners() {
        // No special listeners needed for room page
    },

    /**
     * Attach dashboard listeners
     */
    attachDashboardListeners() {
        const user = Auth.getCurrentUser();
        if (!user) return;

        if (user.role === 'owner') {
            this.attachOwnerDashboardListeners();
        } else {
            this.attachTenantDashboardListeners();
        }
    },

    /**
     * Attach owner dashboard listeners
     */
    attachOwnerDashboardListeners() {
        // Add room form
        const addRoomForm = document.getElementById('add-room-form');
        if (addRoomForm) {
            addRoomForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const roomData = {
                    roomNumber: document.getElementById('new-room-number').value,
                    type: document.getElementById('new-room-type').value,
                    floor: parseInt(document.getElementById('new-room-floor').value),
                    price: parseInt(document.getElementById('new-room-price').value)
                };

                const result = Rooms.addRoom(roomData);
                if (result) {
                    this.showNotification('เพิ่มห้องสำเร็จ', 'success');
                    addRoomForm.reset();
                    this.showPage('dashboard');
                } else {
                    this.showNotification('เกิดข้อผิดพลาด', 'error');
                }
            });
        }

        // Add tenant form
        const addTenantForm = document.getElementById('add-tenant-form');
        if (addTenantForm) {
            addTenantForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const userData = {
                    displayName: document.getElementById('tenant-displayname').value,
                    username: document.getElementById('tenant-username').value,
                    password: document.getElementById('tenant-password').value,
                    lineId: document.getElementById('tenant-line').value,
                    phone: document.getElementById('tenant-phone').value
                };

                const result = Auth.register(userData);
                if (result.error) {
                    const errorMsg = typeof result.error === 'object' ? Object.values(result.error)[0] : result.error;
                    this.showNotification(errorMsg, 'error');
                } else {
                    this.showNotification('เพิ่มลูกบ้านสำเร็จ', 'success');
                    addTenantForm.reset();
                    this.showPage('dashboard');
                }
            });
        }

    },

    /**
     * Render bills page for owner
     */
    renderBillsPage() {
        // Check if owner
        if (!Auth.hasRole('owner')) {
            return this.renderLoginPage();
        }

        const rooms = Rooms.getAllRooms().filter(r => r.status === 'occupied');
        const currentDate = new Date();
        const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        const currentMonth = monthNames[currentDate.getMonth()];
        const prevMonth = monthNames[currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1];
        const currentYear = currentDate.getFullYear() + 543; // พ.ศ.

        return `
            <div class="page active">
                <section class="section">
                    <div class="container">
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <h2 class="section-title mb-0">บิลรายเดือน</h2>
                                <p class="text-secondary">ประจำเดือน ${currentMonth} ${currentYear}</p>
                            </div>
                            <a href="#" class="btn btn-secondary" data-page="dashboard">← กลับแดชบอร์ด</a>
                        </div>

                        ${rooms.length > 0 ? `
                        <div class="bills-grid">
                            ${rooms.map(room => {
                                const tenant = Auth.getUserById(room.tenantId);
                                return `
                                <div class="bill-card" id="bill-${room.id}">
                                    <div class="bill-header">
                                        <div class="bill-room">
                                            <span class="bill-room-number">ห้อง ${room.roomNumber}</span>
                                            <span class="bill-room-type">${Rooms.getTypeDisplayName(room.type)}</span>
                                        </div>
                                        <div class="bill-tenant">
                                            <span class="bill-tenant-name">${tenant?.displayName || tenant?.username || 'ไม่ระบุ'}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bill-form">
                                        <div class="bill-row">
                                            <label>ค่าเช่าห้อง (${currentMonth} ${currentYear})</label>
                                            <div class="bill-input-group">
                                                <input type="number" class="bill-input" id="rent-${room.id}" value="${room.price}" readonly>
                                                <span>บาท</span>
                                            </div>
                                        </div>
                                        
                                        <!-- ค่าไฟฟ้า -->
                                        <div class="bill-section-title">${Icons.electric} ค่าไฟฟ้า (${prevMonth} ${currentYear}) - หน่วยละ 8 บาท</div>
                                        <div class="bill-meter-row">
                                            <div class="meter-input">
                                                <label>เริ่ม</label>
                                                <input type="number" class="bill-input bill-meter" id="electric-start-${room.id}" placeholder="0" min="0" data-room="${room.id}">
                                            </div>
                                            <div class="meter-input">
                                                <label>สิ้นสุด</label>
                                                <input type="number" class="bill-input bill-meter bill-electric-end" id="electric-end-${room.id}" placeholder="0" min="0" data-room="${room.id}">
                                            </div>
                                            <div class="meter-result">
                                                <label>จำนวน</label>
                                                <span id="electric-units-${room.id}">0</span> หน่วย
                                            </div>
                                            <div class="meter-cost">
                                                <span id="electric-cost-${room.id}">0</span> บาท
                                            </div>
                                        </div>
                                        
                                        <!-- ค่าน้ำ -->
                                        <div class="bill-section-title">${Icons.water} ค่าน้ำ (${prevMonth} ${currentYear}) - หน่วยละ 18 บาท</div>
                                        <div class="bill-meter-row">
                                            <div class="meter-input">
                                                <label>เริ่ม</label>
                                                <input type="number" class="bill-input bill-meter" id="water-start-${room.id}" placeholder="0" min="0" data-room="${room.id}">
                                            </div>
                                            <div class="meter-input">
                                                <label>สิ้นสุด</label>
                                                <input type="number" class="bill-input bill-meter bill-water-end" id="water-end-${room.id}" placeholder="0" min="0" data-room="${room.id}">
                                            </div>
                                            <div class="meter-result">
                                                <label>จำนวน</label>
                                                <span id="water-units-${room.id}">0</span> หน่วย
                                            </div>
                                            <div class="meter-cost">
                                                <span id="water-cost-${room.id}">0</span> บาท
                                            </div>
                                        </div>
                                        
                                        <div class="bill-row bill-other">
                                            <label>ค่าอื่นๆ</label>
                                            <div class="bill-input-group">
                                                <input type="number" class="bill-input bill-extra" id="extra-${room.id}" placeholder="0" min="0" data-room="${room.id}">
                                                <span>บาท</span>
                                            </div>
                                        </div>
                                        <div class="bill-total">
                                            <span>รวมทั้งหมด</span>
                                            <span class="bill-total-amount" id="total-${room.id}">${room.price.toLocaleString()} บาท</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bill-actions">
                                        <button class="btn btn-primary btn-block" onclick="UI.printBill('${room.id}')">
                                            ${Icons.print} พิมพ์บิล
                                        </button>
                                    </div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                        ` : `
                        <div class="empty-state">
                            <p>ไม่มีห้องที่มีผู้เช่าในขณะนี้</p>
                        </div>
                        `}
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Calculate and update bill total
     */
    calculateBillTotal(roomId) {
        const rent = parseFloat(document.getElementById(`rent-${roomId}`)?.value) || 0;
        
        // Electric meter
        const electricStart = parseFloat(document.getElementById(`electric-start-${roomId}`)?.value) || 0;
        const electricEnd = parseFloat(document.getElementById(`electric-end-${roomId}`)?.value) || 0;
        const electricUnits = Math.max(0, electricEnd - electricStart);
        const electricCost = electricUnits * 8;
        
        // Water meter
        const waterStart = parseFloat(document.getElementById(`water-start-${roomId}`)?.value) || 0;
        const waterEnd = parseFloat(document.getElementById(`water-end-${roomId}`)?.value) || 0;
        const waterUnits = Math.max(0, waterEnd - waterStart);
        const waterCost = waterUnits * 18;
        
        const extra = parseFloat(document.getElementById(`extra-${roomId}`)?.value) || 0;
        const total = rent + electricCost + waterCost + extra;
        
        // Update display
        const electricUnitsEl = document.getElementById(`electric-units-${roomId}`);
        const electricCostEl = document.getElementById(`electric-cost-${roomId}`);
        const waterUnitsEl = document.getElementById(`water-units-${roomId}`);
        const waterCostEl = document.getElementById(`water-cost-${roomId}`);
        const totalEl = document.getElementById(`total-${roomId}`);
        
        if (electricUnitsEl) electricUnitsEl.textContent = electricUnits.toLocaleString();
        if (electricCostEl) electricCostEl.textContent = electricCost.toLocaleString();
        if (waterUnitsEl) waterUnitsEl.textContent = waterUnits.toLocaleString();
        if (waterCostEl) waterCostEl.textContent = waterCost.toLocaleString();
        if (totalEl) totalEl.textContent = total.toLocaleString() + ' บาท';
        
        return { 
            rent, 
            electricStart, electricEnd, electricUnits, electricCost,
            waterStart, waterEnd, waterUnits, waterCost,
            extra, total 
        };
    },

    /**
     * Print bill for a room
     */
    printBill(roomId) {
        const room = Rooms.getRoomById(roomId);
        if (!room) return;
        
        const tenant = Auth.getUserById(room.tenantId);
        const billData = this.calculateBillTotal(roomId);
        
        const currentDate = new Date();
        const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        const currentMonth = monthNames[currentDate.getMonth()];
        const prevMonth = monthNames[currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1];
        const currentYear = currentDate.getFullYear() + 543;
        const shortYear = currentYear.toString().slice(-2);
        const billNo = `${room.roomNumber}-${currentDate.getMonth() + 1}${shortYear}`;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>ใบแจ้งหนี้ค่าเช่า - ห้อง ${room.roomNumber}</title>
                <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Sarabun', 'Kanit', sans-serif; 
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                        font-size: 13px;
                        line-height: 1.5;
                        color: #1a1a1a;
                        background: #f5f5f5;
                    }
                    .bill-page {
                        background: white;
                        padding: 30px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    
                    /* Header */
                    .bill-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        padding-bottom: 20px;
                        border-bottom: 3px double #333;
                        margin-bottom: 20px;
                    }
                    .company-info h1 {
                        font-size: 1.6rem;
                        font-weight: 700;
                        color: #1e3a5f;
                        margin-bottom: 5px;
                    }
                    .company-info p {
                        font-size: 0.85rem;
                        color: #555;
                        margin: 2px 0;
                    }
                    .bill-meta {
                        text-align: right;
                    }
                    .bill-meta h2 {
                        font-size: 1.3rem;
                        color: #1e3a5f;
                        margin-bottom: 10px;
                        padding: 5px 15px;
                        background: #e8f4fd;
                        border-radius: 5px;
                    }
                    .bill-meta p {
                        font-size: 0.85rem;
                        margin: 3px 0;
                    }
                    .bill-meta strong {
                        color: #333;
                    }
                    
                    /* Customer Info */
                    .customer-section {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin-bottom: 25px;
                        padding: 15px;
                        background: #fafafa;
                        border-radius: 8px;
                        border: 1px solid #e0e0e0;
                    }
                    .customer-box h3 {
                        font-size: 0.9rem;
                        color: #666;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .customer-box p {
                        margin: 4px 0;
                    }
                    .customer-box .highlight {
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: #1e3a5f;
                    }
                    
                    /* Table */
                    .bill-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    .bill-table th {
                        background: #1e3a5f;
                        color: white;
                        padding: 12px 10px;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }
                    .bill-table th:first-child { border-radius: 8px 0 0 0; }
                    .bill-table th:last-child { border-radius: 0 8px 0 0; }
                    .bill-table td {
                        padding: 12px 10px;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .bill-table tbody tr:hover {
                        background: #f8f9fa;
                    }
                    .bill-table .text-left { text-align: left; }
                    .bill-table .text-center { text-align: center; }
                    .bill-table .text-right { text-align: right; }
                    .bill-table .total-row {
                        background: #e8f5e9;
                        font-weight: 700;
                        font-size: 1.05rem;
                    }
                    .bill-table .total-row td {
                        border-bottom: none;
                        padding: 15px 10px;
                    }
                    
                    /* Meter Section */
                    .meter-section {
                        margin-bottom: 25px;
                    }
                    .meter-section h3 {
                        font-size: 0.95rem;
                        color: #1e3a5f;
                        margin-bottom: 10px;
                        padding-bottom: 5px;
                        border-bottom: 2px solid #1e3a5f;
                        display: inline-block;
                    }
                    .meter-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .meter-table th, .meter-table td {
                        padding: 10px;
                        border: 1px solid #ddd;
                        text-align: center;
                    }
                    .meter-table th {
                        background: #f0f0f0;
                        font-weight: 600;
                    }
                    
                    /* Summary Box */
                    .summary-box {
                        display: flex;
                        justify-content: flex-end;
                        margin-bottom: 25px;
                    }
                    .summary-content {
                        background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
                        color: white;
                        padding: 20px 30px;
                        border-radius: 10px;
                        text-align: center;
                        min-width: 250px;
                    }
                    .summary-content .label {
                        font-size: 0.9rem;
                        opacity: 0.9;
                        margin-bottom: 5px;
                    }
                    .summary-content .amount {
                        font-size: 2rem;
                        font-weight: 700;
                    }
                    .summary-content .currency {
                        font-size: 1rem;
                        opacity: 0.9;
                    }
                    
                    /* Payment Info */
                    .payment-info {
                        background: #fff8e1;
                        border: 1px solid #ffcc02;
                        border-radius: 8px;
                        padding: 15px 20px;
                        margin-bottom: 25px;
                    }
                    .payment-info h3 {
                        color: #f57c00;
                        margin-bottom: 10px;
                        font-size: 0.95rem;
                    }
                    .payment-info p {
                        margin: 5px 0;
                        font-size: 0.9rem;
                    }
                    
                    /* Footer */
                    .bill-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                    }
                    .signature-box {
                        text-align: center;
                    }
                    .signature-box .line {
                        border-bottom: 1px solid #333;
                        width: 180px;
                        margin: 40px auto 10px;
                    }
                    .signature-box .label {
                        font-size: 0.9rem;
                        color: #666;
                    }
                    .signature-box .sublabel {
                        font-size: 0.8rem;
                        color: #999;
                    }
                    
                    /* Print Styles */
                    @media print {
                        body { 
                            padding: 0; 
                            background: white;
                        }
                        .bill-page {
                            box-shadow: none;
                            padding: 15px;
                        }
                        .no-print { display: none !important; }
                    }
                    
                    /* Print Button */
                    .print-actions {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .btn-print {
                        padding: 12px 40px;
                        font-size: 1rem;
                        cursor: pointer;
                        background: #1e3a5f;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-family: inherit;
                        transition: background 0.2s;
                    }
                    .btn-print:hover {
                        background: #2d5a87;
                    }
                </style>
            </head>
            <body>
                <div class="bill-page">
                    <!-- Header -->
                    <div class="bill-header" style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
                        <h1 style="font-size: 1.4rem; margin-bottom: 5px;">ใบแจ้งค่าใช้จ่ายหอพัก ห้อง ${room.roomNumber}</h1>
                    </div>
                    
                    <!-- Bill Items -->
                    <table class="bill-table">
                        <thead>
                            <tr>
                                <th style="width: 50px;">ลำดับ</th>
                                <th class="text-left">รายการ</th>
                                <th style="width: 80px;">หน่วย</th>
                                <th style="width: 70px;">จำนวน</th>
                                <th style="width: 90px;">ราคา/หน่วย</th>
                                <th style="width: 100px;">จำนวนเงิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">1</td>
                                <td class="text-left">ค่าเช่าห้องพัก ประจำเดือน${currentMonth} ${currentYear}</td>
                                <td class="text-center">เดือน</td>
                                <td class="text-center">1</td>
                                <td class="text-right">${billData.rent.toLocaleString()}</td>
                                <td class="text-right">${billData.rent.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td class="text-center">2</td>
                                <td class="text-left">ค่าไฟฟ้า ประจำเดือน${prevMonth} ${currentYear}</td>
                                <td class="text-center">หน่วย</td>
                                <td class="text-center">${billData.electricUnits}</td>
                                <td class="text-right">8.00</td>
                                <td class="text-right">${billData.electricCost.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td class="text-center">3</td>
                                <td class="text-left">ค่าน้ำประปา ประจำเดือน${prevMonth} ${currentYear}</td>
                                <td class="text-center">หน่วย</td>
                                <td class="text-center">${billData.waterUnits}</td>
                                <td class="text-right">18.00</td>
                                <td class="text-right">${billData.waterCost.toLocaleString()}</td>
                            </tr>
                            ${billData.extra > 0 ? `
                            <tr>
                                <td class="text-center">4</td>
                                <td class="text-left">ค่าใช้จ่ายอื่นๆ</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-right">-</td>
                                <td class="text-right">${billData.extra.toLocaleString()}</td>
                            </tr>
                            ` : ''}
                            <tr class="total-row">
                                <td colspan="5" class="text-right">รวมทั้งสิ้น</td>
                                <td class="text-right">${billData.total.toLocaleString()} บาท</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- Meter Reading -->
                    <div class="meter-section">
                        <h3>การอ่านมิเตอร์</h3>
                        <table class="meter-table">
                            <thead>
                                <tr>
                                    <th>รายการ</th>
                                    <th>เลขมิเตอร์เริ่มต้น</th>
                                    <th>เลขมิเตอร์สิ้นสุด</th>
                                    <th>หน่วยที่ใช้</th>
                                    <th>อัตรา (บาท)</th>
                                    <th>จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ค่าไฟฟ้า</td>
                                    <td>${billData.electricStart || 0}</td>
                                    <td>${billData.electricEnd || 0}</td>
                                    <td>${billData.electricUnits}</td>
                                    <td>8.00</td>
                                    <td>${billData.electricCost.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>ค่าน้ำประปา</td>
                                    <td>${billData.waterStart || 0}</td>
                                    <td>${billData.waterEnd || 0}</td>
                                    <td>${billData.waterUnits}</td>
                                    <td>18.00</td>
                                    <td>${billData.waterCost.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Payment Info -->
                    <div class="payment-info" style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <h3>ช่องทางชำระเงิน</h3>
                            <p style="margin: 8px 0;"><strong>ธนาคาร:</strong> กสิกรไทย</p>
                            <p style="margin: 8px 0;"><strong>ชื่อบัญชี:</strong> หอพักธรานภากร</p>
                            <p style="margin: 8px 0;"><strong>เลขบัญชี:</strong> 123-4-56789-0</p>
                            <p style="margin-top: 10px; font-size: 0.85rem; color: #666;">กรุณาชำระภายในวันที่ <strong>5</strong> ของทุกเดือน</p>
                        </div>
                        <div style="text-align: center;">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=00020101021129370016A000000677010111011312345678900530376454${billData.total.toFixed(2)}5802TH6304" alt="QR Code" style="width: 120px; height: 120px; border: 1px solid #ddd; border-radius: 8px;">
                            <p style="font-size: 0.75rem; color: #666; margin-top: 5px;">สแกนเพื่อชำระเงิน</p>
                        </div>
                    </div>
                    
                    <!-- Footer Signature -->
                    <div class="bill-footer" style="display: flex; justify-content: flex-end;">
                        <div class="signature-box">
                            <div class="line"></div>
                            <div class="label">ผู้แจ้งหนี้</div>
                        </div>
                    </div>
                </div>
                
                <div class="print-actions no-print">
                    <button class="btn-print" onclick="window.print()"><i class="ph-duotone ph-printer"></i> พิมพ์</button>
                    <button class="btn-print" style="background: #059669;" onclick="saveAsImage()"><i class="ph-duotone ph-camera"></i> บันทึกรูป</button>
                </div>
                
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
                <script>
                    function saveAsImage() {
                        const billElement = document.querySelector('.bill-page');
                        const roomNumber = '${room.roomNumber}';
                        const now = new Date();
                        const day = String(now.getDate()).padStart(2, '0');
                        const month = String(now.getMonth() + 1).padStart(2, '0');
                        const year = now.getFullYear() + 543;
                        const filename = 'R' + roomNumber + '_' + day + '-' + month + '-' + year + '.png';
                        
                        html2canvas(billElement, {
                            scale: 2,
                            backgroundColor: '#ffffff'
                        }).then(canvas => {
                            const link = document.createElement('a');
                            link.download = filename;
                            link.href = canvas.toDataURL('image/png');
                            link.click();
                        });
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    },

    /**
     * Attach tenant dashboard listeners
     */
    attachTenantDashboardListeners() {
        // Issue form
        const issueForm = document.getElementById('issue-form');
        if (issueForm) {
            issueForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const user = Auth.getCurrentUser();
                const description = document.getElementById('issue-description').value;
                const now = new Date();
                const timeStr = now.toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });
                const issueData = {
                    title: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
                    category: timeStr,
                    description: description
                };

                const result = Issues.createIssue(user.id, issueData);
                if (result.error) {
                    if (typeof result.error === 'object') {
                        this.showNotification(Object.values(result.error)[0], 'error');
                    } else {
                        this.showNotification(result.error, 'error');
                    }
                } else {
                    this.showNotification('แจ้งปัญหาสำเร็จ', 'success');
                    issueForm.reset();
                    this.showPage('dashboard');
                }
            });
        }

    }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
