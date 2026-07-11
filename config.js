// ============================================
// ครัว 3 ป. - ไฟล์ตั้งค่า (Config)
// แก้ไขไฟล์นี้เพื่ออัพเดทเนื้อหาเว็บไซต์ทุกจุด
// ============================================

const SITE_CONFIG = {
    // ─── ข้อมูลทั่วไป ───
    general: {
        siteName: "ครัว 3 ป.",
        tagline: "อาหารตามสั่ง รสชาติเข้มข้น",
        loadingText: "กำลังโหลด...",
        copyright: "© 2026 ครัว 3 ป. All rights reserved.",
        // รหัสผ่านสำหรับเข้าแพนเนลแอดมิน แก้ไขค่านี้เพื่อเปลี่ยนรหัสผ่าน
        // (หมายเหตุ: เนื่องจากเป็นเว็บฝั่งไคลเอนต์ล้วนๆ รหัสนี้จะมองเห็นได้จาก source code
        // จึงเหมาะสำหรับกันคนทั่วไปเข้าไปแก้โดยไม่ตั้งใจ ไม่ใช่ระบบความปลอดภัยระดับสูง)
        adminPassword: "krua3por2026"
    },

    // ─── เมนูนำทาง ───
    navigation: {
        home: "หน้าแรก",
        menu: "เมนู",
        about: "เกี่ยวกับเรา",
        gallery: "แกลเลอรี่",
        contact: "ติดต่อ"
    },

    // ─── หน้าแรก (Hero) ───
    hero: {
        title: "ครัว 3 ป.",
        subtitle: "อาหารตามสั่ง รสชาติเข้มข้น ถึงเครื่อง ราคาประหยัด",
        btnMenu: "ดูเมนู",
        btnCall: "โทรสั่งอาหาร",
        phone: "061-917-7557",
        hours: "เปิด 14:00 - 20:00 (จ-ศ) | 10:00 - 19:00 (ส-อา)",
        location: "Caltex 49/54 อำเภอบางละมุง ชลบุรี",
        backgroundImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920",
        showScrollIndicator: true
    },

    // ─── ไฮไลท์ / จุดเด่น ───
    features: [
        {
            icon: "fa-fire",
            title: "ปรุงสดใหม่",
            description: "ทุกจานปรุงใหม่ตามออเดอร์ ไม่ใช่อาหารทิ้งไว้"
        },
        {
            icon: "fa-pepper-hot",
            title: "รสชาติจัดจ้าน",
            description: "เครื่องเทศและเครื่องปรุงเข้มข้น ถูกปากคนไทย"
        },
        {
            icon: "fa-hand-holding-usd",
            title: "ราคาประหยัด",
            description: "อิ่มอร่อยในราคาที่เข้าถึงได้ เริ่มต้นเพียง 35 บาท"
        },
        {
            icon: "fa-motorcycle",
            title: "ส่งถึงที่",
            description: "บริการเดลิเวอรี่ ส่งอาหารร้อนๆ ถึงหน้าบ้าน"
        }
    ],

    // ─── เมนูอาหาร ───
    menu: {
        title: "เมนูแนะนำ",
        subtitle: "อาหารตามสั่งสไตล์ครัว 3 ป. รสชาติจัดจ้าน",
        categories: [
            { id: "all", name: "ทั้งหมด" },
            { id: "stir-fry", name: "ผัด" },
            { id: "soup", name: "ต้ม/แกง" },
            { id: "fried", name: "ทอด" },
            { id: "noodles", name: "ก๋วยเตี๋ยว" },
            { id: "rice", name: "ข้าว" }
        ],
        items: [
            {
                id: 1,
                name: "ผัดกะเพราหมูสับ",
                description: "หมูสับผัดกับใบกะเพราสด รสชาติเผ็ดจัดจ้าน",
                price: 45,
                category: "stir-fry",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
                popular: true,
                spicy: true
            },
            {
                id: 2,
                name: "ผัดไทยกุ้งสด",
                description: "เส้นจันท์ผัดกับกุ้งสด ถั่วงอก และเต้าหู้",
                price: 60,
                category: "noodles",
                image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
                popular: true,
                spicy: false
            },
            {
                id: 3,
                name: "ต้มยำกุ้งน้ำข้น",
                description: "น้ำซุปเข้มข้น เปรี้ยวเผ็ด หอมสมุนไพร",
                price: 80,
                category: "soup",
                image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400",
                popular: true,
                spicy: true
            },
            {
                id: 4,
                name: "ข้าวผัดปู",
                description: "ข้าวผัดกับเนื้อปูสด ไข่ และต้นหอม",
                price: 70,
                category: "rice",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
                popular: false,
                spicy: false
            },
            {
                id: 5,
                name: "ไข่เจียวหมูสับ",
                description: "ไข่เจียวฟูกรอบ ผสมหมูสับและต้นหอม",
                price: 40,
                category: "fried",
                image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
                popular: false,
                spicy: false
            },
            {
                id: 6,
                name: "ผัดผงกระหรี่ปู",
                description: "ปูผัดผงกระหรี่ ใส่ไข่และพริกไทย",
                price: 90,
                category: "stir-fry",
                image: "https://images.unsplash.com/photo-1626804475297-411dbe63c4d7?w=400",
                popular: true,
                spicy: true
            },
            {
                id: 7,
                name: "ก๋วยเตี๋ยวหลอด",
                description: "ก๋วยเตี๋ยวหลอดห่อด้วยถั่วงอกและเต้าหู้ พร้อมแคปหมู",
                price: 45,
                category: "noodles",
                image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
                popular: false,
                spicy: false
            },
            {
                id: 8,
                name: "แกงเขียวหวานไก่",
                description: "แกงเขียวหวานรสชาติเข้มข้น เนื้อไก่นุ่ม",
                price: 60,
                category: "soup",
                image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
                popular: true,
                spicy: true
            },
            {
                id: 9,
                name: "ข้าวหมูกรอบ",
                description: "หมูกรอบทอดกรอบนอกนุ่มใน ราดน้ำราดหน้า",
                price: 50,
                category: "rice",
                image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",
                popular: true,
                spicy: false
            },
            {
                id: 10,
                name: "ผัดหมี่โบราณ",
                description: "หมี่เหลืองผัดซีอิ๊วสูตรโบราณ ใส่หมูและไข่",
                price: 60,
                category: "noodles",
                image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
                popular: false,
                spicy: false
            },
            {
                id: 11,
                name: "ไก่ทอดกระเทียม",
                description: "ไก่ทอดกรอบคลุกกระเทียมเจียวกรอบหอม",
                price: 55,
                category: "fried",
                image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
                popular: true,
                spicy: false
            },
            {
                id: 12,
                name: "ผัดฉ่าทะเล",
                description: "รวมมิตรทะเลผัดฉ่า รสชาติเผ็ดจัด",
                price: 120,
                category: "stir-fry",
                image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
                popular: false,
                spicy: true
            }
        ]
    },

    // ─── เกี่ยวกับเรา ───
    about: {
        title: "เกี่ยวกับครัว 3 ป.",
        text: `ร้านอาหารตามสั่งที่คัดสรรวัตถุดิบคุณภาพ ปรุงด้วยความใส่ใจในทุกขั้นตอน 
เราภูมิใจในรสชาติอาหารไทยแท้ๆ ที่เข้มข้น ถึงเครื่อง ในราคาที่เข้าถึงได้

ที่ครัว 3 ป. เราเชื่อว่าอาหารที่ดีต้องมาจากหัวใจของคนทำ 
ทุกจานที่เสิร์ฟคือความตั้งใจและความภูมิใจของเรา`,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        stats: [
            { number: "5+", label: "ปีประสบการณ์" },
            { number: "50+", label: "เมนูให้เลือก" },
            { number: "1000+", label: "ลูกค้าประจำ" },
            { number: "4.5", label: "คะแนนความพึงพอใจ" }
        ]
    },

    // ─── แกลเลอรี่ ───
    gallery: {
        title: "แกลเลอรี่",
        subtitle: "บรรยากาศและเมนูอาหารของเรา",
        images: [
            { src: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400", caption: "ก๋วยเตี๋ยวหลอด" },
            { src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400", caption: "ผัดกะเพรา" },
            { src: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400", caption: "ต้มยำกุ้ง" },
            { src: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400", caption: "ผัดไทย" },
            { src: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400", caption: "แกงเขียวหวาน" },
            { src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400", caption: "ไก่ทอด" }
        ]
    },

    // ─── ติดต่อ ───
    contact: {
        title: "ติดต่อเรา",
        subtitle: "สั่งอาหารหรือสอบถามข้อมูลเพิ่มเติม",
        phone: "061-917-7557",
        address: "Caltex 49/54 อำเภอบางละมุง ชลบุรี",
        hours: [
            { day: "จันทร์ - ศุกร์", time: "14:00 - 20:00" },
            { day: "เสาร์ - อาทิตย์", time: "10:00 - 19:00" }
        ],
        mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=100.9215861%2C12.9501215%2C100.9335861%2C12.9581215&layer=mapnik&marker=12.9541215%2C100.9275861",
        googleMapsLink: "https://maps.app.goo.gl/LhfdYmeTp6oM5GFR7"
    },

    // ─── โซเชียลมีเดีย ───
    social: {
        facebook: "https://facebook.com/krua3por",
        instagram: "https://instagram.com/krua3por",
        line: "https://line.me/ti/p/@krua3por",
        tiktok: ""
    },

    // ─── ธีมสี (สามารถปรับแต่งได้) ───
    theme: {
        primaryColor: "#e74c3c",
        secondaryColor: "#f39c12",
        accentColor: "#27ae60",
        darkColor: "#2c3e50",
        lightColor: "#ecf0f1",
        textColor: "#333333",
        fontFamily: "'Prompt', sans-serif"
    }
};

// โหลด config
// 1) โหลดจาก localStorage ก่อน (แคชไว้ ให้หน้าเว็บขึ้นเร็วและใช้งานได้แม้เน็ตหลุด)
// 2) แล้วดึงค่าล่าสุดจากเซิร์ฟเวอร์ (Netlify Function) มาทับอีกที
//    เพื่อให้ทุกคนที่เข้าเว็บเห็นข้อมูลชุดเดียวกัน ไม่ใช่แค่ในเครื่องตัวเอง
async function loadConfig() {
    const saved = localStorage.getItem('krua3por_config');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(SITE_CONFIG, parsed);
        } catch (e) {
            console.log('ไม่สามารถโหลด config ที่บันทึกไว้ในเครื่องนี้ได้');
        }
    }

    try {
        const res = await fetch('/.netlify/functions/config');
        if (res.ok) {
            const remote = await res.json();
            if (remote) {
                Object.assign(SITE_CONFIG, remote);
                localStorage.setItem('krua3por_config', JSON.stringify(SITE_CONFIG));
            }
        }
    } catch (e) {
        console.log('ไม่สามารถโหลดข้อมูลล่าสุดจากเซิร์ฟเวอร์ได้ ใช้ข้อมูลที่มีอยู่ในเครื่องนี้แทน');
    }
}

// Promise ที่ app.js ต้องรอให้เสร็จก่อนเริ่มแสดงผลหน้าเว็บ
window.configReadyPromise = loadConfig();
