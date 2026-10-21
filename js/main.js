document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Helpers
    const DEBUG_I18N = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    const storage = {
        get(key, fallback) {
            try {
                const value = localStorage.getItem(key);
                return value === null ? fallback : value;
            } catch (error) {
                return fallback;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                console.warn(`Unable to save "${key}".`, error);
            }
        }
    };

    const navbar = document.querySelector('.navbar');
    const getNavOffset = () => (navbar ? navbar.offsetHeight : 0);

    function scrollToElement(element) {
        const top = element.getBoundingClientRect().top + window.scrollY - getNavOffset();
        window.scrollTo({ top: Math.max(top, 0), behavior: scrollBehavior });
    }

    // Translations
    const enToArabic = {
        "Home": "الرئيسية",
        "About": "نبذة",
        "Education": "التعليم",
        "Skills": "المهارات",
        "Experience": "الخبرات",
        "Services": "الخدمات",
        "Projects": "المشاريع",
        "Achievements": "الإنجازات",
        "Contact": "تواصل",
        "Contact Me": "تواصل معي",
        "Hello, I'm": "مرحبًا، أنا",
        "Abdulrahman Ramadan ARE": "عبدالرحمن رمضان",
        "Aspiring Junior Flutter Developer": "مطور تطبيقات Flutter مبتدئ طموح",
        "Building practical cross-platform mobile experiences with Flutter and Dart.": "أعمل على تطوير تطبيقات عملية للهواتف باستخدام Flutter وDart.",
        "View My Work": "شاهد أعمالي",
        "About Me": "نبذة عني",
        "I am a Computer Science student and aspiring Junior Cross-Platform Mobile App Developer with a strong foundation in C++, OOP, data structures, algorithms, SQL, and databases.": "أنا طالب علوم حاسب، وأسعى للعمل في تطوير تطبيقات الهواتف متعددة المنصات. لدي أساس في C++ والبرمجة كائنية التوجه (OOP) وهياكل البيانات والخوارزميات وSQL وقواعد البيانات.",
        "I enjoy building practical software projects, solving problems, and continuously improving my Flutter and Dart skills.": "أستمتع ببناء المشاريع البرمجية العملية وحل المشكلات وتطوير مهاراتي باستمرار في Flutter وDart.",
        "Bachelor of Computer Science": "بكالوريوس علوم الحاسب",
        "Higher Institute for Computer Science and Information Systems": "المعهد العالي لعلوم الحاسب ونظم المعلومات",
        "BACHELOR DEGREE · IN PROGRESS": "درجة البكالوريوس · قيد الدراسة",
        "Culture and Science City — Giza, Egypt": "مدينة الثقافة والعلوم — الجيزة، مصر",
        "Expected: 2028": "التخرج المتوقع: 2028",
        "GPA: 3.10": "المعدل التراكمي: 3.10",
        "My Skills": "مهاراتي",
        "Technical": "المهارات التقنية",
        "Tools I Use": "الأدوات التي أستخدمها",
        "Languages": "اللغات",
        "Building natively compiled cross-platform apps.": "تطوير تطبيقات متعددة المنصات باستخدام كود واحد.",
        "Object-oriented language for robust app logic.": "لغة كائنية التوجه لبناء منطق برمجي منظم.",
        "Backend logic, authentication, and cloud databases.": "منطق التطبيق الخلفي والمصادقة وقواعد البيانات السحابية.",
        "Integrating RESTful services for dynamic data flows.": "التكامل مع واجهات REST API للتعامل مع البيانات.",
        "Local data storage for offline experiences.": "تخزين البيانات محليًا لاستخدامها دون اتصال بالإنترنت.",
        "Crafting interfaces that adapt to all device screens.": "تصميم واجهات تتناسب مع أحجام الشاشات المختلفة.",
        "Arabic": "العربية",
        "Native": "اللغة الأم",
        "English": "الإنجليزية",
        "Good": "جيد",
        "Cross Platform App Development": "تطوير التطبيقات متعددة المنصات",
        "Digital Egypt Pioneers Initiative (DEPI) - Hybrid": "مبادرة رواد مصر الرقمية (DEPI) - تدريب هجين",
        "Jul 2026 - Present": "يوليو 2026 - الآن",
        "Challenge:": "التحدي:",
        "Mastering the full lifecycle of cross-platform mobile application development and advanced state management techniques.": "تطوير المهارات اللازمة لمراحل بناء تطبيقات الهواتف متعددة المنصات والتعامل مع تقنيات إدارة الحالة.",
        "Action:": "ما قمت به:",
        "Undertook intensive hybrid training, diving deep into Dart, Flutter, API integration, and Firebase, while consistently documenting and unit testing code.": "شاركت في تدريب هجين يركز على Dart وFlutter والتكامل مع واجهات API وFirebase، مع الاهتمام بتوثيق الكود واختباره.",
        "Result:": "النتيجة:",
        "Successfully developed scalable mobile applications ready for deployment on both Android and iOS platforms.": "تطوير تطبيقات قابلة للتوسع تستهدف منصتي Android وiOS.",
        "My Services": "خدماتي",
        "App Development": "تطوير التطبيقات",
        "Building high-quality iOS and Android apps using a single Flutter codebase.": "تطوير تطبيقات Android وiOS باستخدام قاعدة كود واحدة عبر Flutter.",
        "Flutter & Dart": "Flutter وDart",
        "State Management": "إدارة الحالة",
        "Responsive UI/UX": "واجهات وتجارب مستخدم متجاوبة",
        "Performance Tuning": "تحسين الأداء",
        "Optimizing app performance to run smoothly on low-end devices.": "تحسين أداء التطبيقات لتعمل بكفاءة على الأجهزة محدودة الإمكانيات.",
        "Memory Optimization": "تحسين استخدام الذاكرة",
        "Code Refactoring": "إعادة تنظيم الكود",
        "Widget Tree Management": "إدارة شجرة الـ Widgets",
        "Backend Binding": "الربط مع الخدمات الخلفية",
        "Integrating apps with Firebase, REST APIs, and handling complex data flow.": "ربط التطبيقات بخدمات Firebase وواجهات REST API والتعامل مع تدفق البيانات.",
        "Firebase Auth & Firestore": "مصادقة Firebase وقاعدة بيانات Firestore",
        "RESTful API Integration": "التكامل مع REST API",
        "Local Storage (SharedPrefs)": "التخزين المحلي باستخدام SharedPreferences",
        "Explore GitHub": "استكشف حسابي على GitHub",
        "Featured Projects": "أبرز المشاريع",
        "ATM System App": "تطبيق نظام صراف آلي",
        "Jan 12 - Jan 15, 2025": "12 - 15 يناير 2025",
        "Console-based ATM System in C++ with login authentication, transactions, and file-based account management.": "نظام صراف آلي يعمل من خلال سطر الأوامر باستخدام C++، مع تسجيل الدخول وتنفيذ المعاملات وإدارة الحسابات عبر الملفات.",
        "File Storage": "تخزين الملفات",
        "Offline": "دون اتصال بالإنترنت",
        "View on GitHub": "عرض المشروع على GitHub",
        "DEPI Selection": "القبول في DEPI",
        "Digital Egypt Pioneers Initiative": "مبادرة رواد مصر الرقمية",
        "Selected to join the prestigious MCIT initiative, undergoing intensive training in modern cross-platform development techniques.": "تم اختياري للانضمام إلى مبادرة رواد مصر الرقمية التابعة لوزارة الاتصالات، والمشاركة في تدريب على تطوير التطبيقات متعددة المنصات.",
        "3+ Active Projects": "أكثر من 3 مشاريع",
        "GitHub Open Source": "مشاريع متاحة على GitHub",
        "Successfully developed and deployed robust, well-documented source codes available for review on my GitHub Profile.": "تطوير مشاريع برمجية موثقة يمكن الاطلاع على كودها المصدري من خلال حسابي على GitHub.",
        "Responsive UI": "واجهات متجاوبة",
        "Get In Touch": "تواصل معي",
        "Let's Talk About Your Project": "لنتحدث عن مشروعك",
        "Feel free to reach out for collaborations, freelance work, or just to say hi! I am always open to discussing new projects.": "يمكنك التواصل معي للتعاون أو العمل الحر أو مناقشة أفكار ومشاريع برمجية جديدة.",
        "Email Me": "راسلني عبر البريد الإلكتروني",
        "WhatsApp": "واتساب",
        "Follow Me": "تابعني",
        "Your Name": "اسمك",
        "Your Email": "بريدك الإلكتروني",
        "Subject": "الموضوع",
        "Your Message": "اكتب رسالتك هنا...",
        "Send Message": "إرسال الرسالة",
        "Building robust, high-performance cross-platform mobile applications with a focus on clean architecture and seamless user experiences.": "تطوير تطبيقات هواتف متعددة المنصات مع الاهتمام بتنظيم الكود وتقديم تجربة استخدام سلسة.",
        "Quick Links": "روابط سريعة",
        "Social": "حساباتي الاجتماعية",
        "© 2026 Designed & Built by Abdulrahman Ramadan ARE. All Rights Reserved.": "© 2026 تصميم وتطوير عبدالرحمن رمضان. جميع الحقوق محفوظة.",
        "Pricing": "الأسعار",
        "PRICING PLANS": "خطط الأسعار",
        "We offer flexible pricing to suit your needs, whether you're just starting out or scaling up. Choose the plan that's right for you.": "خطط أسعار مرنة لتناسب احتياجات مشروعك. اختر الخطة الأنسب لك.",
        "Basic Plan": "الخطة الأساسية",
        "Standard Plan": "الخطة القياسية",
        "Premium Plan": "الخطة المميزة",
        "Custom Plan": "خطة مخصصة",
        "Contact Us": "تواصل معنا",
        "Features:": "المميزات:",
        "CHOOSE": "اختيار الخطة",
        "Basic UI/UX Design": "تصميم واجهة مستخدم أساسية",
        "Standard Features": "الميزات الأساسية للتطبيق",
        "Up to 3 Revisions": "حتى 3 تعديلات",
        "Standard Email Support": "دعم عبر البريد الإلكتروني",
        "Delivery in 5-7 Days": "التسليم خلال 5 إلى 7 أيام",
        "Custom Interactive UI/UX": "تصميم واجهة وتجربة مستخدم تفاعلية مخصصة",
        "API Integrations": "التكامل مع واجهات API",
        "Up to 7 Revisions": "حتى 7 تعديلات",
        "Priority Chat Support": "دعم عبر الدردشة بأولوية",
        "Source Code Provided": "تسليم الكود المصدري",
        "Full App Development": "تطوير تطبيق متكامل",
        "Database & Admin Panel": "قاعدة بيانات ولوحة تحكم",
        "Unlimited Revisions": "تعديلات غير محدودة",
        "24/7 Premium Support": "دعم مميز على مدار الساعة",
        "1 Month Free Maintenance": "صيانة مجانية لمدة شهر",
        "Enterprise-Grade Solutions": "حلول مخصصة للمؤسسات",
        "Custom Architecture": "معمارية برمجية مخصصة",
        "Dedicated Account Manager": "مسؤول مخصص لمتابعة المشروع",
        "Long-term Maintenance": "صيانة طويلة الأجل",
        "Tailored to Your Needs": "مصممة لتناسب احتياجاتك",
        "View Pricing Plans": "عرض خطط الأسعار",
        "Go to top": "العودة للأعلى",
        "Toggle Theme": "تبديل الوضع",
        "Toggle Language": "تبديل اللغة",
        "Visit Website": "زيارة الموقع"
    };

    const normalize = text => text.replace(/\s+/g, ' ').trim();

    const dictionary = new Map(
        Object.entries(enToArabic).map(([key, value]) => [normalize(key), value])
    );

    const SKIP_SELECTOR =
        'script, style, noscript, textarea, input, select, option, code, pre, [data-no-translate]';
    const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'alt'];

    const originalText = new WeakMap();
    const originalAttrs = new WeakMap();

    let currentLang = 'en';

    function translateTextNodes(isArabic) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const parent = node.parentElement;

                if (!parent || parent.closest(SKIP_SELECTOR)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return node.nodeValue.trim()
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        });

        let node;

        while ((node = walker.nextNode())) {
            if (!originalText.has(node)) {
                originalText.set(node, node.nodeValue);
            }

            const original = originalText.get(node);
            const key = normalize(original);
            const translation = isArabic ? dictionary.get(key) : undefined;

            if (translation !== undefined) {
                node.nodeValue = original.replace(
                    /^(\s*)[\s\S]*?(\s*)$/,
                    (_, lead, trail) => lead + translation + trail
                );
            } else {
                if (node.nodeValue !== original) {
                    node.nodeValue = original;
                }

                if (DEBUG_I18N && isArabic && /[A-Za-z]/.test(key)) {
                    console.warn('[i18n] Missing translation:', key);
                }
            }
        }
    }

    function translateAttributes(isArabic) {
        const selector = TRANSLATABLE_ATTRS.map(attr => `[${attr}]`).join(',');

        document.querySelectorAll(selector).forEach(element => {
            if (element.closest('[data-no-translate]')) {
                return;
            }

            let saved = originalAttrs.get(element);

            if (!saved) {
                saved = {};
                originalAttrs.set(element, saved);
            }

            TRANSLATABLE_ATTRS.forEach(attr => {
                if (!element.hasAttribute(attr)) {
                    return;
                }

                if (!(attr in saved)) {
                    saved[attr] = element.getAttribute(attr);
                }

                const translation = isArabic
                    ? dictionary.get(normalize(saved[attr]))
                    : undefined;

                element.setAttribute(attr, translation !== undefined ? translation : saved[attr]);
            });
        });
    }

    // Language
    function applyLanguage(lang, savePreference = true) {
        const isArabic = lang === 'ar';
        currentLang = isArabic ? 'ar' : 'en';

        const bsLtr = document.getElementById('bs-ltr');
        const bsRtl = document.getElementById('bs-rtl');

        if (bsLtr && bsRtl) {
            bsLtr.media = isArabic ? 'not all' : 'all';
            bsRtl.media = isArabic ? 'all' : 'not all';
        }

        translateTextNodes(isArabic);
        translateAttributes(isArabic);

        const root = document.documentElement;
        root.lang = currentLang;
        root.dir = isArabic ? 'rtl' : 'ltr';

        const langToggleBtn = document.getElementById('lang-toggle');

        if (langToggleBtn) {
            langToggleBtn.textContent = isArabic ? 'EN' : 'AR';
            langToggleBtn.setAttribute(
                'aria-label',
                isArabic ? 'Switch to English' : 'التبديل إلى العربية'
            );
        }

        if (savePreference) {
            storage.set('lang', currentLang);
        }
    }

    const langToggleBtn = document.getElementById('lang-toggle');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    applyLanguage(storage.get('lang', 'en') === 'ar' ? 'ar' : 'en', false);

    // Theme
    const themeToggleBtn = document.getElementById('theme-toggle');

    function applyTheme(theme, savePreference = true) {
        const isLight = theme === 'light';

        if (isLight) {
            document.body.setAttribute('data-theme', 'light');
        } else {
            document.body.removeAttribute('data-theme');
        }

        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');

            if (icon) {
                icon.className = isLight
                    ? 'fas fa-moon fs-5 text-dark'
                    : 'fas fa-sun fs-5 text-warning';
            }

            themeToggleBtn.setAttribute(
                'aria-label',
                isLight ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }

        if (savePreference) {
            storage.set('theme', isLight ? 'light' : 'dark');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            applyTheme(isLight ? 'dark' : 'light');
        });
    }

    applyTheme(storage.get('theme', 'dark') === 'light' ? 'light' : 'dark', false);

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(element => element.classList.add('active'));
    } else {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '0px 0px -10% 0px'
            }
        );

        revealElements.forEach(element => revealObserver.observe(element));
    }

    // Navigation and Back to Top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let ticking = false;

    function updateScrollUI() {
        ticking = false;

        const scrollY = window.scrollY;

        if (scrollTopBtn) {
            scrollTopBtn.style.display = scrollY > 300 ? 'flex' : 'none';
        }

        const atPageBottom =
            scrollY > 0 &&
            window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

        let currentSection = '';

        if (atPageBottom && sections.length > 0) {
            currentSection = sections[sections.length - 1].id;
        } else {
            const activationLine = getNavOffset() + 40;

            sections.forEach(section => {
                if (section.getBoundingClientRect().top <= activationLine) {
                    currentSection = section.id;
                }
            });
        }

        navLinks.forEach(link => {
            const isActive =
                currentSection !== '' &&
                link.getAttribute('href') === `#${currentSection}`;

            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function requestScrollUpdate() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateScrollUI);
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: scrollBehavior });
        });
    }

    updateScrollUI();

    // Pricing Plan Buttons
    function scrollToContact() {
        const contactSection = document.getElementById('contact');

        if (contactSection) {
            scrollToElement(contactSection);
        }
    }

    document.querySelectorAll('[data-action="choose-plan"]').forEach(button => {
        button.addEventListener('click', () => {
            const modalElement = button.closest('.modal');

            if (modalElement && modalElement.classList.contains('show')) {
                let done = false;

                const go = () => {
                    if (done) {
                        return;
                    }

                    done = true;
                    scrollToContact();
                };

                modalElement.addEventListener('hidden.bs.modal', go, { once: true });
                window.setTimeout(go, 800);
            } else {
                scrollToContact();
            }
        });
    });

    // Mobile Navbar
    const navbarCollapse = document.getElementById('navbarNav');

    if (navbarCollapse && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth >= 992 || !navbarCollapse.classList.contains('show')) {
                    return;
                }

                bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false }).hide();
            });
        });
    }
});