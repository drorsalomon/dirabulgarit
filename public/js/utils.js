import * as config from './config';
import { switchLang } from './language';

// ***** Currency *****
export const switchSearchPriceCurrencyHtmlOnLoad = (priceInput, isEuro = true) => {
  if (isEuro) {
    if (priceInput)
      priceInput.forEach((el) => {
        if (!el.value) el.placeholder = '€' + el.placeholder;
      });
  } else {
    if (priceInput)
      priceInput.forEach((el) => {
        if (!el.value) el.placeholder = '₪' + el.placeholder;
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

// ***** Language *****
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
  console.log(langIconSrc);

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

export const btnAddActive = (searchFilterObj, filterBtn, type, notModal = true, ddBtn) => {
  filterBtn.forEach((el) => {
    if (type === 'city') {
      for (const city of searchFilterObj.city) {
        if (el.innerText === city) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, true);
        }
      }
    }
    if (type === 'oceanView') {
      for (const oceanView of searchFilterObj.oceanView) {
        if (el.innerText === oceanView) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, true);
        }
      }
    }
    if (type === 'rooms') {
      for (const rooms of searchFilterObj.rooms) {
        if (el.innerText === rooms) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, true);
        }
      }
    }
    if (type === 'project') {
      for (const project of searchFilterObj.project) {
        if (el.innerText === project) {
          el.classList.add('active');
        }
        if (notModal) {
          ddBtnTextSetter(ddBtn, filterBtn, true);
        }
      }
    }
  });
};

const LANGUAGE_MAP = {
  [config.DEFAULT_LANGUAGE]: 'he',
  [config.EN_LANGUAGE]: 'en',
  [config.RU_LANGUAGE]: 'ru',
};

const getLanguageText = (ddBtn, language) => {
  return ddBtn.dataset[LANGUAGE_MAP[language] || 'en'];
};

const getCurrencySymbol = () => {
  return JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪';
};

export const ddBtnTextSetter = (ddBtn, filterBtn, onLoad = false) => {
  const updateButtonText = () => {
    const language = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY));
    const activeCount = Array.from(filterBtn).filter((btn) => btn.classList.contains('active')).length;

    ddBtn.innerText = getLanguageText(ddBtn, language);
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
    const currency = getCurrencySymbol();
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

    // Add currency symbol
    inputMin.value = minVal ? `${currency}${minVal}` : '';
    inputMax.value = maxVal ? `${currency}${maxVal}` : '';

    if (notModal) {
      const displayMin = minVal || `${currency}0`;
      const displayMax = maxVal || `${currency}10,000,000`;
      const priceText = ` (${displayMin} - ${displayMax})`;

      ddBtn.innerText = getLanguageText(ddBtn, language);
      ddBtn.appendChild(document.createTextNode(priceText));
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
    if (!el.innerText.includes('מחיר') || !el.innerText.includes('price') || !el.innerText.includes('Цена')) {
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
