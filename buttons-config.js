// 1. HOME PAGE MAIN CARDS CONFIGURATION
const homeCategoryCards = [
    { id: 'gk', title: 'General Knowledge', icon: 'fa-book-open' },
    { id: 'science', title: 'General Science', icon: 'fa-flask' },
    { id: 'topic', title: 'Topic Wise GK', icon: 'fa-layer-group' },
    { id: 'math-tricks', title: 'Math Short Tricks', icon: 'fa-calculator' },
    { id: 'gk-tricks', title: 'GK Short Tricks', icon: 'fa-lightbulb' },
    { id: 'watch', title: 'Watch & Learn', icon: 'fa-video', iconColor: '#0284c7' },
    { id: 'practice', title: 'Practice GK Quiz', icon: 'fa-pen-to-square' },
    { id: 'test100', title: 'Test Your Knowledge', icon: 'fa-trophy' }
];

// 2. QUIZ & TEST SET BUTTONS CONFIGURATION
const quizSetsConfig = {
    gk: [
        { label: "GK Set 1 (5 Questions)", count: 5, offset: 0 },
        { label: "GK Set 2 (5 Questions)", count: 3, offset: 3 },
         { label: "GK Set 3 (5 Questions)", count: 5, offset: 0 },
        { label: "GK Set 4 (5 Questions)", count: 5, offset: 0 },
         { label: "GK Set 5 (5 Questions)", count: 5, offset: 0 },
        { label: "GK Set 6 (5 Questions)", count: 5, offset: 0 },
         { label: "GK Set 7 (5 Questions)", count: 5, offset: 0 },
        { label: "GK Set 8 (5 Questions)", count: 5, offset: 0 },
         { label: "GK Set 9 (5 Questions)", count: 5, offset: 0 },
        { label: "GK Set 10 (5 Questions)", count: 5, offset: 0 }
    ],
    science: [
        { label: "Science Set 1 (5 Questions)", count: 5, offset: 0 },
        { label: "Science Set 2 (5 Questions)", count: 5, offset: 0 }
    ],
    practice: [
        { label: "Practice Quiz Set 1 (20 Questions)", count: 20, offset: 0 },
        { label: "Practice Quiz Set 2 (10 Questions)", count: 10, offset: 0 }
    ],
    test100: [
        { label: "Test 100 Set 1 (20 Questions)", count: 20, offset: 0 },
        { label: "Test 100 Set 2 (10 Questions)", count: 10, offset: 10 }
    ]
};

// 3. TOPIC WISE GK BUTTONS CONFIGURATION
const topicWiseButtonsConfig = [
    { title: "भारत का इतिहास" },
    { title: "भारतीय संविधान" },
    { title: "भारत का भूगोल" },
    { title: "भारतीय अर्थशास्त्र" },
    { title: "महत्वपूर्ण राष्ट्रीय दिवस" }
];

// 4. MATH SHORT TRICKS BUTTONS (यहाँ limit में नंबर बदलकर तय करें कितने ट्रिक्स दिखने चाहिए)
const mathTricksButtonsConfig = [
    { label: "Math Tricks Set 1 (Top 4 Tricks)", limit: 4, startIndex: 0 },
    { label: "Math Tricks Set 2 (Next 3 Tricks)", limit: 3, startIndex: 4 },
    { label: "All Math Tricks (Total)", limit: 10, startIndex: 0 }
];

// 5. GK SHORT TRICKS BUTTONS
const gkTricksButtonsConfig = [
    { label: "GK Tricks Set 1 (First 5 Tricks)", limit: 5, startIndex: 0 },
    { label: "GK Tricks Set 2 (Next 5 Tricks)", limit: 5, startIndex: 5 },
    { label: "All GK Tricks (Total)", limit: 10, startIndex: 0 }
];

// 6. WATCH & LEARN VIDEO BUTTONS CONFIGURATION
const watchVideosButtonsConfig = [
    { label: "Video Set 1 (First 5 Videos)", limit: 5, startIndex: 0 },
    { label: "Video Set 2 (Next 5 Videos)", limit: 5, startIndex: 5 },
    { label: "All Watch & Learn Videos", limit: 10, startIndex: 0 }
];