import * as config from './config';

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
  if (isEuro) {
    config.Elements.activeCurrencyIcon.src = config.euroIconSrc;
    config.Elements.activeCurrencyIcon.alt = config.euroIconAlt;
    config.Elements.mobileActiveCurrencyIcon.src = config.euroIconSrc;
    config.Elements.mobileActiveCurrencyIcon.alt = config.euroIconAlt;
    config.Elements.notActiveCurrencyIcon.src = config.nisIconSrc;
    config.Elements.notActiveCurrencyIcon.alt = config.nisIconAlt;
    config.Elements.mobileNotActiveCurrencyIcon.src = config.nisIconSrc;
    config.Elements.mobileNotActiveCurrencyIcon.alt = config.nisIconAlt;
  } else {
    config.Elements.activeCurrencyIcon.src = config.nisIconSrc;
    config.Elements.activeCurrencyIcon.alt = config.nisIconAlt;
    config.Elements.mobileActiveCurrencyIcon.src = config.nisIconSrc;
    config.Elements.mobileActiveCurrencyIcon.alt = config.nisIconAlt;
    config.Elements.notActiveCurrencyIcon.src = config.euroIconSrc;
    config.Elements.notActiveCurrencyIcon.alt = config.euroIconAlt;
    config.Elements.mobileNotActiveCurrencyIcon.src = config.euroIconSrc;
    config.Elements.mobileNotActiveCurrencyIcon.alt = config.euroIconAlt;
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
  if (currencyIconSrc.includes(config.euroIconSrc)) {
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

export const reverseString = (s) => {
  return s.split('').reverse().join('');
};

export const getFormData = (cityFilter, roomsFilter, typeFilet, projectFilter, oceanViewFilter, currency, priceMinInput, priceMaxInput, idInput, nameInput) => {
  let searchFilterObj = {
    city: [],
    rooms: [],
    type: [],
    project: [],
    oceanView: [],
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

  typeFilet.forEach((el) => {
    if (el.classList.contains('active')) searchFilterObj.type.push(el.innerText);
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
    type: [],
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
    type: [],
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
    if (type === 'type') {
      for (const type of searchFilterObj.type) {
        if (el.innerText === type) {
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

export const ddBtnTextSetter = (ddBtn, filterBtn, onLoad = false) => {
  if (!onLoad) {
    filterBtn.forEach((el) => {
      el.addEventListener('click', function (e) {
        ddBtn.innerText = ddBtn.dataset.original;
        let counter = 0;
        let chosenFilters = '';
        // If filter btn has 'active class, add to counter and show number in DD btn
        for (let i = 0; i < filterBtn.length; i++) {
          if (filterBtn[i].classList.contains('active')) {
            chosenFilters = document.createTextNode(' (' + ++counter + ')');
            ddBtn.innerText = ddBtn.dataset.original;
            ddBtn.appendChild(chosenFilters);
          }
        }
      });
    });
  } else {
    ddBtn.innerText = ddBtn.dataset.original;
    let counter = 0;
    let chosenFilters = '';
    // If filter btn has 'active class, add to counter and show number in DD btn
    for (let i = 0; i < filterBtn.length; i++) {
      if (filterBtn[i].classList.contains('active')) {
        chosenFilters = document.createTextNode(' (' + ++counter + ')');
        ddBtn.innerText = ddBtn.dataset.original;
        ddBtn.appendChild(chosenFilters);
      }
    }
  }
};

// If user inputs max value in min input or min value at max input -> reverse values and show on DD btn
export const priceInputSetter = (inputMin, inputMax, onLoad = false, notModal = true, ddBtn) => {
  const currencySymbol = JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪';
  if (!onLoad) {
    document.querySelector('.content-col').addEventListener('click', function (e) {
      const currencySymbol = JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪';
      inputMin.value = inputMin.value.replace(/,|€|₪/gi, '');
      inputMax.value = inputMax.value.replace(/,|€|₪/gi, '');
      // If user inputs max value in min input or min value at max input -> reverse values and show on DD btn
      if (inputMin.value && inputMax.value && parseInt(inputMin.value, 10) > parseInt(inputMax.value, 10)) {
        const minValue = inputMax.value;
        inputMax.value = inputMin.value;
        inputMin.value = minValue;
      }
      inputMin.value = inputMin.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      inputMax.value = inputMax.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (inputMin.value && inputMax.value) {
        inputMin.value = currencySymbol + inputMin.value;
        inputMax.value = currencySymbol + inputMax.value;
        if (notModal) {
          const priceText = document.createTextNode(' (' + inputMin.value + ' - ' + inputMax.value + ')');
          ddBtn.innerText = ddBtn.dataset.original;
          ddBtn.appendChild(priceText);
        }
      } else if (!inputMin.value && inputMax.value) {
        inputMax.value = currencySymbol + inputMax.value;
        if (notModal) {
          const priceText = document.createTextNode(' (' + inputMin.value + ' - ' + inputMax.value + ')');
          ddBtn.innerText = ddBtn.dataset.original;
          ddBtn.appendChild(priceText);
        }
      } else if (inputMin.value && !inputMax.value) {
        inputMin.value = currencySymbol + inputMin.value;
        if (notModal) {
          const priceText = document.createTextNode(' (' + inputMin.value + ' - ' + inputMax.value + ')');
          ddBtn.innerText = ddBtn.dataset.original;
          ddBtn.appendChild(priceText);
        }
      } else if (!inputMin.value && !inputMax.value) {
        if (notModal) {
          const priceText = document.createTextNode(' (' + currencySymbol + '0' + ' - ' + currencySymbol + '1,000,000' + ')');
          ddBtn.innerText = ddBtn.dataset.original;
          ddBtn.appendChild(priceText);
        }
      }
    });
  } else {
    inputMin.value = inputMin.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    inputMax.value = inputMax.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (inputMin.value && inputMax.value) {
      inputMin.value = currencySymbol + inputMin.value;
      inputMax.value = currencySymbol + inputMax.value;
      if (notModal) {
        const priceText = document.createTextNode(' (' + inputMin.value + ' - ' + inputMax.value + ')');
        ddBtn.innerText = ddBtn.dataset.original;
        ddBtn.appendChild(priceText);
      }
    } else if (!inputMin.value && inputMax.value) {
      inputMax.value = currencySymbol + inputMax.value;
      if (notModal) {
        const priceText = document.createTextNode(' (' + inputMin.value + ' - ' + inputMax.value + ')');
        ddBtn.innerText = ddBtn.dataset.original;
        ddBtn.appendChild(priceText);
      }
    } else if (inputMin.value && !inputMax.value) {
      inputMin.value = currencySymbol + inputMin.value;
      if (notModal) {
        const priceText = document.createTextNode(' (' + inputMin.value + ' - ' + inputMax.value + ')');
        ddBtn.innerText = ddBtn.dataset.original;
        ddBtn.appendChild(priceText);
      }
    } else if (!inputMin.value && !inputMax.value) {
      if (notModal) {
        const priceText = document.createTextNode(' (' + currencySymbol + '0' + ' - ' + currencySymbol + '1,000,000' + ')');
        ddBtn.innerText = ddBtn.dataset.original;
        ddBtn.appendChild(priceText);
      }
    }
  }
};

export const clearSearchChoices = (searchFilterObj, ddBtn, filterBtn, input) => {
  const emptySearchFilterObj = {
    city: [],
    rooms: [],
    type: [],
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
    if (!el.innerText.includes('מחיר')) {
      el.innerText = el.dataset.original;
    } else {
      el.innerText =
        el.dataset.original +
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
      const baseUrl = `/${page}/${el.dataset.slug}`;
      window.location.assign(baseUrl);
    });
  });
};

export const inView = (element) => {
  if (element) {
    const elementHeight = element.clientHeight;

    // get window height
    const windowHeight = window.innerHeight;
    // get number of pixels that the document is scrolled
    const scrollY = window.scrollY;

    // get current scroll position (distance from the top of the page to the bottom of the current viewport)
    const scrollPosition = scrollY + windowHeight;

    // get element position (distance from the top of the page to the bottom of the element)
    const elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;

    // is scroll position greater than element position? (is element in view?)
    if (scrollPosition > elementPosition) {
      return true;
    }

    return false;
  }
  // }
};

export const animatePulse = (elements) => {
  elements.forEach((element) => {
    if (inView(element)) {
      element.classList.add('pulse');
    }
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
