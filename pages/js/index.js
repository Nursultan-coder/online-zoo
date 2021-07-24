const fdbckBtn = document.getElementById('feedback-button');
const cover = document.getElementById('cover');
const popup = document.getElementById('popup');
const body = document.getElementById('body');
const map = document.getElementById('map');
const card = document.getElementById('card');
const button = document.getElementById('button');
const text = document.getElementById('text');
const email = document.getElementById('email');
const textarea = document.getElementById('textarea');
const left = document.getElementById('slider__button_left');
const right = document.getElementById('slider__button_right');
const slider = document.getElementById('slider');
const content = document.getElementById('content');
const item = document.querySelector('.item');
const feedbackSlider = document.getElementById('testimonials-slider__items');
const next = document.getElementById('testimonials-slider__button_right');
const prev = document.getElementById('testimonials-slider__button_left');
let dir;
let itemCount;
let isEnabled = true;
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

function validate() {
  if (
    textarea.validity.valid &&
    email.validity.valid &&
    text.validity.valid
  ) {
    button.classList.remove('popup__button_invalid');
  }
}

function togglePopup(e) {
  if (e.target.matches('#button')) {
    if (e.target.matches('.popup__button_invalid')) return;
  }
  cover.classList.toggle('hidden');
  popup.classList.toggle('hidden');
  body.classList.toggle('body_overflow');
  text.value = '';
  email.value = '';
  textarea.value = '';
  button.classList.add('popup__button_invalid');
}

function toggleAnimalCard(e) {
  const mark = e.target.closest('li');
  if (!mark) return;
  const pos = mark.dataset.pos;
  const img = card.firstElementChild.lastElementChild;
  const content = card.lastElementChild.children;

  img.src = animals[pos].imgSrc;
  content[0].innerText = animals[pos].title;
  content[1].innerText = animals[pos].text;
  content[2].href = animals[pos].linkSrc;

  for (let i = 0; i < map.children.length; i++) {
    map.children[i].classList.remove('zoogeography__mark_active');
  }
  mark.classList.add('zoogeography__mark_active');
}

function moveLeft() {
  moveContent('to-right');
}

function moveRight() {
  moveContent('to-left');
}

function moveContent(direction) {
  if (!isEnabled) return;
  isEnabled = false;
  content.classList.add(direction);
  dir = direction;
}

function replaceContent(direction) {
  if (direction === 'to-left') {
    for (let i = 0; i < itemCount; i++) {
      content.append(content.firstElementChild);
    }
  }
  else if (direction === 'to-right') {
    for (let i = 0; i < itemCount; i++) {
      content.prepend(content.lastElementChild);
    }
  }
}

function addContent() {
  content.append(getContent());
  content.prepend(getContent());
}

function getContent() {
  const fragment = new DocumentFragment();
  [...content.children].forEach(i => {
    fragment.append(i.cloneNode(true));
  });
  return fragment;
}

function alignContent() {
  const width = slider.offsetWidth;
  const gap = parseFloat(window.getComputedStyle(content).getPropertyValue('column-gap'));
  const fullWidth = width + gap;
  document.documentElement.style.setProperty('--widthLeft', `${-fullWidth}px`);
  document.documentElement.style.setProperty('--widthRight', `${fullWidth}px`);
  const itemWidth = item.offsetWidth;
  itemCount = Math.floor(slider.offsetWidth / itemWidth) * Math.floor(slider.offsetHeight / itemWidth);
}

function scrollToLeft() {
  delayAutoSliding();
  const [width, gap]= getDimensions();
  feedbackSlider.scrollBy(-(width + gap), 0);
  if (feedbackSlider.scrollLeft === 0) {
    feedbackSlider.scrollBy(feedbackSlider.scrollWidth, 0);
  }
}

function scrollToRight(e) {
  if (e) delayAutoSliding();
  const [width, gap]= getDimensions();
  feedbackSlider.scrollBy(width + gap, 0);
  if (feedbackSlider.scrollWidth === feedbackSlider.scrollLeft + width) {
    feedbackSlider.scrollTo(0, 0);
  }
}

function getDimensions() {
  return [feedbackSlider.offsetWidth, parseFloat(window.getComputedStyle(feedbackSlider).getPropertyValue('column-gap'))];
}

let autoSlideInterval = setInterval(scrollToRight, 10000);
let autoSlideTimeout = null;

function delayAutoSliding() {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;

  autoSlideTimeout = setTimeout(() => {
    autoSlideInterval = setInterval(scrollToRight, 10000);
  }, 10000);
}

feedbackSlider.addEventListener('click', delayAutoSliding);
next.addEventListener("click", scrollToRight);
prev.addEventListener("click", scrollToLeft);
fdbckBtn.addEventListener('click', togglePopup);
cover.addEventListener('click', togglePopup);
map.addEventListener('click', toggleAnimalCard);
button.addEventListener('click', togglePopup);
text.addEventListener('input', validate);
email.addEventListener('input', validate);
textarea.addEventListener('input', validate);
left.addEventListener('click', moveLeft);
right.addEventListener('click', moveRight);
window.addEventListener('resize', alignContent);
document.addEventListener('DOMContentLoaded', addContent);
document.addEventListener('DOMContentLoaded', alignContent);
content.addEventListener('animationend', function() {
  replaceContent(dir);
  this.classList.remove(dir);
  isEnabled = true;
});