let tipBox = {
    tipsArr: [
        "All paths lead to themselves.",
        "The ancient people of this earth knew about the relationship between time and light.",
        "The 2nd mastery lesson is that time is polymeric and monochrome.",
        "Good painting is like good cooking; it can be tasted, but not explained.",
        "The blues are an activity for elephants and depressed people.",
        "Sometimes a moment is enough to forget life, and sometimes there is not enough life to forget a moment."],
    tipBoxWrapper: document.getElementById('tip-box-wrapper'),
    tipsHeader: document.getElementById('tips-header'),
    tipInfo: document.getElementById('tip-info'),
    currentCard: 0,
    closeCross: document.getElementById('cross'),
    prevCardButton: document.getElementById('prev-button'),
    nextCardButton: document.getElementById('next-button'),
    dontShowCheckbox: document.getElementById('disable-checkbox'),
}

tipBox.closeCross.addEventListener('click', () => {
    tipBox.tipBoxWrapper.hidden = true;
});

function prevCard() {
    if (tipBox.currentCard === 0) {
        tipBox.currentCard = tipBox.tipsArr.length;
    }
    tipBox.currentCard--;
    update();
}

tipBox.prevCardButton.addEventListener('click', prevCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft") {
        prevCard();
    }
});

function nextCard() {
    if (tipBox.currentCard === tipBox.tipsArr.length - 1) {
        tipBox.currentCard = -1;
    }
    tipBox.currentCard++;
    update();
}

tipBox.nextCardButton.addEventListener('click', nextCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowRight") {
        nextCard();
    }
});

tipBox.dontShowCheckbox.addEventListener('change', () => {
    if (tipBox.dontShowCheckbox.checked === true) {
        localStorage.setItem('show-tips', '0');
    } else {
        localStorage.setItem('show-tips', '1');
    }
});

document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        tipBox.tipBoxWrapper.hidden = true;
    }
});

function update() {
    tipBox.tipsHeader.innerText = 'TIP OF THE DAY';
    tipBox.tipInfo.innerText = tipBox.tipsArr[tipBox.currentCard];
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].setAttribute('class', 'fas fa-circle dot cursor-pointer');
    }
    tipBox.tipBoxDots[tipBox.currentCard].setAttribute('class', 'far fa-circle dot');
}

function printDots() {
    let tipBoxDotsContainer = document.getElementById('tip-box-dots');
    for (let i = 0; i < tipBox.tipsArr.length; i++) {
        tipBoxDotsContainer.innerHTML += "<i class=\"fas fa-circle dot cursor-pointer\"></i>";
    }
    tipBox.tipBoxDots = document.querySelectorAll('i.dot');
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].addEventListener('click', () => {
            tipBox.currentCard = i;
            update();
        });
    }
}

function init() {
    tipBox.tipBoxWrapper.hidden = true;
    if (localStorage.getItem('show-tips') === '0') {
        return;
    }
    printDots();
    update();
    setTimeout(() => tipBox.tipBoxWrapper.hidden = false, 5000);
}

init();
