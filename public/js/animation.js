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
      if (text && text !== '€') {
        element.innerText = `${targetCount}${text}`;
      } else if (text && text === '€') {
        element.innerText = `${text}${targetCount}`;
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

// Reviews carousel smooth transition animations
export const animateReviewsCarousel = () => {
  const carousel = document.querySelector('#reviewsCarousel');
  const carouselInner = document.querySelector('.reviews-carousel-inner');
  const carouselItems = document.querySelectorAll('.reviews-carousel-item');

  if (!carousel || !carouselInner || !carouselItems.length) {
    console.error('Carousel elements not found');
    return;
  }

  const setCarouselHeight = (item) => {
    if (item) {
      const originalStyles = {
        display: item.style.display,
        visibility: item.style.visibility,
        position: item.style.position,
      };
      item.style.display = 'block';
      item.style.visibility = 'hidden';
      item.style.position = 'absolute';
      const height = item.offsetHeight;
      carouselInner.style.height = `${height}px`;
      item.style.display = originalStyles.display;
      item.style.visibility = originalStyles.visibility;
      item.style.position = originalStyles.position;
    }
  };

  const activeItem = carousel.querySelector('.reviews-carousel-item.active');
  if (activeItem) {
    setCarouselHeight(activeItem);
  }

  carousel.addEventListener('slide.bs.carousel', (event) => {
    const nextItem = carouselItems[event.to];
    if (nextItem) {
      nextItem.style.display = 'block';
      nextItem.style.position = 'absolute';
    }
  });

  carousel.addEventListener('slid.bs.carousel', (event) => {
    const nextItem = carouselItems[event.to];
    if (nextItem) {
      setTimeout(() => {
        setCarouselHeight(nextItem);
      }, 10);
    }
    carouselItems.forEach((item) => {
      if (!item.classList.contains('active')) {
        item.style.display = 'none';
        item.style.position = 'absolute';
      } else {
        item.style.position = 'relative';
      }
    });
  });

  const handleResize = debounce(() => {
    const currentActiveItem = carousel.querySelector('.reviews-carousel-item.active');
    if (currentActiveItem) {
      setCarouselHeight(currentActiveItem);
    }
  }, 100);

  window.addEventListener('resize', handleResize);
};
