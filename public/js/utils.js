import * as config from './config';
import { switchLang } from './language';
import { getFavoriteAssets } from './favoriteAssets';
import { generatePDF } from './pdf';

// ***** Currency *****
export const switchSearchPriceCurrencyHtmlOnLoad = (priceInput, isEuro = true) => {
  if (isEuro) {
    if (priceInput)
      priceInput.forEach((el) => {
        if (!el.value) el.placeholder = el.placeholder;
      });
  } else {
    if (priceInput)
      priceInput.forEach((el) => {
        if (!el.value) el.placeholder = el.placeholder;
      });
  }
};

export const switchCurrencyIconsSrc = (isEuro = true) => {
  const currencyConfig = {
    euro: {
      activeCurrencyIcon: { src: config.euroIconSrc, alt: config.euroIconAlt },
      mobileActiveCurrencyIcon: { src: config.mobileEuroIconSrc, alt: config.euroIconAlt },
      notActiveCurrencyIcon: { src: config.nisIconSrc, alt: config.nisIconAlt },
      mobileNotActiveCurrencyIcon: { src: config.mobileNisIconSrc, alt: config.nisIconAlt },
    },
    nis: {
      activeCurrencyIcon: { src: config.nisIconSrc, alt: config.nisIconAlt },
      mobileActiveCurrencyIcon: { src: config.mobileNisIconSrc, alt: config.nisIconAlt },
      notActiveCurrencyIcon: { src: config.euroIconSrc, alt: config.euroIconAlt },
      mobileNotActiveCurrencyIcon: { src: config.mobileEuroIconSrc, alt: config.euroIconAlt },
    },
  };

  const selectedCurrency = isEuro ? 'euro' : 'nis';
  const icons = currencyConfig[selectedCurrency];

  for (const elementKey in icons) {
    const { src, alt } = icons[elementKey];
    if (config.Elements[elementKey]) {
      config.Elements[elementKey].src = src;
      config.Elements[elementKey].alt = alt;
    }
  }
};

const switchSearchPriceCurrencyHtml = (ddBtn, priceInput, isEuro = true) => {
  if (isEuro) {
    if (ddBtn) ddBtn.innerText = ddBtn.innerText.replace(/₪/gi, '€');
    if (priceInput)
      priceInput.forEach((el) => {
        el.placeholder = el.placeholder.replace(/₪/gi, '€');
      });
  } else {
    if (ddBtn) ddBtn.innerText = ddBtn.innerText.replace(/€/gi, '₪');
    if (priceInput)
      priceInput.forEach((el) => {
        el.placeholder = el.placeholder.replace(/€/gi, '₪');
      });
  }
};

export const switchAssetPriceCurrency = () => {
  const currencySymbol = JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪';
  if (config.Elements.assetPrice)
    config.Elements.assetPrice.forEach((el) => {
      if (currencySymbol === '₪') {
        el.innerText = el.dataset.nisprice;
      } else {
        el.innerText = el.dataset.europrice;
      }
    });
};

export const switchCurrency = (currencyIconSrc) => {
  if (currencyIconSrc.includes(config.euroIconSrc) || currencyIconSrc.includes(config.mobileEuroIconSrc)) {
    localStorage.setItem(config.CURRENCY_KEY, JSON.stringify(config.DEFAULT_CURRENCY));
    switchCurrencyIconsSrc();
    switchAssetPriceCurrency();
    switchSearchPriceCurrencyHtml(config.Elements.searchDdBtnPrice, config.Elements.priceInput);
  } else {
    localStorage.setItem(config.CURRENCY_KEY, JSON.stringify(config.NIS_CURRENCY));
    switchCurrencyIconsSrc(false);
    switchAssetPriceCurrency();
    switchSearchPriceCurrencyHtml(config.Elements.searchDdBtnPrice, config.Elements.priceInput, false);
  }
};

export const addCurrencySwitchListener = (element, isMobile = false) => {
  if (!element) return;

  element.addEventListener('click', () => {
    switchCurrency(element.src);
    if (isMobile && config.Elements.mobileCurrencyDdBtn) {
      config.Elements.mobileCurrencyDdBtn.click();
    }
  });
};

