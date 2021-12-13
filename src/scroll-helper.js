// Hide post content body when scrolling down, and revealing on up
const SCROLLED_UP = -1;
const SCROLLED_DOWN = 1;
const SCROLL_UP_THRESHOLD = 400;
const SCROLL_DOWN_THRESHOLD = 200;

let relativePageY = -1;
let direction = 0;

document.addEventListener("scroll", function onScroll(e) {
  const pageY = window.pageYOffset;
  const previousDirection = direction;

  const isTopOfPage = pageY === 0;
  const isNotInitialized = relativePageY === -1;

  // Edge cases
  if (isTopOfPage) {
    direction = SCROLLED_UP;
    relativePageY = pageY;
    if (previousDirection !== direction) onScrollDirectionChange(direction);
    return;
  }
  if (isNotInitialized) {
    relativePageY = pageY;
    return;
  }

  // Set direction based on passing a threshold, otherwise do nothing
  if (pageY > relativePageY + SCROLL_DOWN_THRESHOLD) {
    direction = SCROLLED_DOWN;
    relativePageY = pageY;
    onScrollDirectionChange(direction);
  } else if (pageY < relativePageY - SCROLL_UP_THRESHOLD) {
    direction = SCROLLED_UP;
    relativePageY = pageY;
    onScrollDirectionChange(direction);
  }
});

let ignoreScroll = false;
function onScrollDirectionChange(direction) {
  if (ignoreScroll) return;

  let post = document.querySelector(".fatitem");

  if (direction === SCROLLED_DOWN) {
    document.body.classList.add("scrolled_down");
    post.scrollTo(0, 0);
    let { bottom } = document.querySelector(".title").getBoundingClientRect();
    post.style.maxHeight = bottom + 5 + "px";
  } else {
    document.body.classList.remove("scrolled_down");
    post.style.maxHeight = "50vh";
  }

  // Ignore scroll events until after repaints since that causes some
  ignoreScroll = true;
  setTimeout(() => (ignoreScroll = false), 1000);
}
