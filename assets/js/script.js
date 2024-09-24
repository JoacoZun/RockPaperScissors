document.querySelector('.rules-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.rules-popup').classList.toggle('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
});

document.querySelector('.close-icon').addEventListener('click', () => {
    document.querySelector('.rules-popup').classList.remove('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
});

let gameItemsCont = Array.from(document.querySelectorAll("div[class^='game-body__circle-container'"));
let tempoV;
let tempoArr = [];
let stateFlag = false;

let playerScore = 0;
let houseScore = 0;

setScore('init'); // Inicializa el marcador al inicio

gameItemsCont.forEach((e) => {
    e.addEventListener('click', function () {
        tempoV = e;
        swipe(stateFlag, gameItemsCont, tempoV, tempoArr);
        stateFlag = true;
    });
});

function swipe(flag, arr, slim, tmpArr) {
    if (flag === true) {
        return; // Evita continuar si ya hay un estado activo
    }

    document.querySelector('.bg-triangle').classList.add('bg-triangle--s2');
    document.querySelector('.choosed-item--com__bg-circle').classList.add('choosed-item--com__bg-circle--s2');

    arr.filter((e) => {
        if (slim !== arr[arr.indexOf(e)]) {
            tmpArr.push(e);
        }
    });

    let comItem = tmpArr[Math.floor(Math.random() * tmpArr.length)];
    slim.classList.add('choosed-item--user');
    tmpArr.forEach((e) => {
        e.classList.add('unchoosed-item');
    });

    setTimeout(() => {
        comItem.classList.remove('unchoosed-item');
        comItem.classList.add('choosed-item--com');
    }, 1000);

    setTimeout(() => {
        document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
    }, 1000);

    let headingUser = document.createElement('h3');
    let headingUserContent = document.createTextNode('You Picked');
    headingUser.classList.add('you-picked');
    headingUser.append(headingUserContent);
    slim.append(headingUser);

    let headingCom = document.createElement('h3');
    let headingComContent = document.createTextNode('The house Picked');
    headingCom.append(headingComContent);
    headingCom.classList.add('you-picked');
    comItem.append(headingCom);

    // Logica del juego
    if (slim.className.includes('paper')) {
        if (comItem.className.includes('rock')) {
            gameOver('win', headingUser, headingCom);
            setTimeout(() => {
                setScore('win');
            }, 1500);
            setTimeout(() => {
                highlightEffect(slim);
            }, 1250);
        } else {
            gameOver('lose', headingUser, headingCom);
            setTimeout(() => {
                setScore('lose');
            }, 1500);
            setTimeout(() => {
                highlightEffect(comItem);
            }, 1250);
        }
    } else if (slim.className.includes('rock')) {
        if (comItem.className.includes('scissors')) {
            gameOver('win', headingUser, headingCom);
            setTimeout(() => {
                setScore('win');
            }, 1500);
            setTimeout(() => {
                highlightEffect(slim);
            }, 1250);
        } else {
            gameOver('lose', headingUser, headingCom);
            setTimeout(() => {
                setScore('lose');
            }, 1500);
            setTimeout(() => {
                highlightEffect(comItem);
            }, 1250);
        }
    } else if (slim.className.includes('scissors')) {
        if (comItem.className.includes('rock')) {
            gameOver('lose', headingUser, headingCom);
            setTimeout(() => {
                setScore('lose');
            }, 1500);
            setTimeout(() => {
                highlightEffect(comItem);
            }, 1250);
        } else {
            gameOver('win', headingUser, headingCom);
            setTimeout(() => {
                setScore('win');
            }, 1500);
            setTimeout(() => {
                highlightEffect(slim);
            }, 1250);
        }
    }
}

function highlightEffect(slim) {
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c3 = document.createElement('div');
    slim.append(c1);
    slim.append(c2);
    slim.append(c3);
    c1.classList.add('circle');
    c1.classList.add('circle--1');
    c2.classList.add('circle');
    c2.classList.add('circle--2');
    c3.classList.add('circle');
    c3.classList.add('circle--3');
}

function gameOver(state, hUser1, hCom1) {
    let heading = document.createElement('h2');
    let playAgain = document.createElement('button');
    let gameOverCont = document.createElement('div');
    let playAgainSen = document.createTextNode('Play Again');
    let winSen = document.createTextNode('You Win');
    let loseSen = document.createTextNode('You Lose');
    heading.classList.add('gameoversen');
    playAgain.classList.add('btn');
    gameOverCont.classList.add('game-over-container');
    playAgain.append(playAgainSen);

    if (state == 'win') {
        heading.append(winSen);
    } else if (state == 'lose') {
        heading.append(loseSen);
    }

    gameOverCont.append(heading);
    gameOverCont.append(playAgain);

    setTimeout(() => {
        document.querySelector('main').insertBefore(gameOverCont, document.querySelector('.rules-btn'));
        document.querySelector('.choosed-item--user').classList.add('choosed-item--user--s4');
        document.querySelector('.choosed-item--com').classList.add('choosed-item--com--s4');
        Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e) => {
            e.classList.add('game-body__big-circle--s4');
        });
        Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e) => {
            e.classList.add('game-body__tiny-circle--s4');
        });
    }, 1500);

    playAgain.addEventListener('click', () => {
        initGame(playAgain, heading, hUser1, hCom1, gameOverCont);
    });
}

function initGame(btn, heading, hUser, hCom, gmovCon) {
    document.querySelector('.bg-triangle').classList.remove('bg-triangle--s2');
    document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
    document.querySelector('.choosed-item--user').classList.remove('choosed-item--user--s4');
    document.querySelector('.choosed-item--com').classList.remove('choosed-item--com--s4');
    Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e) => {
        e.classList.remove('game-body__big-circle--s4');
    });
    Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e) => {
        e.classList.remove('game-body__tiny-circle--s4');
    });

    gameItemsCont.forEach((e) => {
        if (e.className.includes('choosed-item--user')) {
            for (let i = 1; i <= 3; i++) {
                document.querySelector(`.circle--${i}`).remove();
            }
            e.classList.remove('choosed-item--user');
        } else if (e.className.includes('choosed-item--com')) {
            e.classList.remove('choosed-item--com');
        } else {
            e.classList.remove('unchoosed-item');
        }
    });

    btn.remove();
    heading.remove();
    gmovCon.remove();
    hUser.remove();
    hCom.remove();
    stateFlag = false;
    tempoArr = [];
}

function setScore(state) {
    let playerTarget = document.querySelector('.header__value--player');
    let houseTarget = document.querySelector('.header__value--house');

    if (state == 'win') {
        playerScore++;
        playerTarget.textContent = playerScore;
    } else if (state == 'lose') {
        houseScore++;
        houseTarget.textContent = houseScore;
    } else if (state == 'init') {
        playerScore = 0;
        houseScore = 0;
        playerTarget.textContent = playerScore;
        houseTarget.textContent = houseScore;
    }
}
