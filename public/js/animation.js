import * as config from './config';

export const debounce = (func, wait = 1000, immediate = true) => {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const inView = (element) => {
  if (element) {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    // get window height
    const windowHeight = window.innerHeight;
    // Check if element is in view
    return elementTop < windowHeight && elementBottom >= 0;
  }
  return false;
};

export const animateMoveInRight = (element) => {
  if (window.innerWidth >= 992) {
    if (inView(element)) {
      element.classList.add('moveInRight');
    }
  }
};

export const animateMoveInLeft = (element) => {
  if (window.innerWidth >= 992) {
    if (inView(element)) {
      element.classList.add('moveInLeft');
    }
  }
};

export const animateFadeIn = (element) => {
  if (window.innerWidth >= 992) {
    if (inView(element)) {
      element.classList.add('fadeIn');
    }
  }
};

export const animatePulse = (elements) => {
  elements.forEach((element) => {
    if (inView(element)) {
      element.classList.add('pulse');
    }
  });
};

// Animate pulse for buttons
const animatedElementsArray = [config.Elements.ctaBtnWhite[0], config.Elements.pricingCtaBtn];

export const animateOnLoad = () => {
  //animateMoveInRight(config.Elements.heroHeadline);
  //animateMoveInLeft(config.Elements.heroText);
  //animateFadeIn(config.Elements.heroIcons);
  setTimeout(() => {
    animatePulse(animatedElementsArray);
  }, 1000);
};

export const toggleContactUsScroll = (elementOne, elementTwo, elementThree, elementFour) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          elementOne.classList.remove('slideUp');
          elementOne.classList.add('slideDown');
          elementOne.style.bottom = '-150px';
          elementTwo.classList.remove('slideUp');
          elementTwo.classList.add('slideDown');
          elementTwo.style.bottom = '-150px';
          elementFour.style.display = 'block';
          elementFour.classList.remove('slideDown');
          elementFour.classList.add('slideUp');
          elementFour.style.bottom = '0';
        } else {
          elementOne.classList.remove('slideDown');
          elementOne.classList.add('slideUp');
          elementOne.style.bottom = '0';
          elementTwo.classList.remove('slideDown');
          elementTwo.classList.add('slideUp');
          elementTwo.style.bottom = '0';
          elementFour.classList.remove('slideUp');
          elementFour.classList.add('slideDown');
          elementFour.style.bottom = '-150px';
        }
      });
    },
    { threshold: 0.1 }, // Adjust threshold as needed
  );

  observer.observe(elementThree);
};

export const toggleContactUsExpand = (elementOne, elementTwo) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          elementOne.classList.remove('slideUp');
          elementOne.classList.add('slideDown');
          elementOne.style.bottom = '-150px';
        } else {
          elementOne.classList.remove('slideDown');
          elementOne.classList.add('slideUp');
          elementOne.style.bottom = '0';
        }
      });
    },
    { threshold: 0.1 }, // Adjust threshold as needed
  );

  observer.observe(elementTwo);
};

export const toggleContactUsClick = (elementOne, elementTwo) => {
  elementOne.classList.remove('slideUp');
  elementOne.classList.add('slideDown');
  elementOne.style.bottom = '-150px';
  elementTwo.style.display = 'block';
  elementTwo.classList.remove('slideDown');
  elementTwo.classList.add('slideUp');
  elementTwo.style.bottom = '0';
};

export const animateCounter = (element, endNum, text) => {
  let currentCount = 0;
  const targetCount = endNum;
  const duration = 2000; // Animation duration in milliseconds
  const increment = targetCount / (duration / 50); // Increment value per interval

  const updateCounter = () => {
    currentCount += increment;
    if (currentCount < targetCount) {
      element.innerText = Math.floor(currentCount);
      requestAnimationFrame(updateCounter);
    } else {
      if (text) {
        element.innerText = `${targetCount}${text}`;
      } else {
        element.innerText = targetCount;
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(element); // Stop observing after animation starts
        }
      });
    },
    { threshold: 0.5 },
  ); // Adjust threshold as needed

  observer.observe(element);
};

export const animateCardsFadeIn = (element) => {
  const observer = new IntersectionObserver(
    (element, observer) => {
      let delay = 1;

      element.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;

          if (delay === 2 && window.innerWidth <= 576) {
            delay = 1;
          } else if (delay === 3 && window.innerWidth <= 992) {
            delay = 1;
          } else if (delay === 5) {
            delay = 1;
          }

          card.style.animationDelay = `${delay * 0.2}s`; // Set animation delay dynamically
          delay = ++delay;
          card.classList.add('visible');

          observer.unobserve(card); // Stop observing the current target
        }
      });
    },
    { threshold: 0.1 },
  );

  element.forEach((card) => {
    observer.observe(card);
  });
};
