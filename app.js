let currentQuizData = [];
let currentQIndex = 0;
let userAnswers = {};
let currentQuizTitle = "";

window.addEventListener('DOMContentLoaded', () => {
    renderHomeCards();
});

function renderHomeCards() {
    const container = document.getElementById('main-cards-container');
    if (!container) return;
    container.innerHTML = '';

    homeCategoryCards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'cat-card';
        div.onclick = () => openCategory(card.id);

        const iconStyle = card.iconColor ? `style="color: ${card.iconColor};"` : '';
        div.innerHTML = `
            <i class="fa-solid ${card.icon}" ${iconStyle}></i>
            <h3>${card.title}</h3>
        `;
        container.appendChild(div);
    });
}

function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('show');
}

function showHome() {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('home-view').classList.add('active');
    document.getElementById('mobile-nav').classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getQuestions(category, count, offset = 0) {
    let sourceArray = (category.toLowerCase() === 'gk') ? allGkQuestions : allScienceQuestions;
    return sourceArray.slice(offset, offset + count);
}

function getQuizQuestions(category, count, offset = 0) {
    let sourceArray = (category.toLowerCase() === 'practice') ? allPracticeQuestions : allTest100Questions;
    let result = sourceArray.slice(offset, offset + count);
    if (result.length < count && sourceArray.length > 0) {
        let temp = [];
        for (let i = 0; i < count; i++) {
            temp.push(sourceArray[i % sourceArray.length]);
        }
        result = temp;
    }
    return result;
}

function openCategory(catKey) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('mobile-nav').classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById('set-buttons-container');
    container.innerHTML = '';

    if (['gk', 'science', 'practice', 'test100'].includes(catKey)) {
        document.getElementById('set-title').innerText = `${catKey.toUpperCase()} Quiz Sets`;
        const setList = quizSetsConfig[catKey] || [];
        setList.forEach(setItem => {
            const btn = document.createElement('button');
            btn.className = 'set-btn';
            btn.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${setItem.label}`;
            if (catKey === 'gk' || catKey === 'science') {
                btn.onclick = () => openQAView(setItem.label, catKey, setItem.count, setItem.offset);
            } else {
                btn.onclick = () => startQuizPlayer(setItem.label, catKey, setItem.count, setItem.offset);
            }
            container.appendChild(btn);
        });
        document.getElementById('set-select-view').classList.add('active');

    } else if (catKey === 'topic') {
        document.getElementById('set-title').innerText = "Topic Wise GK";
        topicWiseButtonsConfig.forEach((item) => {
            const btn = document.createElement('button');
            btn.className = 'set-btn';
            btn.innerHTML = `<i class="fa-solid fa-folder-open"></i> ${item.title}`;
            btn.onclick = () => openTopicQAView(item.title);
            container.appendChild(btn);
        });
        document.getElementById('set-select-view').classList.add('active');

    } else if (catKey === 'math-tricks') {
        document.getElementById('set-title').innerText = "Math Short Tricks Sets";
        mathTricksButtonsConfig.forEach((cfg) => {
            const btn = document.createElement('button');
            btn.className = 'set-btn';
            btn.innerHTML = `<i class="fa-solid fa-calculator"></i> ${cfg.label}`;
            btn.onclick = () => renderTricksFeed('Math Short Tricks', mathTricksDatabase, cfg.startIndex, cfg.limit);
            container.appendChild(btn);
        });
        document.getElementById('set-select-view').classList.add('active');

    } else if (catKey === 'gk-tricks') {
        document.getElementById('set-title').innerText = "GK Short Tricks Sets";
        gkTricksButtonsConfig.forEach((cfg) => {
            const btn = document.createElement('button');
            btn.className = 'set-btn';
            btn.innerHTML = `<i class="fa-solid fa-lightbulb"></i> ${cfg.label}`;
            btn.onclick = () => renderTricksFeed('GK Short Tricks', gkTricksDatabase, cfg.startIndex, cfg.limit);
            container.appendChild(btn);
        });
        document.getElementById('set-select-view').classList.add('active');

    } else if (catKey === 'watch') {
        document.getElementById('set-title').innerText = "Watch & Learn Sets";
        watchVideosButtonsConfig.forEach((cfg) => {
            const btn = document.createElement('button');
            btn.className = 'set-btn';
            btn.innerHTML = `<i class="fa-solid fa-video"></i> ${cfg.label}`;
            btn.onclick = () => renderVideoGridView(cfg.startIndex, cfg.limit);
            container.appendChild(btn);
        });
        document.getElementById('set-select-view').classList.add('active');
    }
}

function renderTricksFeed(titleText, dbArray, startIdx, limitCount) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('feed-title').innerText = titleText;
    const container = document.getElementById('feed-content');
    container.innerHTML = '';

    const slicedData = dbArray.slice(startIdx, startIdx + limitCount);

    slicedData.forEach(item => {
        container.innerHTML += `
            <div class="trick-box">
                <h4>${item.title}</h4>
                <p>${item.body}</p>
            </div>
        `;
    });
    document.getElementById('plain-feed-view').classList.add('active');
}

function renderVideoGridView(startIdx, limitCount) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const container = document.getElementById('video-container');
    container.innerHTML = '';

    const slicedVideos = videoDatabase.slice(startIdx, startIdx + limitCount);

    slicedVideos.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-card-logo"><i class="fa-solid fa-play"></i></div>
            <div class="video-card-title">${item.title}</div>
        `;
        card.onclick = () => openVideoModal(item.videoId, item.title);
        container.appendChild(card);
    });
    document.getElementById('watch-view').classList.add('active');
}

function openQAView(title, category = 'gk', count = 5, offset = 0) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('qa-title').innerText = title;
    const container = document.getElementById('qa-content-list');
    container.innerHTML = '';

    const questionsList = getQuestions(category, count, offset);

    questionsList.forEach((item, index) => {
        container.innerHTML += `
            <div class="qa-item">
                <p>${index + 1}. ${item.q}</p>
                <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
                <div class="ans-text">उत्तर: ${item.ans}</div>
            </div>
        `;
    });
    
    document.getElementById('qa-view').classList.add('active');
}