// ***** Language *****
export const detectLanguageFromURL = () => {
  const path = window.location.pathname;
  if (path.includes(`/${config.EN_LANGUAGE}`)) {
    localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.EN_LANGUAGE));
  } else if (path.includes(`/${config.RU_LANGUAGE}`)) {
    localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.RU_LANGUAGE));
  } else {
    localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.DEFAULT_LANGUAGE));
  }
};

export const switchLanguageIconsSrc = (lang) => {
  const languageConfig = {
    [config.DEFAULT_LANGUAGE]: {
      activeLangIcon: { src: config.heIconSrc, alt: config.heIconAlt },
      mobileActiveLangIcon: { src: config.heIconSrc, alt: config.heIconAlt },
      firstNotActiveLangIcon: { src: config.enIconSrc, alt: config.enIconAlt },
      firstMobileNotActiveLangIcon: { src: config.enIconSrc, alt: config.enIconAlt },
      secondNotActiveLangIcon: { src: config.ruIconSrc, alt: config.ruIconAlt },
      secondMobileNotActiveLangIcon: { src: config.ruIconSrc, alt: config.ruIconAlt },
    },
    [config.EN_LANGUAGE]: {
      activeLangIcon: { src: config.enIconSrc, alt: config.enIconAlt },
      mobileActiveLangIcon: { src: config.enIconSrc, alt: config.enIconAlt },
      firstNotActiveLangIcon: { src: config.heIconSrc, alt: config.heIconAlt },
      firstMobileNotActiveLangIcon: { src: config.heIconSrc, alt: config.heIconAlt },
      secondNotActiveLangIcon: { src: config.ruIconSrc, alt: config.ruIconAlt },
      secondMobileNotActiveLangIcon: { src: config.ruIconSrc, alt: config.ruIconAlt },
    },
    [config.RU_LANGUAGE]: {
      activeLangIcon: { src: config.ruIconSrc, alt: config.ruIconAlt },
      mobileActiveLangIcon: { src: config.ruIconSrc, alt: config.ruIconAlt },
      firstNotActiveLangIcon: { src: config.heIconSrc, alt: config.heIconAlt },
      firstMobileNotActiveLangIcon: { src: config.heIconSrc, alt: config.heIconAlt },
      secondNotActiveLangIcon: { src: config.enIconSrc, alt: config.enIconAlt },
      secondMobileNotActiveLangIcon: { src: config.enIconSrc, alt: config.enIconAlt },
    },
  };

  const icons = languageConfig[lang];

  if (icons) {
    for (const elementKey in icons) {
      const { src, alt } = icons[elementKey];
      if (config.Elements[elementKey]) {
        config.Elements[elementKey].src = src;
        config.Elements[elementKey].alt = alt;
      }
    }
  }
};

export const modifyUrl = (inputStr, part) => {
  // Function to add '/en' after the part
  function addEn(str, part) {
    let partIndex = str.indexOf(part);
    if (partIndex === -1) return str;

    let toAdd = str === part ? 'en' : 'en/';
    return str.slice(0, partIndex + part.length) + toAdd + str.slice(partIndex + part.length);
  }

  // Function to remove '/en' after the part
  function removeEn(str, part) {
    let partIndex = str.indexOf(part);
    if (partIndex === -1) return str;
    let enIndex = str.indexOf('en', partIndex + part.length);
    if (enIndex === partIndex + part.length) {
      return str.slice(0, enIndex) + str.slice(enIndex + 3);
    }
    return str;
  }

  // Function to add '/ru' after the part
  function addRu(str, part) {
    let partIndex = str.indexOf(part);
    if (partIndex === -1) return str;

    let toAdd = str === part ? 'ru' : 'ru/';
    return str.slice(0, partIndex + part.length) + toAdd + str.slice(partIndex + part.length);
  }

  // Function to remove '/ru' after the part
  function removeRu(str, part) {
    let partIndex = str.indexOf(part);
    if (partIndex === -1) return str;
    let ruIndex = str.indexOf('ru', partIndex + part.length);
    if (ruIndex === partIndex + part.length) {
      return str.slice(0, ruIndex) + str.slice(ruIndex + 3);
    }
    return str;
  }

  const lang = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY));

  // Remove both 'en' and 'ru' if default (Hebrew)
  if (lang === config.DEFAULT_LANGUAGE) {
    inputStr = removeEn(inputStr, part);
    inputStr = removeRu(inputStr, part);
  }

  if (lang === config.EN_LANGUAGE) {
    inputStr = removeRu(inputStr, part);
    inputStr = addEn(inputStr, part);
  }

  if (lang === config.RU_LANGUAGE) {
    inputStr = removeEn(inputStr, part);
    inputStr = addRu(inputStr, part);
  }

  return inputStr;
};

