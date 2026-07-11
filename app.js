// ============================================
// ครัว 3 ป. - แอปพลิเคชันหลัก
// ============================================

class Krua3PorApp {
    constructor() {
        this.config = SITE_CONFIG;
        this.currentMenuCategory = 'all';
        this.adminOpen = false;
        this.adminTab = 'general';
        this.adminAuthed = sessionStorage.getItem('krua3por_admin_auth') === '1';
        this.init();
    }

    init() {
        this.renderAll();
        this.setupEventListeners();
        this.setupScrollEffects();
        this.hideLoading();
    }

    // ─── ซ่อนหน้าโหลด ───
    hideLoading() {
        setTimeout(() => {
            const loader = document.getElementById('loading-screen');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }
        }, 800);
    }

    // ─── เรนเดอร์ทุกส่วน ───
    renderAll() {
        this.renderNavigation();
        this.renderHero();
        this.renderFeatures();
        this.renderMenu();
        this.renderAbout();
        this.renderGallery();
        this.renderContact();
        this.renderFooter();
        this.renderSocial();
        this.applyTheme();
    }

    // ─── เรนเดอร์ Navigation ───
    renderNavigation() {
        document.getElementById('site-name').textContent = this.config.general.siteName;
        document.getElementById('nav-home').textContent = this.config.navigation.home;
        document.getElementById('nav-menu').textContent = this.config.navigation.menu;
        document.getElementById('nav-about').textContent = this.config.navigation.about;
        document.getElementById('nav-gallery').textContent = this.config.navigation.gallery;
        document.getElementById('nav-contact').textContent = this.config.navigation.contact;
    }

    // ─── เรนเดอร์ Hero ───
    renderHero() {
        document.getElementById('hero-title').textContent = this.config.hero.title;
        document.getElementById('hero-subtitle').textContent = this.config.hero.subtitle;
        document.getElementById('hero-btn-menu').innerHTML = `<i class="fas fa-book-open"></i> ${this.config.hero.btnMenu}`;
        document.getElementById('hero-btn-call').innerHTML = `<i class="fas fa-phone"></i> ${this.config.hero.btnCall}`;
        document.getElementById('hero-btn-call').href = `tel:${this.config.hero.phone.replace(/-/g, '')}`;
        document.getElementById('hero-hours').innerHTML = `<i class="fas fa-clock"></i> ${this.config.hero.hours}`;
        document.getElementById('hero-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${this.config.hero.location}`;

        const hero = document.querySelector('.hero');
        if (hero && this.config.hero.backgroundImage) {
            hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${this.config.hero.backgroundImage}')`;
        }

        document.querySelector('.scroll-indicator').style.display = 
            this.config.hero.showScrollIndicator ? 'block' : 'none';
    }

    // ─── เรนเดอร์ Features ───
    renderFeatures() {
        const grid = document.getElementById('features-grid');
        grid.innerHTML = this.config.features.map(f => `
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas ${f.icon}"></i>
                </div>
                <h3>${f.title}</h3>
                <p>${f.description}</p>
            </div>
        `).join('');
    }

    // ─── เรนเดอร์เมนู ───
    renderMenu() {
        document.getElementById('menu-title').textContent = this.config.menu.title;
        document.getElementById('menu-subtitle').textContent = this.config.menu.subtitle;

        // Tabs
        const tabsContainer = document.getElementById('menu-tabs');
        tabsContainer.innerHTML = this.config.menu.categories.map(cat => `
            <button class="menu-tab ${cat.id === this.currentMenuCategory ? 'active' : ''}" 
                    data-category="${cat.id}">
                ${cat.name}
            </button>
        `).join('');

        // Menu items
        const grid = document.getElementById('menu-grid');
        const items = this.currentMenuCategory === 'all' 
            ? this.config.menu.items 
            : this.config.menu.items.filter(item => item.category === this.currentMenuCategory);

        grid.innerHTML = items.map(item => `
            <div class="menu-card" data-aos="fade-up">
                <div class="menu-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    ${item.popular ? '<span class="menu-badge popular">ยอดนิยม</span>' : ''}
                    ${item.spicy ? '<span class="menu-badge spicy"><i class="fas fa-pepper-hot"></i> เผ็ด</span>' : ''}
                </div>
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-price">
                        <span class="price">฿${item.price}</span>
                        <a href="tel:${this.config.hero.phone.replace(/-/g, '')}" class="order-btn">
                            <i class="fas fa-phone"></i> สั่งเลย
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-attach tab listeners
        tabsContainer.querySelectorAll('.menu-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.currentMenuCategory = tab.dataset.category;
                this.renderMenu();
            });
        });
    }

    // ─── เรนเดอร์ About ───
    renderAbout() {
        document.getElementById('about-title').textContent = this.config.about.title;
        document.getElementById('about-text').innerHTML = this.config.about.text.replace(/\n/g, '<br>');
        document.getElementById('about-img').src = this.config.about.image;

        const statsContainer = document.getElementById('about-stats');
        statsContainer.innerHTML = this.config.about.stats.map(stat => `
            <div class="stat-item">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    // ─── เรนเดอร์ Gallery ───
    renderGallery() {
        document.getElementById('gallery-title').textContent = this.config.gallery.title;
        document.getElementById('gallery-subtitle').textContent = this.config.gallery.subtitle;

        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = this.config.gallery.images.map((img, i) => `
            <div class="gallery-item" data-index="${i}">
                <img src="${img.src}" alt="${img.caption}" loading="lazy">
                <div class="gallery-overlay">
                    <span>${img.caption}</span>
                </div>
            </div>
        `).join('');
    }

    // ─── เรนเดอร์ Contact ───
    renderContact() {
        document.getElementById('contact-title').textContent = this.config.contact.title;
        document.getElementById('contact-subtitle').textContent = this.config.contact.subtitle;

        const infoContainer = document.getElementById('contact-info');
        infoContainer.innerHTML = `
            <div class="contact-item">
                <i class="fas fa-phone-alt"></i>
                <div>
                    <h4>โทรศัพท์</h4>
                    <a href="tel:${this.config.contact.phone.replace(/-/g, '')}">${this.config.contact.phone}</a>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <h4>ที่อยู่</h4>
                    <p>${this.config.contact.address}</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-clock"></i>
                <div>
                    <h4>เวลาเปิด-ปิด</h4>
                    ${this.config.contact.hours.map(h => `<p>${h.day}: ${h.time}</p>`).join('')}
                </div>
            </div>
        `;

        document.getElementById('map-iframe').src = this.config.contact.mapUrl;
        const directionsLink = document.getElementById('map-directions-link');
        if (directionsLink) {
            directionsLink.href = this.config.contact.googleMapsLink || '#';
        }
    }

    // ─── เรนเดอร์ Footer ───
    renderFooter() {
        document.getElementById('footer-brand').textContent = this.config.general.siteName;
        document.getElementById('footer-desc').textContent = this.config.general.tagline;
        document.getElementById('footer-copyright').textContent = this.config.general.copyright;
    }

    // ─── เรนเดอร์ Social ───
    renderSocial() {
        const container = document.getElementById('footer-social');
        const socials = [];
        if (this.config.social.facebook) socials.push({ icon: 'fa-facebook-f', url: this.config.social.facebook });
        if (this.config.social.instagram) socials.push({ icon: 'fa-instagram', url: this.config.social.instagram });
        if (this.config.social.line) socials.push({ icon: 'fa-line', url: this.config.social.line });
        if (this.config.social.tiktok) socials.push({ icon: 'fa-tiktok', url: this.config.social.tiktok });

        container.innerHTML = socials.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener">
                <i class="fab ${s.icon}"></i>
            </a>
        `).join('');
    }

    // ─── ใช้ธีมสี ───
    applyTheme() {
        const root = document.documentElement;
        root.style.setProperty('--primary', this.config.theme.primaryColor);
        root.style.setProperty('--secondary', this.config.theme.secondaryColor);
        root.style.setProperty('--accent', this.config.theme.accentColor);
        root.style.setProperty('--dark', this.config.theme.darkColor);
        root.style.setProperty('--light', this.config.theme.lightColor);
        root.style.setProperty('--text', this.config.theme.textColor);
    }

    // ─── Event Listeners ───
    setupEventListeners() {
        // Mobile menu
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.querySelector('i').classList.toggle('fa-bars');
            mobileBtn.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').classList.add('fa-bars');
                mobileBtn.querySelector('i').classList.remove('fa-times');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Admin panel (ต้องใส่รหัสผ่านก่อนเข้าถ้ายังไม่ได้ยืนยันตัวตนในเซสชันนี้)
        document.getElementById('admin-toggle').addEventListener('click', () => {
            if (this.adminAuthed) {
                this.toggleAdmin();
            } else {
                this.openPasswordGate();
            }
        });
        document.getElementById('admin-close').addEventListener('click', () => this.toggleAdmin());
        document.getElementById('admin-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('admin-modal')) this.toggleAdmin();
        });

        // Admin password gate
        document.getElementById('password-cancel').addEventListener('click', () => this.closePasswordGate());
        document.getElementById('admin-password-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('admin-password-modal')) this.closePasswordGate();
        });
        document.getElementById('password-submit').addEventListener('click', () => this.verifyAdminPassword());
        document.getElementById('admin-password-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.verifyAdminPassword();
        });
        document.getElementById('toggle-password-visibility').addEventListener('click', () => {
            const input = document.getElementById('admin-password-input');
            const icon = document.querySelector('#toggle-password-visibility i');
            const showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            icon.classList.toggle('fa-eye', showing);
            icon.classList.toggle('fa-eye-slash', !showing);
        });

        // Admin tabs
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.adminTab = tab.dataset.tab;
                this.renderAdminForm();
            });
        });

        // Admin actions
        document.getElementById('admin-save').addEventListener('click', () => this.saveConfig());
        document.getElementById('admin-reset').addEventListener('click', () => this.resetConfig());
    }

    // ─── Scroll Effects ───
    setupScrollEffects() {
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card, .menu-card, .gallery-item, .stat-item').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // ─── เปิดหน้าใส่รหัสผ่านแอดมิน ───
    openPasswordGate() {
        const modal = document.getElementById('admin-password-modal');
        const input = document.getElementById('admin-password-input');
        input.value = '';
        input.type = 'password';
        document.querySelector('#toggle-password-visibility i').classList.add('fa-eye');
        document.querySelector('#toggle-password-visibility i').classList.remove('fa-eye-slash');
        document.getElementById('password-error').classList.remove('show');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => input.focus(), 150);
    }

    // ─── ปิดหน้าใส่รหัสผ่านแอดมิน ───
    closePasswordGate() {
        document.getElementById('admin-password-modal').classList.remove('active');
        document.body.style.overflow = '';
    }

    // ─── ตรวจสอบรหัสผ่านแอดมิน ───
    verifyAdminPassword() {
        const input = document.getElementById('admin-password-input');
        if (input.value === this.config.general.adminPassword) {
            this.adminAuthed = true;
            sessionStorage.setItem('krua3por_admin_auth', '1');
            // เก็บรหัสผ่านไว้ใช้ยืนยันตอนบันทึกขึ้นเซิร์ฟเวอร์กลาง (ลบทิ้งเมื่อปิดแท็บ/เบราว์เซอร์)
            sessionStorage.setItem('krua3por_admin_pw', input.value);
            this.closePasswordGate();
            this.toggleAdmin();
        } else {
            document.getElementById('password-error').classList.add('show');
            input.value = '';
            input.focus();
        }
    }

    // ─── Toggle Admin Panel ───
    toggleAdmin() {
        this.adminOpen = !this.adminOpen;
        const modal = document.getElementById('admin-modal');
        if (this.adminOpen) {
            modal.classList.add('active');
            this.renderAdminForm();
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ─── Render Admin Form ───
    renderAdminForm() {
        const container = document.getElementById('admin-content');
        const tab = this.adminTab;
        let html = '';

        switch(tab) {
            case 'general':
                html = this.renderGeneralForm();
                break;
            case 'hero':
                html = this.renderHeroForm();
                break;
            case 'menu':
                html = this.renderMenuForm();
                break;
            case 'about':
                html = this.renderAboutForm();
                break;
            case 'contact':
                html = this.renderContactForm();
                break;
            case 'features':
                html = this.renderFeaturesForm();
                break;
            case 'gallery':
                html = this.renderGalleryForm();
                break;
            case 'social':
                html = this.renderSocialForm();
                break;
        }

        container.innerHTML = html;
        this.attachAdminListeners();
    }

    renderGeneralForm() {
        return `
            <div class="admin-form-group">
                <label>ชื่อร้าน</label>
                <input type="text" data-path="general.siteName" value="${this.config.general.siteName}">
            </div>
            <div class="admin-form-group">
                <label>คำขวัญ</label>
                <input type="text" data-path="general.tagline" value="${this.config.general.tagline}">
            </div>
            <div class="admin-form-group">
                <label>ข้อความโหลด</label>
                <input type="text" data-path="general.loadingText" value="${this.config.general.loadingText}">
            </div>
            <div class="admin-form-group">
                <label>ลิขสิทธิ์</label>
                <input type="text" data-path="general.copyright" value="${this.config.general.copyright}">
            </div>
        `;
    }

    renderHeroForm() {
        return `
            <div class="admin-form-group">
                <label>หัวข้อใหญ่</label>
                <input type="text" data-path="hero.title" value="${this.config.hero.title}">
            </div>
            <div class="admin-form-group">
                <label>คำบรรยาย</label>
                <textarea data-path="hero.subtitle" rows="2">${this.config.hero.subtitle}</textarea>
            </div>
            <div class="admin-form-group">
                <label>ข้อความปุ่มเมนู</label>
                <input type="text" data-path="hero.btnMenu" value="${this.config.hero.btnMenu}">
            </div>
            <div class="admin-form-group">
                <label>ข้อความปุ่มโทร</label>
                <input type="text" data-path="hero.btnCall" value="${this.config.hero.btnCall}">
            </div>
            <div class="admin-form-group">
                <label>เบอร์โทร</label>
                <input type="text" data-path="hero.phone" value="${this.config.hero.phone}">
            </div>
            <div class="admin-form-group">
                <label>เวลาเปิด-ปิด</label>
                <input type="text" data-path="hero.hours" value="${this.config.hero.hours}">
            </div>
            <div class="admin-form-group">
                <label>ที่อยู่</label>
                <input type="text" data-path="hero.location" value="${this.config.hero.location}">
            </div>
            <div class="admin-form-group">
                <label>รูปพื้นหลัง (Hero Background)</label>
                <div class="item-image-upload">
                    <img src="${this.config.hero.backgroundImage}" class="item-image-preview" id="hero-bg-preview" alt="ตัวอย่างพื้นหลัง">
                    <div class="item-image-controls">
                        <input type="text" placeholder="URL รูปพื้นหลัง" value="${this.config.hero.backgroundImage}" id="hero-bg-url" data-path="hero.backgroundImage">
                        <label class="upload-btn">
                            <i class="fas fa-upload"></i> อัพโหลดรูปจากเครื่อง
                            <input type="file" accept="image/*" id="hero-bg-file" hidden>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    renderMenuForm() {
        let itemsHtml = this.config.menu.items.map((item, i) => `
            <div class="admin-item-card" data-index="${i}">
                <div class="admin-item-header">
                    <span>${item.name}</span>
                    <button class="btn-icon delete-item" data-index="${i}"><i class="fas fa-trash"></i></button>
                </div>
                <div class="item-image-upload">
                    <img src="${item.image}" class="item-image-preview" data-index="${i}" alt="ตัวอย่างรูป">
                    <div class="item-image-controls">
                        <input type="text" placeholder="URL รูปภาพ" value="${item.image}" class="item-image-url" data-index="${i}">
                        <label class="upload-btn">
                            <i class="fas fa-upload"></i> อัพโหลดรูปจากเครื่อง
                            <input type="file" accept="image/*" class="item-image-file" data-index="${i}" hidden>
                        </label>
                    </div>
                </div>
                <div class="admin-form-row">
                    <input type="text" placeholder="ชื่อเมนู" value="${item.name}" class="item-name" data-index="${i}">
                    <input type="number" placeholder="ราคา" value="${item.price}" class="item-price" data-index="${i}">
                </div>
                <input type="text" placeholder="รายละเอียด" value="${item.description}" class="item-desc" data-index="${i}">
                <select class="item-category" data-index="${i}">
                    ${this.config.menu.categories.filter(c => c.id !== 'all').map(c => 
                        `<option value="${c.id}" ${c.id === item.category ? 'selected' : ''}>${c.name}</option>`
                    ).join('')}
                </select>
                <div class="admin-form-row">
                    <label><input type="checkbox" class="item-popular" ${item.popular ? 'checked' : ''} data-index="${i}"> ยอดนิยม</label>
                    <label><input type="checkbox" class="item-spicy" ${item.spicy ? 'checked' : ''} data-index="${i}"> เผ็ด</label>
                </div>
            </div>
        `).join('');

        let categoriesHtml = this.config.menu.categories.map((cat, i) => `
            <div class="admin-form-group">
                <label>${cat.id === 'all' ? 'ชื่อแท็บ "ทั้งหมด"' : `ชื่อหมวดหมู่ (รหัส: ${cat.id})`}</label>
                <input type="text" class="category-name-input" data-index="${i}" value="${cat.name}">
            </div>
        `).join('');

        return `
            <div class="admin-form-group">
                <label>หัวข้อเมนู</label>
                <input type="text" data-path="menu.title" value="${this.config.menu.title}">
            </div>
            <div class="admin-form-group">
                <label>คำบรรยายเมนู</label>
                <input type="text" data-path="menu.subtitle" value="${this.config.menu.subtitle}">
            </div>
            <h4 style="margin: 20px 0 10px;">ชื่อแท็บหมวดหมู่</h4>
            <div class="admin-categories-list">
                ${categoriesHtml}
            </div>
            <h4 style="margin: 20px 0 10px;">รายการเมนู</h4>
            <div class="admin-items-list">
                ${itemsHtml}
            </div>
            <button class="btn btn-secondary" id="add-menu-item" style="width:100%; margin-top:10px;">
                <i class="fas fa-plus"></i> เพิ่มเมนูใหม่
            </button>
        `;
    }

    renderAboutForm() {
        return `
            <div class="admin-form-group">
                <label>หัวข้อ</label>
                <input type="text" data-path="about.title" value="${this.config.about.title}">
            </div>
            <div class="admin-form-group">
                <label>เนื้อหา</label>
                <textarea data-path="about.text" rows="6">${this.config.about.text}</textarea>
            </div>
            <div class="admin-form-group">
                <label>รูปภาพ (URL)</label>
                <input type="text" data-path="about.image" value="${this.config.about.image}">
            </div>
            <h4 style="margin: 20px 0 10px;">สถิติ</h4>
            ${this.config.about.stats.map((stat, i) => `
                <div class="admin-form-row">
                    <input type="text" placeholder="ตัวเลข" value="${stat.number}" class="stat-number-input" data-index="${i}">
                    <input type="text" placeholder="คำอธิบาย" value="${stat.label}" class="stat-label-input" data-index="${i}">
                </div>
            `).join('')}
        `;
    }

    renderContactForm() {
        return `
            <div class="admin-form-group">
                <label>หัวข้อ</label>
                <input type="text" data-path="contact.title" value="${this.config.contact.title}">
            </div>
            <div class="admin-form-group">
                <label>คำบรรยาย</label>
                <input type="text" data-path="contact.subtitle" value="${this.config.contact.subtitle}">
            </div>
            <div class="admin-form-group">
                <label>เบอร์โทร</label>
                <input type="text" data-path="contact.phone" value="${this.config.contact.phone}">
            </div>
            <div class="admin-form-group">
                <label>ที่อยู่</label>
                <textarea data-path="contact.address" rows="3">${this.config.contact.address}</textarea>
            </div>
            <div class="admin-form-group">
                <label>URL แผนที่แบบฝัง (Embed)</label>
                <textarea data-path="contact.mapUrl" id="contact-map-url" rows="3" placeholder="วาง URL เท่านั้น เช่น https://www.google.com/maps/embed?pb=...">${this.config.contact.mapUrl}</textarea>
                <p class="field-hint">
                    <i class="fas fa-info-circle"></i>
                    วางเฉพาะ URL เท่านั้น ถ้าคุณคัดลอกทั้งโค้ด <code>&lt;iframe src="..."&gt;&lt;/iframe&gt;</code> มาจาก Google Maps
                    ระบบจะดึง URL ออกมาให้อัตโนมัติตอนกดบันทึก
                </p>
            </div>
            <div class="admin-form-group">
                <label>ลิงก์ Google Maps (สำหรับปุ่ม "เปิดนำทาง")</label>
                <input type="text" data-path="contact.googleMapsLink" value="${this.config.contact.googleMapsLink || ''}" placeholder="เช่น https://maps.app.goo.gl/xxxxx">
                <p class="field-hint">
                    <i class="fas fa-info-circle"></i>
                    วางลิงก์แชร์จาก Google Maps (แบบ maps.app.goo.gl หรือ google.com/maps/place/...) ตรงนี้ได้เลย
                    ใช้สำหรับปุ่มเปิดนำทาง ไม่ใช่สำหรับแผนที่ที่ฝังในหน้าเว็บ
                </p>
            </div>
            <h4 style="margin: 20px 0 10px;">เวลาเปิด-ปิด</h4>
            ${this.config.contact.hours.map((h, i) => `
                <div class="admin-form-row">
                    <input type="text" placeholder="วัน" value="${h.day}" class="hour-day" data-index="${i}">
                    <input type="text" placeholder="เวลา" value="${h.time}" class="hour-time" data-index="${i}">
                </div>
            `).join('')}
        `;
    }

    renderFeaturesForm() {
        return `
            <h4 style="margin-bottom: 10px;">ไฮไลท์ / จุดเด่น</h4>
            ${this.config.features.map((f, i) => `
                <div class="admin-item-card">
                    <div class="admin-form-group">
                        <label>ไอคอน (Font Awesome class)</label>
                        <input type="text" value="${f.icon}" class="feature-icon-input" data-index="${i}">
                    </div>
                    <div class="admin-form-group">
                        <label>หัวข้อ</label>
                        <input type="text" value="${f.title}" class="feature-title-input" data-index="${i}">
                    </div>
                    <div class="admin-form-group">
                        <label>รายละเอียด</label>
                        <input type="text" value="${f.description}" class="feature-desc-input" data-index="${i}">
                    </div>
                </div>
            `).join('')}
        `;
    }

    renderGalleryForm() {
        return `
            <div class="admin-form-group">
                <label>หัวข้อ</label>
                <input type="text" data-path="gallery.title" value="${this.config.gallery.title}">
            </div>
            <div class="admin-form-group">
                <label>คำบรรยาย</label>
                <input type="text" data-path="gallery.subtitle" value="${this.config.gallery.subtitle}">
            </div>
            <h4 style="margin: 20px 0 10px;">รูปภาพ</h4>
            ${this.config.gallery.images.map((img, i) => `
                <div class="admin-form-row">
                    <input type="text" placeholder="URL รูปภาพ" value="${img.src}" class="gallery-src" data-index="${i}">
                    <input type="text" placeholder="คำอธิบาย" value="${img.caption}" class="gallery-caption" data-index="${i}">
                </div>
            `).join('')}
        `;
    }

    renderSocialForm() {
        return `
            <div class="admin-form-group">
                <label>Facebook URL</label>
                <input type="text" data-path="social.facebook" value="${this.config.social.facebook}">
            </div>
            <div class="admin-form-group">
                <label>Instagram URL</label>
                <input type="text" data-path="social.instagram" value="${this.config.social.instagram}">
            </div>
            <div class="admin-form-group">
                <label>Line URL</label>
                <input type="text" data-path="social.line" value="${this.config.social.line}">
            </div>
            <div class="admin-form-group">
                <label>TikTok URL</label>
                <input type="text" data-path="social.tiktok" value="${this.config.social.tiktok}">
            </div>
        `;
    }

    attachAdminListeners() {
        // Add menu item
        const addBtn = document.getElementById('add-menu-item');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const newItem = {
                    id: Date.now(),
                    name: "เมนูใหม่",
                    description: "รายละเอียดเมนู",
                    price: 50,
                    category: "stir-fry",
                    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
                    popular: false,
                    spicy: false
                };
                this.config.menu.items.push(newItem);
                this.renderAdminForm();
            });
        }

        // Delete menu item
        document.querySelectorAll('.delete-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.config.menu.items.splice(index, 1);
                this.renderAdminForm();
            });
        });

        // Upload image จากเครื่อง (แปลงเป็น base64 แล้วแสดงตัวอย่างทันที)
        document.querySelectorAll('.item-image-file').forEach(fileInput => {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (!file.type.startsWith('image/')) {
                    this.showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    this.showToast('ไฟล์รูปใหญ่เกินไป กรุณาเลือกไฟล์ไม่เกิน 2MB');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (ev) => {
                    const dataUrl = ev.target.result;
                    const card = fileInput.closest('.admin-item-card');
                    card.querySelector('.item-image-preview').src = dataUrl;
                    card.querySelector('.item-image-url').value = dataUrl;
                };
                reader.readAsDataURL(file);
            });
        });

        // อัพเดทตัวอย่างรูปเมื่อพิมพ์ URL เอง
        document.querySelectorAll('.item-image-url').forEach(urlInput => {
            urlInput.addEventListener('input', (e) => {
                const card = e.target.closest('.admin-item-card');
                card.querySelector('.item-image-preview').src = e.target.value;
            });
        });

        // อัพโหลดรูปพื้นหลัง Hero จากเครื่อง
        const heroBgFile = document.getElementById('hero-bg-file');
        if (heroBgFile) {
            heroBgFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (!file.type.startsWith('image/')) {
                    this.showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
                    return;
                }
                if (file.size > 3 * 1024 * 1024) {
                    this.showToast('ไฟล์รูปใหญ่เกินไป กรุณาเลือกไฟล์ไม่เกิน 3MB');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (ev) => {
                    const dataUrl = ev.target.result;
                    document.getElementById('hero-bg-preview').src = dataUrl;
                    document.getElementById('hero-bg-url').value = dataUrl;
                };
                reader.readAsDataURL(file);
            });
        }

        // อัพเดทตัวอย่างพื้นหลัง Hero เมื่อพิมพ์ URL เอง
        const heroBgUrl = document.getElementById('hero-bg-url');
        if (heroBgUrl) {
            heroBgUrl.addEventListener('input', (e) => {
                document.getElementById('hero-bg-preview').src = e.target.value;
            });
        }
    }

    // ─── Save Config ───
    async saveConfig() {
        // Collect form data
        const inputs = document.querySelectorAll('#admin-content input[data-path], #admin-content textarea[data-path]');
        inputs.forEach(input => {
            const path = input.dataset.path;
            const keys = path.split('.');
            let obj = this.config;
            for (let i = 0; i < keys.length - 1; i++) {
                obj = obj[keys[i]];
            }
            let value = input.value;

            // เผื่อผู้ใช้คัดลอกทั้งโค้ด <iframe src="..."></iframe> มาแปะแทนที่จะเป็น URL เฉยๆ
            if (path === 'contact.mapUrl') {
                const iframeMatch = value.match(/src=["']([^"']+)["']/i);
                if (iframeMatch) {
                    value = iframeMatch[1];
                }

                // ตรวจว่าเป็นลิงก์ embed จริงหรือไม่ ถ้าไม่ใช่ ให้แปลงให้อัตโนมัติ
                // กันปัญหา "Refused to display ... X-Frame-Options" เวลาผู้ใช้เผลอวาง
                // ลิงก์แชร์ปกติ (google.com/maps/place/..., maps.app.goo.gl/..., หรือที่อยู่เฉยๆ)
                const isEmbedUrl = /\/maps\/embed|output=embed|embed\.html/i.test(value);
                if (!isEmbedUrl && value.trim() !== '') {
                    let query = value.trim();

                    // ถ้าเป็นลิงก์ Google Maps ปกติ ลองดึงพิกัดหรือชื่อสถานที่ออกมาก่อน
                    const coordMatch = query.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
                    const placeMatch = query.match(/\/maps\/place\/([^/@]+)/i);
                    if (coordMatch) {
                        query = `${coordMatch[1]},${coordMatch[2]}`;
                    } else if (placeMatch) {
                        query = decodeURIComponent(placeMatch[1]).replace(/\+/g, ' ');
                    } else if (/^https?:\/\/(maps\.app\.goo\.gl|goo\.gl)\//i.test(query)) {
                        // ลิงก์แบบย่อ ไม่สามารถดึงพิกัด/ที่อยู่ออกมาได้จากฝั่งเบราว์เซอร์
                        // แจ้งเตือนผู้ใช้แทนที่จะฝังลิงก์ที่ใช้งานไม่ได้
                        this.showToast('ลิงก์นี้เป็นลิงก์แบบย่อ กรุณาใช้ Google Maps > แชร์ > "ฝังแผนที่" แล้ววางโค้ด iframe แทน');
                        query = null;
                    }

                    if (query) {
                        value = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
                    }
                }

                input.value = value;
            }

            obj[keys[keys.length - 1]] = value;
        });

        // Menu items + category names
        if (this.adminTab === 'menu') {
            document.querySelectorAll('.category-name-input').forEach((input) => {
                const i = parseInt(input.dataset.index);
                if (this.config.menu.categories[i]) {
                    this.config.menu.categories[i].name = input.value || this.config.menu.categories[i].name;
                }
            });

            document.querySelectorAll('.admin-item-card').forEach((card, i) => {
                if (this.config.menu.items[i]) {
                    this.config.menu.items[i].name = card.querySelector('.item-name')?.value || '';
                    this.config.menu.items[i].price = parseInt(card.querySelector('.item-price')?.value || 0);
                    this.config.menu.items[i].description = card.querySelector('.item-desc')?.value || '';
                    this.config.menu.items[i].category = card.querySelector('.item-category')?.value || 'stir-fry';
                    this.config.menu.items[i].popular = card.querySelector('.item-popular')?.checked || false;
                    this.config.menu.items[i].spicy = card.querySelector('.item-spicy')?.checked || false;
                    this.config.menu.items[i].image = card.querySelector('.item-image-url')?.value || this.config.menu.items[i].image;
                }
            });
        }

        // Features
        if (this.adminTab === 'features') {
            document.querySelectorAll('.feature-icon-input').forEach((input, i) => {
                if (this.config.features[i]) {
                    this.config.features[i].icon = input.value;
                    this.config.features[i].title = document.querySelectorAll('.feature-title-input')[i]?.value || '';
                    this.config.features[i].description = document.querySelectorAll('.feature-desc-input')[i]?.value || '';
                }
            });
        }

        // Gallery
        if (this.adminTab === 'gallery') {
            document.querySelectorAll('.gallery-src').forEach((input, i) => {
                if (this.config.gallery.images[i]) {
                    this.config.gallery.images[i].src = input.value;
                    this.config.gallery.images[i].caption = document.querySelectorAll('.gallery-caption')[i]?.value || '';
                }
            });
        }

        // About stats
        if (this.adminTab === 'about') {
            document.querySelectorAll('.stat-number-input').forEach((input, i) => {
                if (this.config.about.stats[i]) {
                    this.config.about.stats[i].number = input.value;
                    this.config.about.stats[i].label = document.querySelectorAll('.stat-label-input')[i]?.value || '';
                }
            });
        }

        // Contact hours
        if (this.adminTab === 'contact') {
            document.querySelectorAll('.hour-day').forEach((input, i) => {
                if (this.config.contact.hours[i]) {
                    this.config.contact.hours[i].day = input.value;
                    this.config.contact.hours[i].time = document.querySelectorAll('.hour-time')[i]?.value || '';
                }
            });
        }

        // เก็บสำเนาไว้ในเครื่องนี้ด้วย (แคช/fallback เผื่อเน็ตหลุด)
        try {
            localStorage.setItem('krua3por_config', JSON.stringify(this.config));
        } catch (err) {
            this.showToast('พื้นที่จัดเก็บเต็ม กรุณาใช้รูปภาพขนาดเล็กลงหรือใช้ URL แทนการอัพโหลด');
            return;
        }

        // ส่งข้อมูลขึ้นเซิร์ฟเวอร์กลาง ให้ทุกคนที่เข้าเว็บเห็นข้อมูลชุดเดียวกัน
        const password = sessionStorage.getItem('krua3por_admin_pw') || '';
        try {
            const res = await fetch('/.netlify/functions/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, config: this.config })
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                if (err.error === 'wrong_password') {
                    this.showToast('รหัสผ่านหมดอายุ กรุณาปิดแล้วล็อกอินเข้าแอดมินใหม่');
                } else {
                    this.showToast('บันทึกขึ้นเซิร์ฟเวอร์ไม่สำเร็จ (บันทึกไว้ในเครื่องนี้ก่อนแล้ว) ลองอีกครั้ง');
                }
                this.renderAll();
                return;
            }
        } catch (err) {
            this.showToast('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ บันทึกไว้ในเครื่องนี้ก่อน กรุณาลองใหม่เมื่อเน็ตกลับมา');
            this.renderAll();
            return;
        }

        // Re-render
        this.renderAll();
        this.showToast('บันทึกการเปลี่ยนแปลงสำเร็จ! ทุกคนที่เข้าเว็บจะเห็นข้อมูลใหม่นี้');
    }

    // ─── Reset Config ───
    resetConfig() {
        if (confirm('คุณแน่ใจหรือไม่ที่จะรีเซ็ตเป็นค่าเริ่มต้น? การเปลี่ยนแปลงทั้งหมดจะหายไป')) {
            localStorage.removeItem('krua3por_config');
            location.reload();
        }
    }

    // ─── Show Toast ───
    showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-message').textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// Initialize app when DOM is ready
// รอให้โหลด config ล่าสุดจากเซิร์ฟเวอร์ก่อน (window.configReadyPromise มาจาก config.js)
// เพื่อให้ทุกคนเห็นข้อมูลชุดเดียวกันตั้งแต่โหลดหน้าเว็บครั้งแรก
document.addEventListener('DOMContentLoaded', async () => {
    if (window.configReadyPromise) {
        await window.configReadyPromise;
    }
    window.app = new Krua3PorApp();
});