function openTopicQAView(topicName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('qa-title').innerText = topicName;
    const container = document.getElementById('qa-content-list');
    container.innerHTML = '';

    const questionsList = topicWiseDatabase[topicName] || [];

    questionsList.forEach((item, index) => {
        container.innerHTML += `
            <div class="qa-item">
                <p>${index + 1}. ${item.q}</p>
                <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
                <div class="ans-text">उत्तर: ${item.ans}</div>
            </div>
        `;
    });
    
    document.getElementById('qa-view').classList.add('active');
}

function toggleAns(btn) {
    const ans = btn.parentElement.querySelector('.ans-text');
    if (ans.style.display === 'block') {
        ans.style.display = 'none';
        btn.innerText = 'Show Answer';
    } else {
        ans.style.display = 'block';
        btn.innerText = 'Hide Answer';
    }
}

function openVideoModal(videoId, title) {
    document.getElementById('modal-video-title').innerText = title;
    document.getElementById('modal-iframe').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    document.getElementById('video-modal').style.display = 'flex';
}

function closeVideoModal() {
    document.getElementById('modal-iframe').src = '';
    document.getElementById('video-modal').style.display = 'none';
}

function startQuizPlayer(title, category = 'practice', totalQs = 20, offset = 0) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('quiz-player-title').innerText = title;
    currentQuizTitle = title;
    
    document.getElementById('quiz-box').style.display = 'block';
    document.getElementById('quiz-result-container').style.display = 'none';

    const rawQs = getQuizQuestions(category, totalQs, offset);
    
    currentQuizData = rawQs.map((item, idx) => ({
        q: `${idx + 1}. ${item.q}`,
        options: item.opts,
        correct: item.ans
    }));

    userAnswers = {};
    currentQIndex = 0;
    renderQuizQuestion();
    document.getElementById('quiz-player-view').classList.add('active');
}

function renderQuizQuestion() {
    const q = currentQuizData[currentQIndex];
    document.getElementById('quiz-progress').innerText = `Question ${currentQIndex + 1} of ${currentQuizData.length}`;
    document.getElementById('quiz-q-text').innerText = q.q;

    const opts = document.getElementById('quiz-options');
    opts.innerHTML = '';

    document.getElementById('prev-btn').disabled = (currentQIndex === 0);
    
    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = (currentQIndex === currentQuizData.length - 1) ? "Submit Quiz" : "Next";

    const answered = userAnswers.hasOwnProperty(currentQIndex);

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;

        if (answered) {
            btn.disabled = true;
            if (idx === q.correct) btn.classList.add('correct');
            if (userAnswers[currentQIndex] === idx && idx !== q.correct) btn.classList.add('incorrect');
        } else {
            btn.onclick = () => selectOption(idx);
        }
        opts.appendChild(btn);
    });
}

function selectOption(idx) {
    userAnswers[currentQIndex] = idx;
    renderQuizQuestion();
}

function nextQuestion() {
    if (currentQIndex < currentQuizData.length - 1) {
        currentQIndex++;
        renderQuizQuestion();
    } else {
        showQuizResult();
    }
}

function prevQuestion() {
    if (currentQIndex > 0) {
        currentQIndex--;
        renderQuizQuestion();
    }
}

function showQuizResult() {
    document.getElementById('quiz-box').style.display = 'none';

    let total = currentQuizData.length;
    let correct = 0;
    let incorrect = 0;

    currentQuizData.forEach((item, index) => {
        if (userAnswers.hasOwnProperty(index)) {
            if (userAnswers[index] === item.correct) {
                correct++;
            } else {
                incorrect++;
            }
        }
    });

    let accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    let badgeText = accuracy >= 80 ? "🏆 Excellent Performance!" : accuracy >= 50 ? "👍 Good Job!" : "💪 Keep Practicing!";

    const resultContainer = document.getElementById('quiz-result-container');
    resultContainer.innerHTML = `
        <div class="result-card">
            <div class="result-icon"><i class="fa-solid fa-award"></i></div>
            <h2>Quiz Completed!</h2>
            <p class="result-subtitle">Here is your performance summary for <strong>${currentQuizTitle}</strong></p>
            <div class="badge-tag">${badgeText}</div>
            <div class="result-stats-grid">
                <div class="stat-box total"><span class="stat-val">${total}</span><span class="stat-lbl">Total Questions</span></div>
                <div class="stat-box correct"><span class="stat-val">${correct}</span><span class="stat-lbl">Correct Answers</span></div>
                <div class="stat-box incorrect"><span class="stat-val">${incorrect}</span><span class="stat-lbl">Incorrect Answers</span></div>
                <div class="stat-box accuracy"><span class="stat-val">${accuracy}%</span><span class="stat-lbl">Accuracy</span></div>
            </div>
            <button class="restart-btn" onclick="startQuizPlayer('${currentQuizTitle}', 'practice', ${total})">
                <i class="fa-solid fa-rotate-right"></i> Restart Quiz
            </button>
        </div>
    `;
    resultContainer.style.display = 'block';
}