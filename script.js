const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const actions = document.getElementById('actions');
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');

const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyMotionPreference() {
  noBtn.classList.toggle('no-transition', reduceMotionQuery.matches);
}

function moveNoButton() {
  const area = actions.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, area.width - button.width - 8);
  const maxY = Math.max(0, area.height - button.height - 8);

  const nextX = Math.random() * maxX;
  const nextY = Math.random() * maxY;

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
  noBtn.style.transform = 'none';
}

function toSecondScreen() {
  screen1.classList.remove('is-active');
  screen2.classList.add('is-active');
}

applyMotionPreference();
if (typeof reduceMotionQuery.addEventListener === 'function') {
  reduceMotionQuery.addEventListener('change', applyMotionPreference);
} else {
  reduceMotionQuery.addListener(applyMotionPreference);
}

yesBtn.addEventListener('click', toSecondScreen);
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  moveNoButton();
});
noBtn.addEventListener('touchstart', moveNoButton, { passive: true });
