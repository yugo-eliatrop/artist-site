export const showWindow = (elem, ms = 150, display = "block") => {
  let opacity = 0;
  elem.style.opacity = opacity;
  elem.style.display = display;

  let show = setInterval(() => {
    opacity += 0.1;
    opacity >= 1 && clearInterval(show);
    elem.style.opacity = opacity;
  }, ms / 10);
};

export const hideWindow = (elem, ms = 150) => {
  let opacity = 1;

  let hide = setInterval(() => {
    opacity -= 0.1;
    if (opacity <= 0) {
      clearInterval(hide);
      elem.style.display = "none";
    }
    elem.style.opacity = opacity;
  }, ms / 10);
};

export const scrollToElem = (elem, time) => {
	let shift = elem.getBoundingClientRect().y;
  let indexes = [
    0.003205128205128205, 0.003205128205128205, 0.00641025641025641,
    0.009615384615384616, 0.016025641025641024, 0.02564102564102564,
    0.041666666666666664, 0.0673076923076923, 0.10897435897435898,
    0.10897435897435898, 0.10897435897435898, 0.10897435897435898,
    0.10897435897435898, 0.10897435897435898, 0.0673076923076923,
    0.041666666666666664, 0.02564102564102564, 0.016025641025641024,
    0.009615384615384616, 0.00641025641025641, 0.003205128205128205,
    0.003205128205128205
  ];
  let index = 0;
	let scrolling = setInterval(() => {
		window.scrollTo(0, window.scrollY + (shift * indexes[index]));
    index++;
		index === indexes.length && clearInterval(scrolling);
  }, time / indexes.length);
};