export const switchLanguage = (langIconSrc, href) => {
  const languages = [
    { icon: config.heIconSrc, lang: config.DEFAULT_LANGUAGE },
    { icon: config.enIconSrc, lang: config.EN_LANGUAGE },
    { icon: config.ruIconSrc, lang: config.RU_LANGUAGE },
  ];

  const selected = languages.find((lang) => langIconSrc.includes(lang.icon)) || languages[0]; // default to Hebrew

  localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(selected.lang));
  switchLanguageIconsSrc(selected.lang);

  const updatedHref = modifyUrl(href, config.baseProdUrl);
  switchLang(selected.lang, updatedHref);
};

export const addLangSwitchListener = (element, isMobile = false) => {
  if (!element) return;

  element.addEventListener('click', () => {
    const href = window.location.href;
    switchLanguage(element.src, href);
    if (isMobile && config.Elements.mobileLangDdBtn) {
      config.Elements.mobileLangDdBtn.click();
    }
  });
};

export const reverseString = (s) => {
  return s.split('').reverse().join('');
};

export const getFormData = (cityFilter, roomsFilter, oceanViewFilter, projectFilter, currency, priceMinInput, priceMaxInput, idInput, nameInput) => {
  let searchFilterObj = {
    city: [],
    rooms: [],
    oceanView: [],
    project: [],
    currency: '',
    priceMin: '',
    priceMax: '',
    id: '',
    name: '',
  };

  cityFilter.forEach((el) => {
    if (el.classList.contains('active')) searchFilterObj.city.push(el.innerText);
  });

  roomsFilter.forEach((el) => {
    if (el.classList.contains('active')) searchFilterObj.rooms.push(el.innerText);
  });

  oceanViewFilter.forEach((el) => {
    if (el.classList.contains('active')) searchFilterObj.oceanView.push(el.innerText);
  });

  projectFilter.forEach((el) => {
    if (el.classList.contains('active')) searchFilterObj.project.push(el.innerText);
  });

  if (searchFilterObj.project.length > 0) {
    searchFilterObj = emptyFilterObjBesideProjects(searchFilterObj);
    return searchFilterObj;
  }

  if (currency) searchFilterObj.currency = currency;

  if (priceMinInput.value) searchFilterObj.priceMin = parseInt(priceMinInput.value.replace(/,|€|₪/gi, ''));

  if (priceMaxInput.value) searchFilterObj.priceMax = parseInt(priceMaxInput.value.replace(/,|€|₪/gi, ''));

  if (idInput.value) {
    searchFilterObj = emptyFilterObj(searchFilterObj);
    searchFilterObj.id = idInput.value;
    return searchFilterObj;
  }

  if (nameInput.value) {
    searchFilterObj = emptyFilterObj(searchFilterObj);
    searchFilterObj.name = nameInput.value;
    return searchFilterObj;
  }

  return searchFilterObj;
};

const emptyFilterObj = (filterObj) => {
  filterObj = {
    city: [],
    rooms: [],
    project: [],
    oceanView: [],
    priceMin: '',
    priceMax: '',
    id: '',
    name: '',
  };
  return filterObj;
};

const emptyFilterObjBesideProjects = (filterObj) => {
  let emptyFilterObj = {
    city: [],
    rooms: [],
    project: [],
    oceanView: [],
    priceMin: '',
    priceMax: '',
    id: '',
    name: '',
  };
  emptyFilterObj.project = filterObj.project;
  return emptyFilterObj;
};

const ddBtnTranslations = {
  city: {
    he: 'עיר',
    en: 'City',
    ru: 'Город',
  },
  oceanView: {
    he: 'קרבה לים',
    en: 'To Sea',
    ru: 'Расстояние до моря',
  },
  rooms: {
    he: 'חדרים',
    en: 'Rooms',
    ru: 'Кол-во комнат',
  },
  project: {
    he: 'פרויקט',
    en: 'Project',
    ru: 'Проект',
  },
  price: {
    he: 'מחיר',
    en: 'Price',
    ru: 'Стоимость',
  },
};

