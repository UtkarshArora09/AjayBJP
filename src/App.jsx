import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import CountUpModule from 'react-countup';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Safe CountUp ESM component resolution wrapper
const CountUp = (CountUpModule && (CountUpModule.default || CountUpModule)) || (() => null);

// =============================================================
// TRANSLATIONS OBJECT
// =============================================================
const translations = {
  hi: {
    nav: {
      home: "होम",
      about: "परिचय",
      journey: "सफर",
      work: "समाज सेवा",
      gallery: "गैलरी",
      contact: "संपर्क",
      join: "भाजपा से जुड़ें"
    },
    hero: {
      name: "डॉ. अजय शुक्ल",
      nameEn: "Dr. Ajay Shukla",
      party: "भारतीय जनता पार्टी",
      constituency: "भदोही, उत्तर प्रदेश",
      tagline: "आप दीजिये समर्थन, मैं दूंगा परिवर्तन",
      cta1: "और जानें",
      cta2: "संपर्क करें"
    },
    slides: [
      {
        label: "भारतीय जनता पार्टी — भदोही",
        heading: "डॉ. अजय शुक्ल",
        sub: "जनसेवा, विकास और परिवर्तन के प्रतिबद्ध कार्यकर्ता",
        imgLabel: "[UPLOAD: Main Portrait — Dr. Ajay Shukla]"
      },
      {
        label: "🇮🇳 अमृत महोत्सव",
        heading: "तिरंगा यात्रा में अग्रणी भूमिका",
        sub: "आजादी के 75वीं अमृत महोत्सव के तिरंगा यात्रा कार्यक्रम में जनसमूह के साथ सक्रिय भूमिका निभाई।",
        imgLabel: "[UPLOAD: Tiranga Yatra Photo]"
      },
      {
        label: "💪 मिशन शक्ति",
        heading: "नारी सुरक्षा, नारी सम्मान, नारी स्वावलंबन",
        sub: "उत्तर प्रदेश का गौरव तभी बढ़ेगा, जब हर नारी को सम्मान मिलेगा।",
        imgLabel: "[UPLOAD: Mission Shakti Photo]"
      },
      {
        label: "🧹 स्वच्छ भारत अभियान",
        heading: "जनता के साथ कंधे से कंधा मिलाकर श्रमदान",
        sub: "प्रधानमंत्री मोदी जी के आह्वान पर स्वच्छता अभियान में जनता के साथ सक्रिय भागीदारी।",
        imgLabel: "[UPLOAD: Swachh Bharat Photo]"
      },
      {
        label: "🏮 सांस्कृतिक एकता",
        heading: "श्रीराम शोभायात्रा — जंगीगंज",
        sub: "जंगीगंज बाजार में भव्य श्रीराम शोभायात्रा का आयोजन — सांस्कृतिक एवं धार्मिक समरसता का प्रतीक।",
        imgLabel: "[UPLOAD: Shri Ram Shobha Yatra Photo]"
      }
    ],
    about: {
      heading: "नेता से मिलें",
      bio: "डॉ. अजय शुक्ल भारतीय जनता पार्टी के समर्पित कार्यकर्ता हैं जो तीन दशकों से अधिक समय से भदोही की जनता की सेवा में संलग्न हैं। छात्र राजनीति से अपनी यात्रा प्रारंभ कर जिला पंचायत सदस्य तक की यात्रा उनके अदम्य साहस और जनसेवा के प्रति समर्पण की कहानी कहती है।",
      bioEn: "Dr. Ajay Shukla is a dedicated BJP worker who has been serving the people of Bhadohi for over three decades. His journey from student politics to District Panchayat Member is a testament to his unwavering commitment to public service.",
      details: [
        { label: "उम्र", value: "47 वर्ष" },
        { label: "शिक्षा", value: "एम.ए., पी.एच.डी." },
        { label: "पिता", value: "श्री शिवभूषण शुक्ल" },
        { label: "भाई", value: "डॉ. मनोज शुक्ल, डॉ. विनोद शुक्ल" },
        { label: "व्यवसाय", value: "कृषि एवं समाज सेवा" },
        { label: "निवास स्थान", value: "बड़ागाँव, जंगीगंज, भदोही, उत्तर प्रदेश" },
        { label: "राजनीतिक दल", value: "भारतीय जनता पार्टी" }
      ],
      imgLabel: "[UPLOAD: About Section Portrait]"
    },
    stats: [
      { number: 30, suffix: "+", label: "वर्षों की जनसेवा" },
      { number: 10000, suffix: "+", label: "मतों से विजय" },
      { number: 8, suffix: "+", label: "प्रमुख अभियान" },
      { number: 1000, suffix: "+", label: "सामाजिक कार्यक्रम" }
    ],
    journey: {
      heading: "सेवा का सफर",
      sub: "छात्र राजनीति से जनसेवा तक",
      items: [
        {
          year: "1994–1995",
          title: "छात्रसंघ महामंत्री",
          desc: "राजकीय स्नातकोत्तर महाविद्यालय, ज्ञानपुर से छात्रसंघ महामंत्री निर्वाचित।"
        },
        {
          year: "1998–1999",
          title: "छात्रसंघ अध्यक्ष",
          desc: "राजकीय स्नातकोत्तर महाविद्यालय, ज्ञानपुर से छात्रसंघ अध्यक्ष निर्वाचित।"
        },
        {
          year: "2005–2010",
          title: "जिला पंचायत सदस्य",
          desc: "वार्ड नं. 14 से जिला पंचायत सदस्य 10,000 से अधिक मतों से निर्वाचित।"
        },
        {
          year: "2012–2019",
          title: "सक्रिय भाजपा कार्यकर्ता",
          desc: "विधानसभा एवं लोकसभा चुनावों में सक्रिय कार्यकर्ता के रूप में कार्य किया।"
        },
        {
          year: "2021",
          title: "पश्चिम बंगाल चुनाव",
          desc: "पश्चिम बंगाल विधानसभा चुनाव में भाजपा सक्रिय कार्यकर्ता के रूप में कार्य किया।"
        },
        {
          year: "2022",
          title: "ज्ञानपुर विधानसभा",
          desc: "ज्ञानपुर विधानसभा से चुनाव की तैयारी, गठबंधन को टिकट जाने पर गठबंधन को समर्थन।"
        }
      ]
    },
    work: {
      heading: "समाज कल्याण योगदान",
      sub: "जनता की आवाज़, जनता की सेवा",
      items: [
        {
          icon: "🗳️",
          title: "चुनाव प्रचार — सुरियावां",
          desc: "लोकसभा क्षेत्र भदोही के सुरियावां नगर पंचायत भाजपा अध्यक्ष पद प्रत्याशी के चुनाव प्रचार में अग्रणी भूमिका।",
          imgLabel: "[UPLOAD: Work Card — Election Campaign Suriyawan]"
        },
        {
          icon: "🇮🇳",
          title: "तिरंगा यात्रा",
          desc: "आजादी के 75वीं अमृत महोत्सव के तिरंगा यात्रा कार्यक्रम में सक्रिय भूमिका।",
          imgLabel: "[UPLOAD: Work Card — Tiranga Yatra]"
        },
        {
          icon: "🎖️",
          title: "मीडिया सम्मान — उगापुर",
          desc: "लोकसभा क्षेत्र भदोही, ग्रामसभा उगापुर में media बंधुओं को सम्मानित करने का आयोजन।",
          imgLabel: "[UPLOAD: Work Card — Media Felicitation Ugapur]"
        },
        {
          icon: "💪",
          title: "मिशन शक्ति",
          desc: "नारी सुरक्षा, नारी सम्मान, नारी स्वावलंबन — उत्तर प्रदेश का गौरव तभी बढ़ेगा जब हर नारी को सम्मान मिलेगा।",
          imgLabel: "[UPLOAD: Work Card — Mission Shakti]"
        },
        {
          icon: "📱",
          title: "स्मार्टफोन वितरण",
          desc: "उत्तर प्रदेश सरकार द्वारा छात्र-छात्राओं को स्मार्टफोन वितरण कार्यक्रम में सहभागिता।",
          imgLabel: "[UPLOAD: Work Card — Smartphone Distribution]"
        },
        {
          icon: "🧹",
          title: "स्वच्छता अभियान",
          desc: "प्रधानमंत्री मोदी जी के आह्वान पर स्वच्छता अभियान में जनता के साथ श्रमदान। पूज्य बापू की प्रेरणा से स्वच्छ भारत को जीवन का लक्ष्य बनाया।",
          imgLabel: "[UPLOAD: Work Card — Swachh Bharat Abhiyan]"
        },
        {
          icon: "🏮",
          title: "श्रीराम शोभायात्रा",
          desc: "जंगीगंज बाजार में भव्य श्रीराम शोभायात्रा का आयोजन — सांस्कृतिक एवं धार्मिक समरसता का प्रतीक।",
          imgLabel: "[UPLOAD: Work Card — Shri Ram Shobha Yatra]"
        },
        {
          icon: "🏥",
          title: "कोरोना राहत कार्य",
          desc: "2020-21 कोरोना काल में हर ग्राम में सेनेटाइज़र एवं राहत सामग्री का घर-घर वितरण।",
          imgLabel: "[UPLOAD: Work Card — Covid Relief]"
        }
      ]
    },
    gallery: {
      heading: "सेवा के पल",
      sub: "तस्वीरें",
      viewMore: "Instagram पर और देखें",
      photos: [
        "चुनाव प्रचार — सुरियावां",
        "तिरंगा यात्रा — अमृत महोत्सव",
        "मीडिया सम्मान — उगापुर",
        "मिशन शक्ति कार्यक्रम",
        "स्मार्टफोन वितरण",
        "समर्थक भेंट",
        "स्वच्छता अभियान — श्रमदान",
        "श्रीराम शोभायात्रा — जंगीगंज",
        "कोरोना राहत कार्य",
        "जनसभा — भदोही",
        "पश्चिम बंगाल चुनाव प्रचार",
        "ग्राम भ्रमण",
        "पार्टी कार्यक्रम",
        "जनसंपर्क अभियान",
        "कार्यकर्ता बैठक",
        "विकास कार्यों का निरीक्षण",
        "जनता दरबार",
        "समारोह संबोधन"
      ]
    },
    vision: {
      heading: "विजन",
      quote: "हमारी ताकत हमारी एकता में है, हमारा भविष्य हमारे संकल्प में है",
      attribution: "— डॉ. अजय शुक्ल",
      pillars: [
        { icon: "🏗️", title: "विकास", desc: "भदोही की तरक्की के लिए समर्पित" },
        { icon: "🎓", title: "शिक्षा", desc: "युवाओं को अवसर देना हमारी प्राथमिकता" },
        { icon: "🤝", title: "सामाजिक न्याय", desc: "हर वर्ग की आवाज़ उठाना हमारा कर्तव्य" }
      ]
    },
    contact: {
      heading: "संपर्क करें",
      namePlaceholder: "आपका नाम",
      phonePlaceholder: "मोबाइल नंबर",
      messagePlaceholder: "आपका संदेश",
      send: "संदेश भेजें"
    },
    footer: {
      tagline: "आप दीजिये समर्थन, मैं दूंगा परिवर्तन",
      copy: "© 2025 डॉ. अजय शुक्ल | भारतीय जनता पार्टी — भदोही, उ.प्र."
    }
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      journey: "Journey",
      work: "Service",
      gallery: "Gallery",
      contact: "Contact",
      join: "Join BJP"
    },
    hero: {
      name: "Dr. Ajay Shukla",
      nameEn: "Dr. Ajay Shukla",
      party: "Bharatiya Janata Party",
      constituency: "Bhadohi, Uttar Pradesh",
      tagline: "You give support, I will bring change",
      cta1: "Know More",
      cta2: "Contact Us"
    },
    slides: [
      {
        label: "BJP — Bhadohi",
        heading: "Dr. Ajay Shukla",
        sub: "A committed worker for public service, development and change",
        imgLabel: "[UPLOAD: Main Portrait — Dr. Ajay Shukla]"
      },
      {
        label: "🇮🇳 Amrit Mahotsav",
        heading: "Leading the Tiranga Yatra",
        sub: "Played an active role marching with the people in India's 75th Independence Amrit Mahotsav Tiranga Yatra.",
        imgLabel: "[UPLOAD: Tiranga Yatra Photo]"
      },
      {
        label: "💪 Mission Shakti",
        heading: "Women's Safety, Dignity & Self-Reliance",
        sub: "Uttar Pradesh will rise in glory only when every woman is respected.",
        imgLabel: "[UPLOAD: Mission Shakti Photo]"
      },
      {
        label: "🧹 Swachh Bharat",
        heading: "Volunteering Shoulder to Shoulder with the People",
        sub: "Active participation in Swachh Bharat Abhiyan at PM Modi's call for a cleaner India.",
        imgLabel: "[UPLOAD: Swachh Bharat Photo]"
      },
      {
        label: "🏮 Cultural Unity",
        heading: "Shri Ram Shobha Yatra — Jangiganj",
        sub: "Organized grand Shri Ram Shobha Yatra in Jangiganj — a symbol of cultural and religious harmony.",
        imgLabel: "[UPLOAD: Shri Ram Shobha Yatra Photo]"
      }
    ],
    about: {
      heading: "Meet the Leader",
      bio: "Dr. Ajay Shukla is a dedicated BJP worker who has been serving the people of Bhadohi for over three decades. His journey from student politics to District Panchayat Member is a testament to his unwavering commitment to public service.",
      details: [
        { label: "Age", value: "47 Years" },
        { label: "Education", value: "M.A., Ph.D." },
        { label: "Father", value: "Shri Shivabhushan Shukla" },
        { label: "Brothers", value: "Dr. Manoj Shukla, Dr. Vinod Shukla" },
        { label: "Profession", value: "Agriculture & Social Service" },
        { label: "Address", value: "Badagaon, Jangiganj, Bhadohi, U.P." },
        { label: "Party", value: "Bharatiya Janata Party" }
      ],
      imgLabel: "[UPLOAD: About Section Portrait]"
    },
    stats: [
      { number: 30, suffix: "+", label: "Years of Public Service" },
      { number: 10000, suffix: "+", label: "Votes Won (2005)" },
      { number: 8, suffix: "+", label: "Major Campaigns" },
      { number: 1000, suffix: "+", label: "Community Programs" }
    ],
    journey: {
      heading: "Timeline of Service",
      sub: "From Student Politics to Public Service",
      items: [
        { year: "1994–1995", title: "College Union General Secretary", desc: "Elected General Secretary of Students' Union, Government PG College, Gyanpur." },
        { year: "1998–1999", title: "College Union President", desc: "Elected President of Students' Union, Government PG College, Gyanpur." },
        { year: "2005–2010", title: "District Panchayat Member", desc: "Elected from Ward No. 14 with over 10,000 votes majority." },
        { year: "2012–2019", title: "Active BJP Worker", desc: "Worked actively for BJP across multiple Assembly and Lok Sabha elections." },
        { year: "2021", title: "West Bengal Elections", desc: "Served as active BJP worker in West Bengal Legislative Assembly elections." },
        { year: "2022", title: "Gyanpur Vidhan Sabha", desc: "Prepared for Gyanpur election; extended support to alliance when ticket went to partner." }
      ]
    },
    work: {
      heading: "Welfare Initiatives",
      sub: "Voice of the People, Service to the People",
      items: [
        { icon: "🗳️", title: "Election Campaign – Suriyawan", desc: "Led the election campaign for BJP Chairperson candidate in Suriyawan Nagar Panchayat.", imgLabel: "[UPLOAD: Work Card — Election Campaign Suriyawan]" },
        { icon: "🇮🇳", title: "Tiranga Yatra", desc: "Active role in the Tiranga Yatra during India's 75th Independence Amrit Mahotsav.", imgLabel: "[UPLOAD: Work Card — Tiranga Yatra]" },
        { icon: "🎖️", title: "Media Felicitation – Ugapur", desc: "Organized felicitation of media representatives at Gram Sabha Ugapur, Bhadohi.", imgLabel: "[UPLOAD: Work Card — Media Felicitation Ugapur]" },
        { icon: "💪", title: "Mission Shakti", desc: "Active in Mission Shakti for women's safety, dignity and self-reliance.", imgLabel: "[UPLOAD: Work Card — Mission Shakti]" },
        { icon: "📱", title: "Smartphone Distribution", desc: "UP Government smartphone distribution program for students in Bhadohi.", imgLabel: "[UPLOAD: Work Card — Smartphone Distribution]" },
        { icon: "🧹", title: "Swachh Bharat Abhiyan", desc: "Volunteered in Swachh Bharat at PM Modi's call, inspired by Mahatma Gandhi's vision.", imgLabel: "[UPLOAD: Work Card — Swachh Bharat Abhiyan]" },
        { icon: "🏮", title: "Shri Ram Shobha Yatra", desc: "Organized Shri Ram Shobha Yatra in Jangiganj — symbol of cultural harmony.", imgLabel: "[UPLOAD: Work Card — Shri Ram Shobha Yatra]" },
        { icon: "🏥", title: "Covid Relief", desc: "Door-to-door relief material distribution across villages during Covid-19, 2020-21.", imgLabel: "[UPLOAD: Work Card — Covid Relief]" }
      ]
    },
    gallery: {
      heading: "Moments of Service",
      sub: "Photos",
      viewMore: "See More on Instagram",
      photos: [
        "Election Campaign – Suriyawan",
        "Tiranga Yatra – Amrit Mahotsav",
        "Media Felicitation – Ugapur",
        "Mission Shakti Event",
        "Smartphone Distribution",
        "Meeting with Supporters",
        "Swachh Bharat – Volunteer Work",
        "Shri Ram Shobha Yatra – Jangiganj",
        "Covid Relief Work",
        "Public Meeting – Bhadohi",
        "West Bengal Election Campaign",
        "Village Outreach",
        "Party Program",
        "Public Relations Campaign",
        "Party Worker Meeting",
        "Inspection of Development Works",
        "Public Court (Janata Darbar)",
        "Ceremonial Address"
      ]
    },
    vision: {
      heading: "Vision",
      quote: "Our strength is in our unity, our future is in our resolve",
      attribution: "— Dr. Ajay Shukla",
      pillars: [
        { icon: "🏗️", title: "Development", desc: "Dedicated to Bhadohi's growth and progress" },
        { icon: "🎓", title: "Education", desc: "Empowering youth with opportunity and skills" },
        { icon: "🤝", title: "Social Justice", desc: "Raising the voice of every section of society" }
      ]
    },
    contact: {
      heading: "Get in Touch",
      namePlaceholder: "Your Name",
      phonePlaceholder: "Mobile Number",
      messagePlaceholder: "Your Message",
      send: "Send Message"
    },
    footer: {
      tagline: "You give support, I will bring change",
      copy: "© 2025 Dr. Ajay Shukla | Bharatiya Janata Party — Bhadohi, U.P."
    }
  }
};

