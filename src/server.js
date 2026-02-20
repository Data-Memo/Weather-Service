require('dotenv').config(); // هذا السطر يسمح للسيرفر بقراءة المفتاح من ملف .env
const express = require('express'); // استدعاء مكتبة express لإنشاء السيرفر
const axios = require('axios');     // استدعاء مكتبة axios لطلب البيانات من API الطقس
const path = require('path');       // مكتبة للتعامل مع مسارات الملفات

const app = express();
const PORT = 8080;                  // المنفذ المطلوب في مواصفات المشروع
const API_KEY = process.env.API_KEY; // جلب مفتاح API من متغيرات البيئة للأمان

// تفعيل الوصول للمجلد العام الذي يحتوي على صفحة الـ HTML
app.use(express.static(path.join(__dirname, 'public')));

// المسار الرئيسي لجلب بيانات الطقس
app.get('/weather', async (req, res) => {
    const city = req.query.city;    // استقبال اسم المدينة من المستخدم
    const lang = req.query.lang || 'en'; // استقبال اللغة (الافتراضية إنجليزية)

    if (!city) return res.status(400).json({ error: "City is required" });
    if (!API_KEY) return res.status(500).json({ error: "API_KEY missing" });

    try {
        // بناء الرابط وإرسال الطلب لـ OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`;
        const response = await axios.get(url);
        const data = response.data;

        // إرجاع البيانات المطلوبة بتنسيق JSON
        res.json({
            city: data.name,
            temperature: `${Math.round(data.main.temp)}°C`, // تقريب درجة الحرارة
            condition: data.weather[0].description,      // وصف الحالة الجوية
            timestamp: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
        });
    } catch (error) {
        res.status(404).json({ error: "Error" });
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Weather service is running on port ${PORT}`);
});