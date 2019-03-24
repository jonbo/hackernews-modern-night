const SCROLLED_UP = -1;
const SCROLLED_DOWN = 1;
const SCROLL_THRESHOLD = 50;

let relativePageY = -1;
let direction = 0;

document.addEventListener("scroll", function onScroll(e) {
  const pageY = e.pageY;
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
  if (pageY > relativePageY + SCROLL_THRESHOLD) {
    direction = SCROLLED_DOWN;
    relativePageY = pageY;
    if (previousDirection !== direction) onScrollDirectionChange(direction);
  } else if (pageY < relativePageY - SCROLL_THRESHOLD * 3) {
    direction = SCROLLED_UP;
    relativePageY = pageY;
    if (previousDirection !== direction) onScrollDirectionChange(direction);
  }
});

function onScrollDirectionChange(direction) {
  if (direction === SCROLLED_DOWN) {
    document.body.classList.add("scrolled_down");
  } else {
    document.body.classList.remove("scrolled_down");
  }
}