// =============================================================
// LANGUAGE CONTEXT & PROVIDER
// =============================================================
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('hi');

  const toggleLang = () => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// =============================================================
// BJP LOTUS SVG COMPONENT (8 Petals in Circle)
// =============================================================
const LotusSVG = ({ className = "w-18 h-18" }) => (
  <img
    src="assests/bjp-logo.png"
    className={`${className} object-contain`}
    alt="BJP Logo"
  />
);

// =============================================================
// SCROLL-TRIGGERED COUNTUP COMPONENT
// =============================================================
const ScrollTriggeredCountUp = ({ end, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="text-center py-4 md:py-0">
      <div className="text-4xl md:text-5xl font-bold text-goldAccent font-inter">
        {inView ? <CountUp start={0} end={end} duration={2.0} /> : '0'}
        <span className="text-goldAccent ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm text-mutedText mt-2 uppercase tracking-widest font-inter">
        {label}
      </p>
    </div>
  );
};

// =============================================================
// LOADING SCREEN COMPONENT
// =============================================================
const LoadingScreen = ({ onComplete }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(true), 1400);
    const completeTimeout = setTimeout(onComplete, 1800);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-pageBg z-[100] flex flex-col justify-center items-center transition-opacity duration-400 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="loading-lotus-pulse flex justify-center items-center">
        <LotusSVG className="w-[72px] h-[72px]" color="#E8621A" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-primarySaffron font-tiro tracking-wide">
        डॉ. अजय शुक्ल
      </h1>
      <p className="mt-1 text-mutedText/60 font-inter text-xs uppercase tracking-widest">
        BJP Leader – Bhadohi
      </p>
    </div>
  );
};