export const btnAddActive = (searchFilterObj, filterBtn, type, notModal = true, ddBtn) => {
  filterBtn.forEach((el) => {
    if (type === 'city') {
      for (const city of searchFilterObj.city) {
        if (el.innerText === city) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, type, true);
        }
      }
    }
    if (type === 'oceanView') {
      for (const oceanView of searchFilterObj.oceanView) {
        if (el.innerText === oceanView) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, type, true);
        }
      }
    }
    if (type === 'rooms') {
      for (const rooms of searchFilterObj.rooms) {
        if (el.innerText === rooms) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, type, true);
        }
      }
    }
    if (type === 'project') {
      for (const project of searchFilterObj.project) {
        if (el.innerText === project) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, type, true);
        }
      }
    }
  });
};

const getLanguageText = (language, type) => {
  if (ddBtnTranslations[type] && ddBtnTranslations[type][language]) {
    return ddBtnTranslations[type][language];
  }
  // Fallbacks if language/type not found
  return ddBtnTranslations.price[language] || ddBtnTranslations.price.en;
};

const getCurrencySymbol = () => {
  return JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪';
};

export const ddBtnTextSetter = (ddBtn, filterBtn, type, onLoad = false) => {
  const updateButtonText = () => {
    const language = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY));
    const activeCount = Array.from(filterBtn).filter((btn) => btn.classList.contains('active')).length;

    ddBtn.innerText = getLanguageText(language, type);
    if (activeCount > 0) {
      ddBtn.appendChild(document.createTextNode(` (${activeCount})`));
    }
  };

  if (onLoad) {
    updateButtonText();
  } else {
    filterBtn.forEach((btn) => {
      btn.addEventListener('click', updateButtonText);
    });
  }
};

export const priceInputSetter = (inputMin, inputMax, onLoad = false, notModal = true, ddBtn) => {
  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const cleanValue = (value) => {
    return value.replace(/,|€|₪/g, '');
  };

  const updatePriceDisplay = () => {
    const currency = getCurrencySymbol(); // e.g., '€'
    const language = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY));

    let minVal = cleanValue(inputMin.value);
    let maxVal = cleanValue(inputMax.value);

    // Swap values if min > max
    if (minVal && maxVal && parseInt(minVal, 10) > parseInt(maxVal, 10)) {
      [inputMin.value, inputMax.value] = [maxVal, minVal];
      [minVal, maxVal] = [inputMin.value, inputMax.value];
    }

    // Format values
    minVal = minVal ? formatNumber(minVal) : inputMin.placeholder;
    maxVal = maxVal ? formatNumber(maxVal) : inputMax.placeholder;

    // Add currency symbol to input fields
    inputMin.value = minVal ? `${currency}${minVal}` : '';
    inputMax.value = maxVal ? `${currency}${maxVal}` : '';

    if (notModal) {
      // Ensure currency symbol is included in display values
      const displayMin = minVal ? `${currency}${minVal}` : `${currency}0`;
      const displayMax = maxVal ? `${currency}${maxVal}` : `${currency}10,000,000`;
      const priceText = ` (${displayMin} - ${displayMax})`;

      ddBtn.innerText = getLanguageText(language) + priceText;
    }
  };

  if (onLoad) {
    updatePriceDisplay();
  } else {
    document.querySelector('.content-col').addEventListener('click', updatePriceDisplay);
  }
};

export const clearSearchChoices = (searchFilterObj, ddBtn, filterBtn, input) => {
  const emptySearchFilterObj = {
    city: [],
    rooms: [],
    project: [],
    oceanView: [],
    priceMin: '',
    priceMax: '',
    id: '',
    name: '',
  };
  searchFilterObj = emptySearchFilterObj;
  localStorage.setItem(config.FILTER_KEY, JSON.stringify(searchFilterObj));
  ddBtn.forEach((el) => {
    if (!el.innerText.includes('מחיר') || !el.innerText.includes('price') || !el.innerText.includes('Стоимость')) {
      // el.innerText = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE ? el.dataset.he : el.dataset.en;
      if (JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE) {
        el.innerText = el.dataset.he;
      } else if (JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.EN_LANGUAGE) {
        el.innerText = el.dataset.en;
      } else if (JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.RU_LANGUAGE) {
        el.innerText = el.dataset.ru;
      }
    } else {
      el.innerText =
        el.dataset.he +
        ` (${JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪'}0 - ${JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪'}1,000,000)`;
    }
  });
  filterBtn.forEach((el) => {
    if (el.classList.contains('active')) el.classList.remove('active');
  });
  input.forEach((el) => {
    if (el.value) el.value = '';
  });
};

