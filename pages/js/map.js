const markList = document.querySelector('.mark-list');
const header = document.getElementById('top');
const aside = document.querySelector('.aside__nav');
let prevMark;
const animals = [
  {
    imgSrc: '../../assets/images/landing/eagle-2.png',
    title: 'Eagle',
    text: 'The broadcast is from an island near Los Angeles. Watch their real life.',
    linkSrc: './eagle.html',
  },
  {
    imgSrc: '../../assets/images/map/phalligator.png',
    title: 'Alligator',
    text: 'The broadcast is from Florida. See their real life.',
    linkSrc: './alligator.html',
  },
  {
    imgSrc: '../../assets/images/map/gorilla.png',
    title: 'Gorilla',
    text: 'The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together',
    linkSrc: './gorilla.html',
  },
  {
    imgSrc: '../../assets/images/map/phpanda.png',
    title: 'Panda',
    text: 'The broadcast comes from the mountainous regions of central China: Sichuan and Tibet. See their real life together.',
    linkSrc: './panda.html',
  },
];

function showAnimalCard(e) {
  const mark = getMark(e);
  if (!mark) return;
  if (!checkCoordinates(mark)) return;
  if (prevMark === mark) return;
  prevMark = mark;
  const pos = mark.dataset.pos;
  let card = getAnimalCard(pos);
  mark.appendChild(card);
  setCoordinates(card, mark);
  mark.classList.add('background-map__mark_active');
  mark.style.zIndex = '2';
}

function getAnimalCard(pos) {
  const animalCard = document.createElement('div');
  animalCard.classList.add('background-map__animal');
  animalCard.innerHTML = `
        <img src="${animals[pos].imgSrc}" alt="Animal Photo" class="background-map__animal-photo">
        <div class="background-map__animal-info">
          <h3 class="background-map__h3">${animals[pos].title}</h3>
          <h4 class="background-map__h4">${animals[pos].text}</h4>
          <a href="${animals[pos].linkSrc}" class="background-map__link">Watch now →</a>
        </div>`;
  return animalCard;
}

function hideAnimalCard(e) {
  const mark = getMark(e);
  if (!prevMark) return;
  if (prevMark === mark) return;
  prevMark.classList.remove('background-map__mark_active');
  prevMark.lastElementChild.remove();
  prevMark.style.zIndex = '';
  prevMark = undefined;
}

function getMark(e) {
  return e.target.closest('.background-map__mark');
}

function checkCoordinates(mark) {
  if (mark.getBoundingClientRect().y < (header.offsetHeight - 40)) return false;
  if (mark.getBoundingClientRect().x < (aside.getBoundingClientRect().x + aside.getBoundingClientRect().width - 72)) return false;
  return true;
}

function setCoordinates(card, mark) {
  let pageX = card.offsetWidth / 2 + 0.49 * mark.getBoundingClientRect().width;
  let pageY = 0 + 0.42 * mark.getBoundingClientRect().height;
  const cardTopSize = card.offsetHeight / 2 - pageY;
  const cardTop = mark.getBoundingClientRect().top - header.getBoundingClientRect().top - header.getBoundingClientRect().height;
  const cardBottom = markList.offsetHeight - mark.getBoundingClientRect().bottom + mark.getBoundingClientRect().height;
  const cardBottomSize = card.offsetHeight / 2 + pageY;
  if (card.offsetWidth < (mark.getBoundingClientRect().x - aside.getBoundingClientRect().x - aside.getBoundingClientRect().width)) {
    pageX = -pageX;
  } else pageX += 15;
  if (cardTopSize > cardTop) {
    pageY += cardTopSize - cardTop + 40;
  } else if (cardBottomSize > cardBottom) {
    pageY -= cardBottomSize - cardBottom;
  }
  pageX += mark.getBoundingClientRect().width / 2;
  card.style.left = `${pageX}px`;
  card.style.top = `${pageY}px`;
}

markList.addEventListener('click', hideAnimalCard);
markList.addEventListener('click', showAnimalCard);