// =============================================================
// NAVBAR COMPONENT
// =============================================================
const Navbar = () => {
  const { lang, t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'journey', 'work', 'gallery', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const menuItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'journey', label: t.nav.journey },
    { id: 'work', label: t.nav.work },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white border-b border-saffronBorder shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <LotusSVG className="w-8 h-8" color="#E8621A" />
            <div>
              <span className="block text-primarySaffron font-bold text-lg leading-tight transition-colors duration-300">
                {lang === 'hi' ? 'डॉ. अजय शुक्ल' : 'Dr. Ajay Shukla'}
              </span>
              <span className="block text-[9px] uppercase font-bold text-mutedText/75 tracking-wider font-inter">
                BJP Bhadohi, U.P.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="flex items-center space-x-4">
              {menuItems.map((item, idx) => (
                <React.Fragment key={item.id}>
                  {idx > 0 && <span className="text-saffronBorder select-none text-xs">|</span>}
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`font-inter text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 ${activeSection === item.id ? 'text-primarySaffron' : 'text-darkText/80 hover:text-primarySaffron'}`}
                  >
                    {item.label}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Language Toggle Selector */}
            <button
              onClick={toggleLang}
              className="ml-4 px-3 py-1 rounded-full border border-primarySaffron font-bold text-xs uppercase text-primarySaffron hover:bg-primarySaffron hover:text-white transition-colors duration-200 flex items-center space-x-1"
            >
              <span>🌐</span>
              <span>{lang === 'hi' ? 'EN' : 'हिं'}</span>
            </button>

            {/* Join Now Capsule button matching Stitch */}
            <a
              href="https://membership.bjp.org/en/home/login"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-1.5 bg-primarySaffron text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-saffronLight transition-colors duration-200 inline-block"
            >
              {t.nav.join}
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLang}
              className="px-2 py-0.5 rounded-full border border-primarySaffron font-bold text-[10px] uppercase text-primarySaffron"
            >
              {lang === 'hi' ? 'EN' : 'हिं'}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 text-primarySaffron focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute top-0 left-0 w-full bg-pageBg border-b border-saffronBorder shadow-2xl z-50 px-6 py-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <LotusSVG className="w-7 h-7" color="#E8621A" />
                  <span className="text-primarySaffron font-bold text-base">{lang === 'hi' ? 'डॉ. अजय शुक्ल' : 'Dr. Ajay Shukla'}</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-mutedText hover:text-primarySaffron p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-inter font-bold text-sm py-3 border-b border-saffronBorder uppercase tracking-widest ${activeSection === item.id ? 'text-primarySaffron' : 'text-darkText/80'}`}
                  >
                    {item.label}
                  </button>
                ))}

                <a
                  href="https://membership.bjp.org/en/home/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full mt-4 bg-primarySaffron text-white font-bold py-3 rounded text-center text-xs uppercase tracking-widest hover:bg-saffronLight block"
                >
                  {t.nav.join}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// =============================================================
// HERO SLIDESHOW COMPONENT
// =============================================================
const HeroSlideshow = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideshowImages = Array.from({ length: 15 }, (_, i) => `assests/new-${i + 1}.jpeg`);

  return (
    <section id="home" className="relative w-full h-[calc(100vh-72px)] mt-[72px] overflow-hidden bg-pageBg">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop={true}
        speed={1400}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {slideshowImages.map((imgSrc, idx) => (
          <SwiperSlide key={idx} className="w-full h-full relative">
            <img
              src={imgSrc}
              className="w-full h-full object-cover object-center"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              alt={`Slide ${idx + 1}`}
            />
            {/* Subtle Vignette & Gradient for aesthetic styling and navbar readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30 pointer-events-none z-10" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// ABOUT SECTION COMPONENT
// =============================================================
const AboutSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="bg-pageBg py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* Left: Portrait placeholder with overlapping stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-[40%] flex flex-col items-center mb-16 lg:mb-0 relative"
          >
            <div className="relative w-[280px] sm:w-[320px]">
              {/* Ribbon Badge */}
              <div className="absolute top-0 left-0 right-0 bg-primarySaffron text-white text-[10px] font-bold py-1.5 text-center uppercase tracking-widest z-20">
                भारतीय जनता पार्टी | BJP
              </div>

              {/* Frame Structure */}
              <div className="p-1 border border-saffronBorder rounded bg-white shadow-xl overflow-hidden pt-8">
                <img
                  src="assests/hero-politician.jpg"
                  className="w-full h-[360px] sm:h-[390px] rounded object-cover"
                  alt="Dr. Ajay Shukla"
                />
              </div>

              {/* Overlapping Stats Badge matching Stitch */}
              <div className="absolute -bottom-6 -right-4 bg-white border border-saffronBorder rounded-sm p-4 shadow-xl z-20 text-left font-inter min-w-[150px] hidden md:block">
                <div className="mb-2 pb-2 border-b border-saffronBorder">
                  <span className="block text-xl font-black text-goldAccent">30+</span>
                  <span className="block text-[9px] uppercase font-bold text-mutedText tracking-wider">
                    {lang === 'hi' ? 'सेवा के वर्ष' : 'Years of Service'}
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-goldAccent">1000+</span>
                  <span className="block text-[9px] uppercase font-bold text-mutedText tracking-wider">
                    {lang === 'hi' ? 'सार्वजनिक कार्यक्रम' : 'Public Events'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-[60%] lg:pl-16 text-left mt-8 lg:mt-0"
          >
            <span className="block text-xs uppercase tracking-widest text-primarySaffron mb-2 font-inter font-bold">
              {t.nav.about}
            </span>
            <h2 className="text-4xl font-bold text-darkText font-heading">
              {t.about.heading}
            </h2>
            <div className="w-10 h-0.5 bg-primarySaffron my-4" />

            <p className="text-base text-mutedText leading-relaxed mb-8 font-inter">
              {t.about.bio}
            </p>

            {/* Details rows grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-inter mb-6">
              {t.about.details.map((detail, idx) => (
                <div key={idx} className="pb-3 border-b border-saffronBorder">
                  <span className="block text-[10px] uppercase font-bold text-primarySaffron tracking-widest mb-1">
                    {detail.label}
                  </span>
                  <span className="text-sm font-medium text-darkText leading-normal">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById('journey');
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                }}
                className="text-primarySaffron font-bold text-sm tracking-wider hover:text-saffronLight transition-colors uppercase font-inter"
              >
                {lang === 'hi' ? 'विस्तृत जीवनी पढ़ें →' : 'Read Detailed Biography →'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tagline callout in place of stats bar */}
        <div className="mt-16 bg-saffronPale border border-saffronBorder rounded py-10 px-8 shadow-lg relative overflow-hidden text-center">
          <div className="absolute inset-0 repeating-bg-texture opacity-20 z-0" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-3xl md:text-5xl text-primarySaffron mb-4 block leading-none">❝</span>
            <p className="text-xl md:text-2xl font-bold text-darkText leading-relaxed font-heading">
              {lang === 'hi'
                ? 'आप दीजिये समर्थन, मै दूंगा परिवर्तन'
                : 'You give support, I will bring change'}
            </p>
            <p className="text-sm md:text-base font-bold text-goldAccent mt-4 uppercase tracking-wider font-inter">
              {lang === 'hi' ? '— डॉ. अजय शुक्ला' : '— Dr. Ajay Shukla'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================
// JOURNEY TIMELINE COMPONENT
// =============================================================
const JourneyTimeline = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="journey" className="bg-pageBg py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-widest text-primarySaffron mb-2 block font-inter font-bold">
            {t.nav.journey}
          </span>
          <div className="flex items-center justify-center space-x-4">
            <div className="hidden sm:block w-16 h-px bg-saffronBorder" />
            <h2 className="text-3xl md:text-4xl font-bold text-darkText font-heading">
              {t.journey.heading}
            </h2>
            <div className="hidden sm:block w-16 h-px bg-saffronBorder" />
          </div>
          <p className="text-sm text-mutedText mt-2 uppercase tracking-widest font-inter font-semibold">
            {t.journey.sub}
          </p>
        </motion.div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical dashed centerline */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line" />

          <div className="space-y-12">
            {t.journey.items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} justify-between items-start md:items-center w-full`}
                >
                  {/* Badge representing year */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-16 bg-primarySaffron text-white font-bold text-[10px] tracking-wider py-1.5 rounded text-center border border-pageBg z-10 font-inter">
                    {item.year.split('–')[0]}
                  </div>

                  {/* Card content with subtle translation */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'}`}
                  >
                    <div className="bg-cardBg p-6 rounded border border-cardBorder shadow-md hover:shadow-lg hover:border-cardHoverBorder border-l-4 border-l-primarySaffron transition-all duration-300">
                      <span className="inline-block px-3 py-1 bg-saffronPale text-primarySaffron text-[10px] font-bold rounded-full mb-3 tracking-widest font-inter">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-darkText mb-2 leading-snug">{item.title}</h3>
                      <p className="text-mutedText text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================
// WORK SECTION COMPONENT (8 cards)
// =============================================================
const WorkSection = () => {
  const { lang, t } = useLanguage();

  const gradients = [
    'from-saffronPale to-sectionAltBg',
    'from-sectionAltBg to-pageBg',
    'from-saffronPale to-pageBg',
    'from-sectionAltBg to-saffronPale',
    'from-pageBg to-sectionAltBg',
    'from-saffronPale to-sectionAltBg',
    'from-sectionAltBg to-pageBg',
    'from-pageBg to-saffronPale'
  ];

  return (
    <section id="work" className="bg-sectionAltBg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primarySaffron mb-2 block font-inter font-bold">
            {t.nav.work}
          </span>
          <div className="flex items-center justify-center space-x-4">
            <div className="hidden sm:block w-16 h-px bg-saffronBorder" />
            <h2 className="text-3xl md:text-4xl font-bold text-darkText font-heading">
              {t.work.heading}
            </h2>
            <div className="hidden sm:block w-16 h-px bg-saffronBorder" />
          </div>
          <p className="text-sm text-mutedText mt-2 uppercase tracking-widest font-inter font-semibold">
            {t.work.sub}
          </p>
        </motion.div>

        {/* 8 Work Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.work.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
              }}
              className="bg-cardBg rounded border border-cardBorder overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-cardHoverBorder transition-all duration-300 flex flex-col h-full border-t-2 border-t-primarySaffron"
            >
              {/* Image Area */}
              <div className="w-full h-44 overflow-hidden relative group">
                <img
                  src={`assests/new-${(idx % 15) + 1}.jpeg`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                <span className="absolute top-3 left-3 bg-white/90 border border-saffronBorder backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">
                  {item.icon}
                </span>
              </div>

              {/* Content area */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-darkText leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-mutedText text-xs leading-relaxed mt-2 line-clamp-3 font-inter">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// =============================================================
// GALLERY SECTION COMPONENT
// =============================================================
const GallerySection = () => {
  const { lang, t } = useLanguage();
  const [lightboxData, setLightboxData] = useState(null); // { type: 'gallery' | 'news', index: number }

  const galleryImages = [
    'gallery-1.jpg',
    'gallery-2.jpg',
    'gallery-3.jpg',
    'gallery-4.jpg',
    'gallery-5.jpg',
    'gallery-18.jpg',
    'gallery-6.jpg',
    'gallery-7.jpg',
    'gallery-8.jpg',
    'gallery-9.jpg',
    'gallery-10.jpg',
    'gallery-11.jpg',
    'gallery-12.jpg',
    'gallery-13.jpg',
    'gallery-14.jpg',
    'gallery-15.jpg',
    'gallery-16.jpg',
    'gallery-17.jpg'
  ];

  const handlePrev = () => {
    setLightboxData((prev) => {
      if (!prev) return null;
      const total = prev.type === 'gallery' ? t.gallery.photos.length : 18;
      return { ...prev, index: (prev.index - 1 + total) % total };
    });
  };

  const handleNext = () => {
    setLightboxData((prev) => {
      if (!prev) return null;
      const total = prev.type === 'gallery' ? t.gallery.photos.length : 18;
      return { ...prev, index: (prev.index + 1) % total };
    });
  };

  // Gradient palettes for photo grids matching Saffron/Cream/Gold
  const tileGradients = [
    'from-saffronPale to-sectionAltBg',
    'from-sectionAltBg to-pageBg',
    'from-saffronPale to-pageBg',
    'from-sectionAltBg to-saffronPale',
    'from-pageBg to-sectionAltBg',
    'from-saffronPale to-sectionAltBg',
    'from-sectionAltBg to-pageBg',
    'from-pageBg to-saffronPale',
    'from-saffronPale to-sectionAltBg',
    'from-sectionAltBg to-pageBg',
    'from-saffronPale to-pageBg',
    'from-sectionAltBg to-saffronPale'
  ];

  // Alternating heights for masonry feel
  const heights = [
    'h-[200px]', 'h-[260px]', 'h-[220px]', 'h-[240px]',
    'h-[200px]', 'h-[260px]', 'h-[220px]', 'h-[240px]',
    'h-[200px]', 'h-[260px]', 'h-[220px]', 'h-[240px]'
  ];

  // Esc and key binding for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxData) return;
      if (e.key === 'Escape') setLightboxData(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData]);

  return (
    <section id="gallery" className="bg-pageBg py-24 px-6 text-darkText relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primarySaffron mb-2 block font-inter font-bold">
            {t.nav.gallery}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-darkText font-heading">
            {t.gallery.heading}
          </h2>
          <div className="w-10 h-px bg-primarySaffron mx-auto mt-4" />
          <p className="text-sm text-goldAccent mt-2 uppercase tracking-widest font-inter font-semibold">
            {t.gallery.sub}
          </p>
        </motion.div>

        {/* PHOTO MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mb-20">
          {t.gallery.photos.map((photo, idx) => {
            const imgName = galleryImages[idx] || `gallery-${idx + 1}.jpg`;
            const isGallery18 = imgName === 'gallery-18.jpg';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                onClick={() => setLightboxData({ type: 'gallery', index: idx })}
                className={`w-full rounded-sm overflow-hidden cursor-pointer relative group border border-saffronBorder shadow-md ${
                  isGallery18 ? 'aspect-[4/3]' : ''
                }`}
              >
                {/* Gradient Area placeholder */}

                <img
                  src={`assests/${imgName}`}
                  className={`w-full transition-transform duration-500 group-hover:scale-105 ${
                    isGallery18 ? 'h-full object-cover object-center' : 'h-auto'
                  }`}
                  alt={photo}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primarySaffron/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                  <span className="text-white text-xs font-bold uppercase tracking-widest font-inter bg-black/60 px-3 py-1.5 rounded mb-2">
                    {lang === 'hi' ? '🔍 तस्वीर देखें' : '🔍 View Image'}
                  </span>
                  <span className="text-white text-sm font-semibold drop-shadow-md leading-normal">
                    {photo}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NEWS COVERAGE SECTION */}
        <div className="mb-16 border-t border-saffronBorder pt-16">
          <h3 className="text-xs uppercase tracking-widest text-primarySaffron mb-8 text-center font-bold font-inter">
            {lang === 'hi' ? 'समाचार कवरेज' : 'News Coverage'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 18 }).map((_, idx) => {
              const num = idx + 1;
              const imgSrc = `photos/he${num}.jpeg`;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                  onClick={() => setLightboxData({ type: 'news', index: idx })}
                  className="bg-cardBg rounded overflow-hidden shadow-lg border border-cardBorder flex flex-col h-full group hover:border-cardHoverBorder cursor-pointer transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative group">
                    <img
                      src={imgSrc}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={`News Coverage ${num}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `assests/new${num}.jpeg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase tracking-widest font-inter bg-black/60 px-3 py-1.5 rounded">
                        {lang === 'hi' ? '🔍 विस्तार से देखें' : '🔍 View News'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/iamajayshuklabjp?igsh=dGJ3ZTJydDQ4eGIx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-primarySaffron text-primarySaffron font-bold px-8 py-3 rounded text-xs uppercase tracking-widest hover:bg-primarySaffron hover:text-white transition-all duration-200"
          >
            → {t.gallery.viewMore}
          </a>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxData !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4"
            onClick={() => setLightboxData(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxData(null)}
              className="absolute top-6 right-6 text-white/75 hover:text-white p-3 rounded-full font-bold text-lg leading-none transition-colors"
            >
              ✕
            </button>

            {/* Left Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 text-white/65 hover:text-primarySaffron p-4 font-bold text-xl leading-none transition-colors"
            >
              ❮
            </button>

            {/* Right Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 text-white/65 hover:text-primarySaffron p-4 font-bold text-xl leading-none transition-colors"
            >
              ❯
            </button>

            {/* Large image/placeholder */}
            <motion.div
              key={`${lightboxData.type}-${lightboxData.index}`}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh] rounded overflow-hidden bg-black flex flex-col justify-center items-center relative border border-primarySaffron/40 shadow-2xl"
            >
              <img
                src={
                  lightboxData.type === 'gallery'
                    ? `assests/${galleryImages[lightboxData.index] || `gallery-${lightboxData.index + 1}.jpg`}`
                    : `photos/he${lightboxData.index + 1}.jpeg`
                }
                className="max-w-full max-h-[65vh] object-contain"
                alt={
                  lightboxData.type === 'gallery'
                    ? t.gallery.photos[lightboxData.index]
                    : 'News Coverage'
                }
                onError={(e) => {
                  if (lightboxData.type === 'news') {
                    e.target.onerror = null;
                    e.target.src = `assests/new${lightboxData.index + 1}.jpeg`;
                  }
                }}
              />
              <div className="p-4 w-full bg-black/95 text-center text-white border-t border-primarySaffron/40">
                <span className="text-[10px] uppercase tracking-widest text-goldAccent font-bold font-inter">
                  {lightboxData.type === 'gallery' ? 'BJP Public Event' : 'Media Coverage'}
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1 mb-2">
                  {lightboxData.type === 'gallery'
                    ? t.gallery.photos[lightboxData.index]
                    : null}
                </h3>
                <div className="inline-block px-3 py-1 bg-white/10 rounded text-[10px] text-white/80 font-inter">
                  {lightboxData.type === 'gallery'
                    ? `Image ${lightboxData.index + 1} of ${t.gallery.photos.length}`
                    : `Image ${lightboxData.index + 1} of 18`}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// =============================================================
// VISION SECTION COMPONENT
// =============================================================
const VisionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-sectionAltBg py-24 px-6 text-darkText relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto"
        >
          <span className="block text-7xl text-primarySaffron/25 font-serif leading-none select-none text-center">
            “
          </span>
          <p className="text-xl md:text-2xl italic font-medium leading-relaxed max-w-xl mx-auto font-heading text-darkText">
            {t.vision.quote}
          </p>
          <span className="block text-xs uppercase tracking-widest text-primarySaffron font-bold mt-4 font-inter">
            {t.vision.attribution}
          </span>
          <div className="w-16 h-px bg-primarySaffron mx-auto mt-8" />
        </motion.div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {t.vision.pillars.map((pillar, pidx) => (
            <motion.div
              key={pidx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: pidx * 0.1 }}
              className="bg-cardBg border border-cardBorder rounded p-8 text-center hover:-translate-y-1 hover:shadow-lg hover:border-cardHoverBorder transition-all duration-300 border-t-2 border-t-primarySaffron flex flex-col justify-center items-center"
            >
              <div className="w-12 h-12 rounded-full bg-saffronPale border border-saffronBorder flex items-center justify-center text-2xl mb-4">
                {pillar.icon}
              </div>
              <h4 className="text-base font-bold text-darkText mb-2 leading-tight">{pillar.title}</h4>
              <p className="text-mutedText text-xs leading-relaxed font-inter">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================
// CONTACT SECTION COMPONENT
// =============================================================
const ContactSection = () => {
  const { lang, t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="bg-pageBg py-24 px-6 text-darkText">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primarySaffron mb-2 block font-inter font-bold">
            संपर्क / Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-darkText font-heading">
            {t.contact.heading}
          </h2>
          <div className="w-10 h-px bg-primarySaffron mx-auto mt-4" />
        </motion.div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="col-span-1 lg:col-span-5 bg-cardBg border border-cardBorder border-t-2 border-t-primarySaffron rounded p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <LotusSVG className="w-10 h-10" color="#E8621A" />
                <div>
                  <h3 className="font-bold text-base text-goldAccent">{lang === 'hi' ? 'डॉ. अजय शुक्ल' : 'Dr. Ajay Shukla'}</h3>
                  <span className="text-[10px] uppercase text-mutedText/70 tracking-wider">BJP Leader – Bhadohi, U.P.</span>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-5 font-inter">
                <div className="pb-3 border-b border-saffronBorder">
                  <span className="block text-[9px] uppercase font-bold text-primarySaffron tracking-widest mb-1">
                    {lang === 'hi' ? 'फ़ोन नंबर' : 'Phone'}
                  </span>
                  <a href="tel:+919415375693" className="text-sm font-semibold text-darkText hover:text-primarySaffron transition-colors">
                    +91 9415375693
                  </a>
                </div>

                <div className="pb-3 border-b border-saffronBorder">
                  <span className="block text-[9px] uppercase font-bold text-primarySaffron tracking-widest mb-1">
                    {lang === 'hi' ? 'ईमेल' : 'Email'}
                  </span>
                  <a href="mailto:iamAjayShuklaBJP@gmail.com" className="text-sm font-semibold text-darkText hover:text-primarySaffron transition-colors">
                    iamAjayShuklaBJP@gmail.com
                  </a>
                </div>

                <div className="pb-3">
                  <span className="block text-[9px] uppercase font-bold text-primarySaffron tracking-widest mb-1">
                    {lang === 'hi' ? 'निवास पता' : 'Address'}
                  </span>
                  <p className="text-xs font-medium text-mutedText leading-relaxed">
                    {lang === 'hi'
                      ? 'ग्राम – बड़ागाँव, पोस्ट – जंगीगंज, जिला – भदोही, उत्तर प्रदेश'
                      : 'Village Badagaon, Post Jangiganj, Bhadohi, U.P.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels row */}
            <div className="mt-8 pt-6 border-t border-saffronBorder">
              <span className="block text-[9px] uppercase font-bold text-primarySaffron tracking-widest mb-3 font-inter">
                जुड़ें / Follow
              </span>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/iamajayshuklabjp?igsh=dGJ3ZTJydDQ4eGIx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-saffronBorder flex items-center justify-center text-mutedText hover:bg-primarySaffron hover:text-white hover:border-primarySaffron transition-all"
                >
                  <span className="text-xs font-bold font-inter">IG</span>
                </a>
                <a
                  href="https://www.facebook.com/share/19RkahjGha/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-saffronBorder flex items-center justify-center text-mutedText hover:bg-primarySaffron hover:text-white hover:border-primarySaffron transition-all"
                >
                  <span className="text-xs font-bold font-inter">FB</span>
                </a>
                <a
                  href="https://wa.me/919415375693"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-saffronBorder flex items-center justify-center text-mutedText hover:bg-primarySaffron hover:text-white hover:border-primarySaffron transition-all"
                >
                  <span className="text-xs font-bold font-inter">WA</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="col-span-1 lg:col-span-7 bg-cardBg border border-cardBorder border-t-2 border-t-primarySaffron rounded p-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-5">
                  <input
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-pageBg border border-saffronBorder focus:border-primarySaffron focus:ring-1 focus:ring-primarySaffron focus:outline-none text-darkText placeholder-mutedText/40 px-4 py-3 rounded text-sm transition-all duration-200"
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="tel"
                    required
                    placeholder={t.contact.phonePlaceholder}
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-pageBg border border-saffronBorder focus:border-primarySaffron focus:ring-1 focus:ring-primarySaffron focus:outline-none text-darkText placeholder-mutedText/40 px-4 py-3 rounded text-sm transition-all duration-200"
                  />
                </div>

                <div className="mb-8">
                  <textarea
                    rows="3"
                    placeholder={t.contact.messagePlaceholder}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-pageBg border border-saffronBorder focus:border-primarySaffron focus:ring-1 focus:ring-primarySaffron focus:outline-none text-darkText placeholder-mutedText/40 px-4 py-3 rounded text-sm transition-all duration-200 resize-none"
                  ></textarea>
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded text-center text-xs font-bold font-inter">
                  {lang === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message Sent Successfully!'}
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-primarySaffron hover:bg-saffronLight text-white font-bold py-4 rounded-sm text-xs uppercase tracking-widest transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  {t.contact.send}
                </button>
              )}
            </form>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full mt-16"
        >
          <iframe
            title="Bhadohi Map Location"
            src="https://maps.google.com/maps?q=Bhadohi,Uttar Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            className="rounded border border-saffronBorder shadow-md"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

// =============================================================
// FOOTER COMPONENT
// =============================================================
const Footer = () => {
  const { lang, t } = useLanguage();

  const handleFooterLink = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-sectionAltBg text-darkText py-16 px-6 border-t border-primarySaffron/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Lotus */}
        <LotusSVG className="w-11 h-11" color="#E8621A" />

        {/* Name */}
        <h3 className="text-xl font-bold text-goldAccent mt-4 font-heading">
          {lang === 'hi' ? 'डॉ. अजय शुक्ल' : 'Dr. Ajay Shukla'}
        </h3>

        {/* Party */}
        <span className="block text-xs uppercase font-bold text-mutedText/80 tracking-wider font-inter mt-1">
          {t.hero.party} — {t.hero.constituency}
        </span>

        {/* Tagline */}
        <p className="text-sm italic text-mutedText/65 mt-2">
          "{t.footer.tagline}"
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-primarySaffron/30 my-8"></div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest font-inter">
          {[
            { id: 'home', label: t.nav.home },
            { id: 'about', label: t.nav.about },
            { id: 'journey', label: t.nav.journey },
            { id: 'work', label: t.nav.work },
            { id: 'gallery', label: t.nav.gallery },
            { id: 'contact', label: t.nav.contact }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => handleFooterLink(link.id)}
              className="text-mutedText hover:text-primarySaffron transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Join BJP Link in Footer */}
        <div className="mb-8">
          <a
            href="https://membership.bjp.org/en/home/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-primarySaffron text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-saffronLight transition-colors duration-200 inline-block shadow-md hover:shadow-lg"
          >
            {lang === 'hi' ? 'भाजपा से जुड़ें' : 'Join BJP'}
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-3 mb-8">
          {[
            { href: "https://www.instagram.com/iamajayshuklabjp?igsh=dGJ3ZTJydDQ4eGIx", label: "IG" },
            { href: "https://www.facebook.com/share/19RkahjGha/?mibextid=wwXIfr", label: "FB" },
            { href: "https://wa.me/919415375693", label: "WA" }
          ].map((soc, sidx) => (
            <a
              key={sidx}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-saffronBorder flex items-center justify-center text-mutedText hover:bg-primarySaffron hover:text-white hover:border-primarySaffron transition-all font-inter text-xs font-bold"
            >
              {soc.label}
            </a>
          ))}
        </div>

        {/* Full divider */}
        <div className="w-full h-px bg-saffronBorder/40 mb-6"></div>

        {/* Copyright */}
        <p className="text-[10px] text-mutedText/60 font-inter">
          {t.footer.copy}
        </p>
      </div>
    </footer>
  );
};

// =============================================================
// FLOATING BUTTONS COMPONENT
// =============================================================
const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Floating Button (Right) */}
      <div
        className="fixed bottom-8 right-8 z-50 flex flex-col items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 bg-footerBg text-white font-bold text-[10px] px-3 py-1.5 rounded shadow-xl whitespace-nowrap border border-white/10 font-inter uppercase tracking-wider"
            >
              WhatsApp
            </motion.div>
          )}
        </AnimatePresence>
        <a
          href="https://wa.me/919415375693"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[52px] h-[52px] bg-whatsapp text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm5.835-3.292c1.661.986 3.285 1.503 4.908 1.504 5.514.003 10.02-4.507 10.024-10.027.002-2.674-1.037-5.188-2.93-7.085-1.892-1.894-4.403-2.933-7.078-2.934C5.253.169.75 4.679.746 10.2c-.001 1.76.46 3.477 1.395 4.996L1.134 20.24l5.241-1.374c-.16.27-.32.54-.483.824z" />
          </svg>
        </a>
      </div>

      {/* Scroll to Top Floating Button (Left) */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 w-[52px] h-[52px] bg-primarySaffron text-white rounded-full flex items-center justify-center shadow-lg hover:scale-108 active:scale-95 transition-all duration-200"
            title="Scroll to top"
          >
            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// =============================================================
// MAIN APP CONTENT WRAPPER
// =============================================================


const AppContent = ({ loadingVisible, loadingFade, onLoadingComplete }) => {
  const { lang } = useLanguage();

  return (
    <div className={`relative min-h-screen selection:bg-saffronAccent selection:text-white ${lang === 'hi' ? 'font-tiro font-bold' : 'font-inter'}`}>
      {/* Loading Screen */}
      {loadingVisible && (
        <LoadingScreen onComplete={onLoadingComplete} />
      )}

      {/* Main Website Structure */}
      <div className={`transition-opacity duration-700 ${loadingFade || !loadingVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <HeroSlideshow />
        <AboutSection />
        <JourneyTimeline />
        <WorkSection />
        <GallerySection />
        <VisionSection />
        <ContactSection />
        <Footer />
        <FloatingButtons />
      </div>
    </div>
  );
};

// =============================================================
// MAIN ENTRY POINT
// =============================================================
function App() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [loadingFade, setLoadingFade] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingFade(true);
    setTimeout(() => {
      setLoadingVisible(false);
    }, 400);
  };

  return (
    <LanguageProvider>
      <AppContent
        loadingVisible={loadingVisible}
        loadingFade={loadingFade}
        onLoadingComplete={handleLoadingComplete}
      />
    </LanguageProvider>
  );
}

export default App;