export const clearDuplicates = (searchFilterObj) => {
  const filterSet = new Set();
  searchFilterObj.oceanView.forEach((el) => filterSet.add(el));
  searchFilterObj.oceanView = [];
  for (const el of filterSet) {
    searchFilterObj.oceanView.push(el);
  }
  filterSet.clear();
  return searchFilterObj.oceanView;
};

// Lazy load a video using Intersection Observer
export const lazyLoadVideo = (containerSelector, videoSelector, options = { rootMargin: '100px', threshold: 0 }) => {
  const videoContainer = containerSelector;
  const video = videoSelector;
  if (!video || !videoContainer) return;

  const videoSrc = video.dataset.src;
  if (!videoSrc) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the video source
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        video.appendChild(source);

        // Add loaded class for CSS transition
        video.classList.add('loaded');

        // Start playback
        video.play().catch((err) => console.error('Video playback failed:', err));

        // Stop observing once loaded
        observer.unobserve(videoContainer);
      }
    });
  }, options);

  observer.observe(videoContainer);
};

// ***** Asset PDF button *****
const extractUniqueText = (elements) => {
  return Array.from(elements)
    .map((el) => el.innerText.trim())
    .filter((value, index, self) => self.indexOf(value) === index);
};

const getElementText = (element) => (element ? element.innerHTML.trim() : '');

const collectPdfData = () => {
  const pdfData = {
    id: getElementText(config.Elements.assetId),
    name: getElementText(config.Elements.assetName),
    price: extractUniqueText(config.Elements.assetPrice)?.[0] || '',
    project: getElementText(config.Elements.assetProject),
    city: getElementText(config.Elements.assetCity),
    type: getElementText(config.Elements.assetType),
    sm: getElementText(config.Elements.assetSm),
    oceanView: getElementText(config.Elements.assetOceanView),
    rooms: getElementText(config.Elements.assetRooms),
    bedrooms: getElementText(config.Elements.assetBedrooms),
    bathrooms: getElementText(config.Elements.assetBathrooms),
    terraces: getElementText(config.Elements.assetTerraces),
    floor: getElementText(config.Elements.assetFloor),
    parking: getElementText(config.Elements.assetParking),
    windDirection: getElementText(config.Elements.assetWindDirections),
    readiness: getElementText(config.Elements.assetReadiness),
    maintenanceFee: getElementText(config.Elements.assetMaintenanceFee),
    furnished: getElementText(config.Elements.assetFurnished),
    yearBuilt: getElementText(config.Elements.assetYearBuilt),
    description: extractUniqueText(config.Elements.assetDescription) || [],
    amenities: Array.from(config.Elements.assetAmenities || []).map((el) => el.innerText.trim()) || [],
    mainImage: config.Elements.assetMainImg?.src || '',
    images: Array.from(config.Elements.assetThumbnailImgs || []).map((img) => img.src) || [],
  };

  if (config.Elements.mapBox && config.Elements.mapBox.dataset.long && config.Elements.mapBox.dataset.lat) {
    pdfData.location = {
      long: config.Elements.mapBox.dataset.long,
      lat: config.Elements.mapBox.dataset.lat,
      title: config.Elements.mapBox.dataset.title || '',
    };
  }

  return pdfData;
};

export const setupPdfButtonListeners = () => {
  if (!config.Elements.assetPdfBtn) return;

  config.Elements.assetPdfBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pdfData = collectPdfData();
      generatePDF(pdfData);
    });
  });
};

// ***** Button Listeners *****
const ROUTE_MAP = {
  [config.DEFAULT_LANGUAGE]: '',
  [config.EN_LANGUAGE]: '/en',
  [config.RU_LANGUAGE]: '/ru',
};

const BUTTON_ROUTES = {
  toContactUsBtn: '/contact-us',
  toAboutBtn: '/about',
  toBlogBtn: '/blog',
  investGuideBtn: '/invest',
  errorBtn: '', // Empty base path for errorBtn to allow language-specific roots
};

const getLanguagePrefix = () => {
  const lang = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) || config.DEFAULT_LANGUAGE;
  return ROUTE_MAP[lang] || '';
};

const navigateToPage = (basePath) => {
  const prefix = getLanguagePrefix();

  // For errorBtn, navigate to language-specific root
  if (basePath === '') {
    window.location.pathname = prefix || '/';
    return;
  }

  window.location.pathname = `${prefix}${basePath}`;
};

const setupButtonListener = (button, basePath) => {
  if (!button) return;

  const elements = button.length !== undefined ? button : [button];
  elements.forEach((el) => {
    el.addEventListener('click', () => navigateToPage(basePath));
  });
};

export const initializeNavigationButtons = () => {
  Object.entries(BUTTON_ROUTES).forEach(([btnKey, basePath]) => {
    setupButtonListener(config.Elements[btnKey], basePath);
  });
};

export const getPageBySlug = (elementArray, page) => {
  elementArray.forEach((el) => {
    el.addEventListener('click', function (e) {
      const baseUrl =
        JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE
          ? `/${page}/${el.dataset.slug}`
          : `${config.baseProdUrl}${JSON.parse(localStorage.getItem(config.LANGUAGE_KEY))}/${page}/${el.dataset.slug}`;
      window.location.assign(baseUrl);
    });
  });
};

export const addSlugNavigation = (elements, pageType) => {
  if (!elements) return;
  getPageBySlug(elements, pageType);
};

export const addNavigator = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'מצאתי עמוד ממש מעניין באתר דירה בולגרית!',
        text: 'מצאתי עמוד ממש מעניין באתר דירה בולגרית!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    alert('תקלה! לצערנו שיתוף העמוד לא נתמך על ידי הדפדפן שלך.');
  }
};

// ***** Favorite *****
export const checkIfFavorite = (assetId) => {
  if (JSON.parse(localStorage.getItem(config.FAVORITE_KEY))) {
    const favoriteAssetArray = JSON.parse(localStorage.getItem(config.FAVORITE_KEY));
    favoriteAssetArray.forEach((el) => {
      if (el === assetId) {
        config.Elements.assetFavoriteIcon.forEach((icon) => {
          icon.src = config.assetFavoriteIconFullSrc;
        });
      }
    });
  }
};

export const addToFavorite = (assetId) => {
  let addToArray = true;
  let favoriteAssetArray = [];
  if (JSON.parse(localStorage.getItem(config.FAVORITE_KEY))) {
    favoriteAssetArray = JSON.parse(localStorage.getItem(config.FAVORITE_KEY));
    favoriteAssetArray.forEach((el) => {
      if (el === assetId) {
        addToArray = false;
      }
    });
  }
  if (addToArray) {
    favoriteAssetArray.push(assetId);
    localStorage.setItem(config.FAVORITE_KEY, JSON.stringify(favoriteAssetArray));
  }
};

export const removeFromFavorite = (assetId) => {
  const favoriteAssetArray = JSON.parse(localStorage.getItem(config.FAVORITE_KEY));
  const index = favoriteAssetArray.findIndex((el) => el === assetId);
  if (index !== -1) {
    favoriteAssetArray.splice(index, 1);
  }
  localStorage.setItem(config.FAVORITE_KEY, JSON.stringify(favoriteAssetArray));
};

export const addFavoriteBtnListener = (button) => {
  if (!button) return;

  button.addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem(config.FAVORITE_KEY));
    getFavoriteAssets(favorites);
  });
};

export const addAssetFavoriteListeners = (buttons) => {
  if (!buttons || !config.Elements.assetId || !config.Elements.assetFavoriteIcon) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const assetId = config.Elements.assetId.textContent;

      config.Elements.assetFavoriteIcon.forEach((icon) => {
        const isOutline = icon.src.includes(config.assetFavoriteIconOutlineSrc);
        if (isOutline) {
          addToFavorite(assetId);
          icon.src = config.assetFavoriteIconFullSrc;
        } else {
          removeFromFavorite(assetId);
          icon.src = config.assetFavoriteIconOutlineSrc;
        }
      });
    });
  });
};
