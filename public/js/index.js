import { filterAssets } from './asset';
import { getBlogs } from './blog';
import { displayMap } from './mapbox';
import { loadLang } from './language';
import * as config from './config';
import * as utils from './utils';
import * as animation from './animation';
//import { webinarRegistration } from './webinar';

window.onload = function () {
  if (window.innerWidth >= 992) {
    animation.animateOnLoad();
  }
  // Widgets
  if (config.Elements.whatsappWidget) {
    const enableWidget = document.getElementById('enable-toolbar-trigger');
    const enableWidgetIcon = document.getElementById('enable-toolbar-trigger-svg');
    if (window.innerWidth >= 300 && window.innerWidth < 576) {
      config.Elements.whatsappWidget.style.display = 'block';
      config.Elements.whatsappWidget.style.bottom = '125px';

      enableWidget.style.display = 'block';
      enableWidget.style.top = '-120px';
      enableWidget.style.left = '-3px !important';
      enableWidgetIcon.style.height = '30px';
      enableWidgetIcon.style.width = '30px';
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      config.Elements.whatsappWidget.style.display = 'block';
      config.Elements.whatsappWidget.style.bottom = '148px';

      enableWidget.style.display = 'block';
      enableWidget.style.top = '-145px';
      enableWidget.style.left = '-3px !important';
      enableWidgetIcon.style.height = '50px';
      enableWidgetIcon.style.width = '50px';
    } else if (window.innerWidth >= 768) {
      config.Elements.whatsappWidget.style.display = 'block';
      config.Elements.whatsappWidget.style.bottom = '140px';

      enableWidget.style.display = 'block';
      enableWidget.style.top = '-135px';
      enableWidget.style.left = '-3px !important';
      enableWidgetIcon.style.height = '50px';
      enableWidgetIcon.style.width = '50px';
    }
  }

  // Detect and set language by url on page load
  utils.detectLanguageFromURL();

  // If currency isn't set or currency is Euro
  if (!JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) || JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === config.DEFAULT_CURRENCY) {
    // Set default currency
    if (!JSON.parse(localStorage.getItem(config.CURRENCY_KEY))) {
      localStorage.setItem(config.CURRENCY_KEY, JSON.stringify(config.DEFAULT_CURRENCY));
    }
    if (config.Elements.currencyDdBtn) utils.switchCurrencyIconsSrc();
    utils.switchAssetPriceCurrency();
    utils.switchSearchPriceCurrencyHtmlOnLoad(config.Elements.priceInput);
  }
  // If currency is Nis
  else if (JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === config.NIS_CURRENCY) {
    utils.switchCurrencyIconsSrc(false);
    utils.switchAssetPriceCurrency(false);
    utils.switchSearchPriceCurrencyHtmlOnLoad(config.Elements.priceInput, false);
  }

  // If Language isn't set or language is Hebrew
  if (!JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) || JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE) {
    // Set default language
    if (!JSON.parse(localStorage.getItem(config.LANGUAGE_KEY))) {
      localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.DEFAULT_LANGUAGE));
    }
    if (config.Elements.langDdBtn) utils.switchLanguageIconsSrc(JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)));
  }
  // If language is English
  else if (JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.EN_LANGUAGE) {
    utils.switchLanguageIconsSrc(JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)));
  }
  // If language is Russian
  else if (JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.RU_LANGUAGE) {
    utils.switchLanguageIconsSrc(JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)));
  }

  //  Header dropdown menu click (project catalog)
  let projectsDdSubmenu = document.querySelectorAll('.projects-dropdown .dropdown-toggle');
  projectsDdSubmenu.forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let submenu = this.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle('show');
      }
    });
  });

  //  Header dropdown menu click (commercial catalog)
  let commercialDdSubmenu = document.querySelectorAll('.commercial-dropdown .dropdown-toggle');
  commercialDdSubmenu.forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let submenu = this.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle('show');
      }
    });
  });

  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('hidden.bs.dropdown', function () {
      this.querySelectorAll('.dropdown-menu.show').forEach(function (submenu) {
        submenu.classList.remove('show');
      });
    });
  });

  // ***** Navbar Active Link *****
  function getCurrentPath() {
    let href = window.location.pathname;

    // Remove language prefix (e.g., /en/)
    if (href.startsWith('/en/')) {
      href = href.substring(4); // removes "/en/"
    }

    // Remove trailing slash if it's not the root
    if (href.length > 1 && href.endsWith('/')) {
      href = href.slice(0, -1);
    }

    return href.substring(href.lastIndexOf('/') + 1); // final part of the path
  }

  function setActiveLinkClass(link, type = 'navbar') {
    const activeClass = type === 'offcanvas' ? 'offcanvas-active-link' : 'active-link';
    const inactiveClass = type === 'offcanvas' ? 'active-link' : 'offcanvas-active-link';

    link.classList.remove(inactiveClass);
    if (!link.classList.contains(activeClass)) {
      link.classList.add(activeClass);
    }
  }

  function handleProjectDropdowns(linkStringEnding, type = 'navbar') {
    const map = {
      projectBurgasDdBtn: ['atlantis-aria-2', 'atlantis-aria-3', 'atlantis-euphoria', 'atlas-azimuth'],
      projectSofiaDdBtn: ['atlantis-barcode', 'atlantis-barcode-2', 'mountain-view-residence', 'vitosha-mountain-view', 'vitosha-mountain-boutique'],
      projectSvetiDdBtn: ['villa-margarita', 'mellia-florance', 'fort-noks-premier-suites', 'premier-fort-beach', 'prestige-fort-beach'],
      projectNessebarDdBtn: ['nessebar-fort-residence'],
      projectSunnyDdBtn: ['green-fort-suites'],
    };

    for (const [btn, projects] of Object.entries(map)) {
      if (projects.some((slug) => linkStringEnding.includes(slug))) {
        setActiveLinkClass(config.Elements[btn], type);
      }
    }
  }

  function highlightNavLinks(type = 'navbar') {
    const links = config.Elements.activeNavLinks;
    const href = getCurrentPath();

    // Reset all
    ['assetCatalogDdBtn', 'projectsDdBtn', 'commercialDdBtn'].forEach((btn) => {
      config.Elements[btn].classList.remove('active-link', 'offcanvas-active-link');
    });

    if (!href) setActiveLinkClass(config.Elements.homePageLink, type);
    if (href === 'blog' || href === '/blog') setActiveLinkClass(config.Elements.blogLink, type);

    links.forEach((link) => {
      const linkString = link.toString();
      const linkStringEnding = linkString.substring(linkString.lastIndexOf('/') + 1);

      if (type === 'offcanvas') link.style.color = 'white';

      if (href && linkStringEnding === href) {
        setActiveLinkClass(link, type);

        if (href.includes('search-results') || linkString.includes('search') || linkString.includes('project') || linkString.includes('commercial')) {
          setActiveLinkClass(config.Elements.assetCatalogDdBtn, type);
        }

        if (linkString.includes('project')) {
          setActiveLinkClass(config.Elements.projectsDdBtn, type);
          handleProjectDropdowns(linkStringEnding, type);
        }

        if (linkString.includes('commercial')) {
          setActiveLinkClass(config.Elements.commercialDdBtn, type);
        }
      }
    });
  }

  // Apply on page load (desktop)
  highlightNavLinks('navbar');

  // Apply on mobile when offcanvas toggler is clicked
  if (config.Elements.navbarToggler) {
    config.Elements.navbarToggler.addEventListener('click', (e) => {
      e.preventDefault();
      highlightNavLinks('offcanvas');
    });
  }

  // Search form and search modal user input
  if (config.Elements.searchForm || config.Elements.modalSearchForm) {
    const searchFilterObj = JSON.parse(localStorage.getItem(config.FILTER_KEY));

    // Fill search form data on load
    utils.btnAddActive(searchFilterObj, config.Elements.searchFilterBtnCity, 'city', true, config.Elements.searchDdBtnCity);
    utils.btnAddActive(searchFilterObj, config.Elements.searchFilterBtnOceanView, 'oceanView', true, config.Elements.searchDdBtnOceanView);
    utils.btnAddActive(searchFilterObj, config.Elements.searchFilterBtnRooms, 'rooms', true, config.Elements.searchDdBtnRooms);
    utils.btnAddActive(searchFilterObj, config.Elements.searchFilterBtnType, 'type', true, config.Elements.searchDdBtnType);
    utils.btnAddActive(searchFilterObj, config.Elements.searchFilterBtnProject, 'project', true, config.Elements.searchDdBtnProject);

    config.Elements.priceInputMin.value = searchFilterObj.priceMin.toString();
    config.Elements.priceInputMax.value = searchFilterObj.priceMax.toString();
    utils.priceInputSetter(config.Elements.priceInputMin, config.Elements.priceInputMax, true, true, config.Elements.searchDdBtnPrice);
    config.Elements.searchInputId.value = searchFilterObj.id;
    config.Elements.searchInputName.value = searchFilterObj.name;

    // Fill MODAL search form data on load
    utils.btnAddActive(searchFilterObj, config.Elements.modalSearchFilterBtnCity, 'city', false);
    utils.btnAddActive(searchFilterObj, config.Elements.modalSearchFilterBtnOceanView, 'oceanView', false);
    utils.btnAddActive(searchFilterObj, config.Elements.modalSearchFilterBtnRooms, 'rooms', false);
    utils.btnAddActive(searchFilterObj, config.Elements.modalSearchFilterBtnType, 'type', false);
    utils.btnAddActive(searchFilterObj, config.Elements.modalSearchFilterBtnProject, 'project', false);

    config.Elements.modalPriceInputMin.value = searchFilterObj.priceMin.toString();
    config.Elements.modalPriceInputMax.value = searchFilterObj.priceMax.toString();
    utils.priceInputSetter(config.Elements.modalPriceInputMin, config.Elements.modalPriceInputMax, true, false);
    config.Elements.modalSearchInputId.value = searchFilterObj.id;
    config.Elements.modalSearchInputName.value = searchFilterObj.name;
  } else {
    utils.clearSearchChoices(
      JSON.parse(localStorage.getItem(config.FILTER_KEY)),
      config.Elements.searchDdBtn,
      config.Elements.searchFilterBtn,
      config.Elements.searchInput,
    );
  }
  if (config.Elements.assetFavoriteIcon) {
    config.Elements.assetFavoriteIcon.forEach((el) => {
      const assetId = config.Elements.assetId.textContent;
      utils.checkIfFavorite(assetId);
    });
  }

  // Asset gallery main-thumbnail opacity setter
  config.Elements.assetThumbnailImgs.forEach((thumbnailImg) => {
    if (thumbnailImg.src === config.Elements.assetMainImg.src) thumbnailImg.style.opacity = '1';
  });
};

// Set language icon on browser back button
window.addEventListener('pageshow', function () {
  const href = window.location.href;
  if (href.includes(`${config.baseProdUrl}${config.EN_LANGUAGE}`)) {
    utils.switchLanguageIconsSrc(config.EN_LANGUAGE);
    localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.EN_LANGUAGE));
    loadLang(JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)));
  } else if (href.includes(`${config.baseProdUrl}${config.RU_LANGUAGE}`)) {
    utils.switchLanguageIconsSrc(config.RU_LANGUAGE);
    localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.RU_LANGUAGE));
    loadLang(JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)));
  } else {
    if (config.Elements.langDdBtn) utils.switchLanguageIconsSrc(config.DEFAULT_LANGUAGE);
    localStorage.setItem(config.LANGUAGE_KEY, JSON.stringify(config.DEFAULT_LANGUAGE));
    loadLang(JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)));
  }
});

// Currency switch
utils.addCurrencySwitchListener(config.Elements.notActiveCurrencyIcon);
utils.addCurrencySwitchListener(config.Elements.mobileNotActiveCurrencyIcon, true);

// Language switch
utils.addLangSwitchListener(config.Elements.firstNotActiveLangIcon);
utils.addLangSwitchListener(config.Elements.secondNotActiveLangIcon);
utils.addLangSwitchListener(config.Elements.firstMobileNotActiveLangIcon, true);
utils.addLangSwitchListener(config.Elements.secondMobileNotActiveLangIcon, true);

// Favorite button listeners
utils.addFavoriteBtnListener(config.Elements.favoriteBtn);
utils.addFavoriteBtnListener(config.Elements.mobileFavoriteBtn);

// Asset favorite button logic
utils.addAssetFavoriteListeners(config.Elements.assetFavoriteBtn);

// Map display
if (config.Elements.mapBox && config.Elements.mapBox.dataset.long && config.Elements.mapBox.dataset.lat) {
  displayMap(config.Elements.mapBox.dataset.long, config.Elements.mapBox.dataset.lat, config.Elements.mapBox.dataset.title);
}

// Asset Gallery Image Switch listener
if (config.Elements.assetThumbnailImgs)
  config.Elements.assetThumbnailImgs.forEach((thumbnailImg) => {
    thumbnailImg.addEventListener('click', async (e) => {
      config.Elements.assetThumbnailImgs.forEach((imgOpacity) => {
        imgOpacity.style.opacity = '0.6';
      });
      config.Elements.assetMainImg.src = thumbnailImg.src;
      thumbnailImg.style.opacity = '1';
    });
  });

// Set clicked asset main image as modal main image & feed markup to modal-carousel
if (config.Elements.assetMainImg)
  config.Elements.assetMainImg.addEventListener('click', async (e) => {
    config.Elements.carouselInner.innerHTML = '';
    config.Elements.assetThumbnailImgs.forEach((thumbNail) => {
      if (thumbNail.src === config.Elements.assetMainImg.src) {
        let markup = `<div class="carousel-item asset-gallery-carousel-item active align-content-center">
                        <img class="img-fluid" src="${thumbNail.src}" alt="Asset image">
                      </div> `;
        document.querySelector('.carousel-inner').insertAdjacentHTML('afterbegin', markup);
      } else {
        let markup = `<div class="carousel-item asset-gallery-carousel-item align-content-center">
                        <img class="img-fluid" src="${thumbNail.src}" alt="Asset image">
                      </div>`;
        document.querySelector('.carousel-inner').insertAdjacentHTML('afterbegin', markup);
      }
    });
  });

if (config.Elements.shareBtn)
  config.Elements.shareBtn.addEventListener('click', async () => {
    utils.addNavigator();
  });

if (config.Elements.shareBtnWhite)
  config.Elements.shareBtnWhite.forEach((el) => {
    el.addEventListener('click', function (e) {
      utils.addNavigator();
    });
  });

// ***** Asset PDF button *****
utils.setupPdfButtonListeners();

// ***** Button Listeners *****
utils.initializeNavigationButtons();

if (config.Elements.blogLink)
  config.Elements.blogLink.addEventListener('click', function (e) {
    localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(config.DEFAULT_PAGE_NUM));
    localStorage.setItem(config.RES_PER_PAGE_KEY, JSON.stringify(config.DEFAULT_BLOG_RES_PER_PAGE));
    getBlogs(config.DEFAULT_PAGE_NUM, config.DEFAULT_BLOG_RES_PER_PAGE);
  });

// Back to search results from asset page
if (config.Elements.backToSearchResultsBtn)
  config.Elements.backToSearchResultsBtn.addEventListener('click', function (e) {
    window.history.go(-1);
  });

// *****Get pages by slug *****
// Asset Card
utils.addSlugNavigation(config.Elements.assetCards, 'asset');
// Main Page Blog Buttons
utils.addSlugNavigation(config.Elements.mainPageBlogBtn, 'blog');
// Blog Cards
utils.addSlugNavigation(config.Elements.blogCards, 'blog');

// Add text to search dd buttons and fix price min-max user input
if (config.Elements.searchDdBtnCity) utils.ddBtnTextSetter(config.Elements.searchDdBtnCity, config.Elements.searchFilterBtnCity);

if (config.Elements.searchDdBtnRooms) utils.ddBtnTextSetter(config.Elements.searchDdBtnRooms, config.Elements.searchFilterBtnRooms);

if (config.Elements.searchDdBtnType) utils.ddBtnTextSetter(config.Elements.searchDdBtnType, config.Elements.searchFilterBtnType);

if (config.Elements.searchDdBtnProject) utils.ddBtnTextSetter(config.Elements.searchDdBtnProject, config.Elements.searchFilterBtnProject);

if (config.Elements.searchDdBtnOceanView) utils.ddBtnTextSetter(config.Elements.searchDdBtnOceanView, config.Elements.searchFilterBtnOceanView);

if (config.Elements.searchDdBtnPrice)
  utils.priceInputSetter(config.Elements.priceInputMin, config.Elements.priceInputMax, false, true, config.Elements.searchDdBtnPrice);
if (config.Elements.modalPriceInputMin && config.Elements.modalPriceInputMax)
  utils.priceInputSetter(config.Elements.modalPriceInputMin, config.Elements.modalPriceInputMax, false, false);

if (config.Elements.searchClearFilters)
  config.Elements.searchClearFilters.forEach((el) => {
    el.addEventListener('click', function (e) {
      utils.clearSearchChoices(
        JSON.parse(localStorage.getItem(config.FILTER_KEY)),
        config.Elements.searchDdBtn,
        config.Elements.searchFilterBtn,
        config.Elements.searchInput,
      );
    });
  });

// Price input rules (only nums, no zero at start, add currency symbol at start, add comma every 3 nums)
if (config.Elements.priceInput)
  config.Elements.priceInput.forEach((el) => {
    el.addEventListener('input', function (e) {
      const euroSymbol = JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === 'euro' ? '€' : '₪';
      // Remove any non-numeric characters
      this.value = this.value.replace(/\D/g, '');

      // Don't allow number to start with zero
      this.value = this.value.replace(/^0+/, '');

      // Add symbol if it's not already there and the user is typing
      if (!this.value.startsWith(euroSymbol) && this.value !== '') {
        this.value = euroSymbol + this.value;
      }

      // Add comma every 3 numbers
      this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
  });

// ***** Search Forms and Search Results *****
if (config.Elements.searchForm)
  config.Elements.searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let searchFilterObj = utils.getFormData(
      config.Elements.searchFilterBtnCity,
      config.Elements.searchFilterBtnRooms,
      config.Elements.searchFilterBtnOceanView,
      config.Elements.searchFilterBtnProject,
      JSON.parse(localStorage.getItem(config.CURRENCY_KEY)),
      config.Elements.priceInputMin,
      config.Elements.priceInputMax,
      config.Elements.searchInputId,
      config.Elements.searchInputName,
    );

    localStorage.setItem(config.FILTER_KEY, JSON.stringify(searchFilterObj));
    localStorage.setItem(config.SORT_KEY, JSON.stringify(config.DEFAULT_SORT));
    localStorage.setItem(config.TYPE_KEY, JSON.stringify(config.DEFAULT_TYPE));
    localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(config.DEFAULT_PAGE_NUM));
    localStorage.setItem(config.RES_PER_PAGE_KEY, JSON.stringify(config.DEFAULT_RES_PER_PAGE));
    filterAssets(
      JSON.parse(localStorage.getItem(config.FILTER_KEY)),
      JSON.parse(localStorage.getItem(config.SORT_KEY)),
      JSON.parse(localStorage.getItem(config.TYPE_KEY)),
      JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
      JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
    );
  });

// Modal Search Form
if (config.Elements.modalSearchForm)
  config.Elements.modalSearchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let searchFilterObj = utils.getFormData(
      config.Elements.modalSearchFilterBtnCity,
      config.Elements.modalSearchFilterBtnRooms,
      config.Elements.modalSearchFilterBtnOceanView,
      config.Elements.modalSearchFilterBtnProject,
      JSON.parse(localStorage.getItem(config.CURRENCY_KEY)),
      config.Elements.modalPriceInputMin,
      config.Elements.modalPriceInputMax,
      config.Elements.modalSearchInputId,
      config.Elements.modalSearchInputName,
    );

    localStorage.setItem(config.FILTER_KEY, JSON.stringify(searchFilterObj));
    localStorage.setItem(config.SORT_KEY, JSON.stringify(config.DEFAULT_SORT));
    localStorage.setItem(config.TYPE_KEY, JSON.stringify(config.DEFAULT_TYPE));
    localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(config.DEFAULT_PAGE_NUM));
    localStorage.setItem(config.RES_PER_PAGE_KEY, JSON.stringify(config.DEFAULT_RES_PER_PAGE));
    filterAssets(
      JSON.parse(localStorage.getItem(config.FILTER_KEY)),
      JSON.parse(localStorage.getItem(config.SORT_KEY)),
      JSON.parse(localStorage.getItem(config.TYPE_KEY)),
      JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
      JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
    );
  });

if (config.Elements.searchResultsFilters)
  config.Elements.searchResultsFilters.forEach((el) => {
    el.addEventListener('click', function (e) {
      localStorage.setItem(config.SORT_KEY, JSON.stringify(el.dataset.sort));
      localStorage.setItem(config.TYPE_KEY, JSON.stringify(el.dataset.type));
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(config.DEFAULT_PAGE_NUM));
      localStorage.setItem(config.RES_PER_PAGE_KEY, JSON.stringify(config.DEFAULT_RES_PER_PAGE));
      filterAssets(
        JSON.parse(localStorage.getItem(config.FILTER_KEY)),
        JSON.parse(localStorage.getItem(config.SORT_KEY)),
        JSON.parse(localStorage.getItem(config.TYPE_KEY)),
        JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
        JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
      );
    });
  });

if (config.Elements.searchResultsFiltersDdBtn)
  config.Elements.searchResultsFiltersDdBtn.addEventListener('click', function (e) {
    config.Elements.searchResultsFilters.forEach((el) => {
      if (
        el.dataset.sort === JSON.parse(localStorage.getItem(config.SORT_KEY)) &&
        parseInt(el.dataset.type) === parseInt(JSON.parse(localStorage.getItem(config.TYPE_KEY)))
      ) {
        el.classList.add('search-results-filters-active');
      }
    });
  });

if (config.Elements.paginationPageBtn)
  config.Elements.paginationPageBtn.forEach((el) => {
    const href = window.location.href;
    if (parseInt(el.dataset.page) === JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY))) {
      el.classList.add('pagination-btn-active');
    }
    el.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(parseInt(el.dataset.page)));
      if (
        href.includes(`${config.baseProdUrl}asset/search-results`) ||
        href.includes(`${config.baseProdUrl}${config.EN_LANGUAGE}/asset/search-results`) ||
        href.includes(`${config.baseProdUrl}${config.RU_LANGUAGE}/asset/search-results`)
      ) {
        filterAssets(
          JSON.parse(localStorage.getItem(config.FILTER_KEY)),
          JSON.parse(localStorage.getItem(config.SORT_KEY)),
          JSON.parse(localStorage.getItem(config.TYPE_KEY)),
          JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
          JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
        );
      } else if (
        href === `${config.baseProdUrl}blog` ||
        href === `${config.baseProdUrl}${config.EN_LANGUAGE}/blog` ||
        href === `${config.baseProdUrl}${config.RU_LANGUAGE}/blog`
      ) {
        getBlogs(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)), config.DEFAULT_BLOG_RES_PER_PAGE);
      }
    });
  });

if (config.Elements.paginationPrevPageBtn && config.Elements.paginationNextPageBtn) {
  const href = window.location.href;
  if (JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) === config.DEFAULT_PAGE_NUM) {
    config.Elements.paginationPrevPageBtn.disabled = true;

    config.Elements.paginationNextPageBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) + 1));
      if (
        href.includes(`${config.baseProdUrl}asset/search-results`) ||
        href.includes(`${config.baseProdUrl}${config.EN_LANGUAGE}/asset/search-results`) ||
        href.includes(`${config.baseProdUrl}${config.RU_LANGUAGE}/asset/search-results`)
      ) {
        filterAssets(
          JSON.parse(localStorage.getItem(config.FILTER_KEY)),
          JSON.parse(localStorage.getItem(config.SORT_KEY)),
          JSON.parse(localStorage.getItem(config.TYPE_KEY)),
          JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
          JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
        );
      } else if (
        href === `${config.baseProdUrl}blog` ||
        href === `${config.baseProdUrl}${config.EN_LANGUAGE}/blog` ||
        href === `${config.baseProdUrl}${config.RU_LANGUAGE}/blog`
      ) {
        getBlogs(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)), config.DEFAULT_BLOG_RES_PER_PAGE);
      }
    });
  } else if (JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) === parseInt(config.Elements.paginationNextPageBtn.dataset.lastpage)) {
    config.Elements.paginationNextPageBtn.disabled = true;

    config.Elements.paginationPrevPageBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) - 1));
      if (
        href.includes(`${config.baseProdUrl}asset/search-results`) ||
        href.includes(`${config.baseProdUrl}${config.EN_LANGUAGE}/asset/search-results`) ||
        href.includes(`${config.baseProdUrl}${config.RU_LANGUAGE}/asset/search-results`)
      ) {
        filterAssets(
          JSON.parse(localStorage.getItem(config.FILTER_KEY)),
          JSON.parse(localStorage.getItem(config.SORT_KEY)),
          JSON.parse(localStorage.getItem(config.TYPE_KEY)),
          JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
          JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
        );
      } else if (
        href === `${config.baseProdUrl}blog` ||
        href === `${config.baseProdUrl}${config.EN_LANGUAGE}/blog` ||
        href === `${config.baseProdUrl}${config.RU_LANGUAGE}/blog`
      ) {
        getBlogs(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)), config.DEFAULT_BLOG_RES_PER_PAGE);
      }
    });
  } else {
    config.Elements.paginationIconBtn.forEach((el) => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        if (el.dataset.lastpage) {
          localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) + 1));
        } else {
          localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) - 1));
        }
        if (
          href.includes(`${config.baseProdUrl}asset/search-results`) ||
          href.includes(`${config.baseProdUrl}${config.EN_LANGUAGE}/asset/search-results`) ||
          href.includes(`${config.baseProdUrl}${config.RU_LANGUAGE}/asset/search-results`)
        ) {
          filterAssets(
            JSON.parse(localStorage.getItem(config.FILTER_KEY)),
            JSON.parse(localStorage.getItem(config.SORT_KEY)),
            JSON.parse(localStorage.getItem(config.TYPE_KEY)),
            JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
            JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
          );
        } else if (
          href === `${config.baseProdUrl}blog` ||
          href === `${config.baseProdUrl}${config.EN_LANGUAGE}/blog` ||
          href === `${config.baseProdUrl}${config.RU_LANGUAGE}/blog`
        ) {
          getBlogs(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)), config.DEFAULT_BLOG_RES_PER_PAGE);
        }
      });
    });
  }
}

if (config.Elements.contactUsForm)
  config.Elements.contactUsForm.forEach((el) => {
    el.addEventListener(
      'submit',
      function (event) {
        // Honeypot field check
        if (config.Elements.contactUsHoneypotInput && config.Elements.contactUsHoneypotInput.value !== '') {
          event.preventDefault();
          event.stopPropagation();
          console.warn('Bot detected! Submission blocked.');
          return;
        }

        if (!el.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        el.classList.add('was-validated');
      },
      false,
    );
  });

if (config.Elements.contactUsPhoneInput)
  config.Elements.contactUsPhoneInput.addEventListener('input', function () {
    config.Elements.contactUsPhoneInput.setCustomValidity('');
    if (config.Elements.contactUsPhoneInput.validity.patternMismatch) {
      config.Elements.contactUsPhoneInput.setCustomValidity('אנא הכניסו מספר טלפון תקין');
    }
  });
if (config.Elements.contactUsEmailInput)
  config.Elements.contactUsEmailInput.addEventListener('input', function () {
    config.Elements.contactUsEmailInput.setCustomValidity('');
    if (config.Elements.contactUsEmailInput.validity.patternMismatch) {
      config.Elements.contactUsEmailInput.setCustomValidity('אנא הכניסו כתובת אימייל תקינה');
    }
  });

if (config.Elements.calendlyAgentsChoices)
  config.Elements.calendlyAgentsChoices.forEach((el) => {
    el.addEventListener('click', function (e) {
      if (el.dataset.agent === 'yeheli') {
        config.Elements.calendlyWidgetYeheli.style.display = 'block';
        el.classList.add('search-results-filters-active');

        config.Elements.calendlyWidgetShimon.style.display = 'none';
        config.Elements.calendlyAgentShimon.classList.remove('search-results-filters-active');
      } else if (el.dataset.agent === 'shimon') {
        config.Elements.calendlyWidgetShimon.style.display = 'block';
        el.classList.add('search-results-filters-active');

        config.Elements.calendlyWidgetYeheli.style.display = 'none';
        config.Elements.calendlyAgentYeheli.classList.remove('search-results-filters-active');
      }
    });
  });

if (config.Elements.contactUsCloseBtnFixed)
  config.Elements.contactUsCloseBtnFixed.forEach((el) => {
    el.addEventListener('click', function (e) {
      if (window.innerWidth >= 768) {
        animation.toggleContactUsClick(config.Elements.contactUsContainerFixed, config.Elements.contactUsExpandBtnContainer);
      } else if (window.innerWidth < 768) {
        animation.toggleContactUsClick(config.Elements.contactUsMobileContainerFixed, config.Elements.contactUsExpandBtnContainer);
      }
    });
  });

if (config.Elements.contactUsExpandBtn)
  config.Elements.contactUsExpandBtn.forEach((el) => {
    el.addEventListener('click', function (e) {
      if (window.innerWidth >= 768) {
        animation.toggleContactUsClick(config.Elements.contactUsExpandBtnContainer, config.Elements.contactUsContainerFixed);
      } else if (window.innerWidth < 768) {
        animation.toggleContactUsClick(config.Elements.contactUsExpandBtnContainer, config.Elements.contactUsMobileContainerFixed);
      }
    });
  });

// Webinar
// if (config.Elements.webinarForm)
//   config.Elements.webinarForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const userName = config.Elements.webinarFormInputName.value;
//     const userPhone = config.Elements.webinarFormInputPhone.value;
//     const userEmail = config.Elements.webinarFormInputEmail.value;
//     const userIsSubscribed = config.Elements.webinarFormCheck.checked;
//     webinarRegistration(userName, userPhone, userEmail, userIsSubscribed);
//   });

// ***** Animations *****

// Contact Us fixed animation
if (config.Elements.contactUsContainerFixed)
  animation.toggleContactUsScroll(
    config.Elements.contactUsContainerFixed,
    config.Elements.contactUsMobileContainerFixed,
    config.Elements.footerContainer,
    config.Elements.contactUsExpandBtnContainer,
  );

if (config.Elements.contactUsExpandBtnContainer)
  animation.toggleContactUsExpand(config.Elements.contactUsExpandBtnContainer, config.Elements.footerCopyContainer);

// Counter Animations
const PROJECT_COUNTERS = {
  aa2: [
    { element: config.Elements.aa2ProjectApartmentsNumber, value: 159, suffix: '' },
    { element: config.Elements.aa2ProjectParkingSpotsNumber, value: 174, suffix: '' },
  ],
  aa3: [
    { element: config.Elements.aa3ProjectBuildingsNumber, value: 3, suffix: '' },
    { element: config.Elements.aa3ProjectFloorsNumber, value: 9, suffix: '' },
    { element: config.Elements.aa3ProjectApartmentsNumber, value: 210, suffix: '' },
    { element: config.Elements.aa3ProjectParkingSpotsNumber, value: 250, suffix: '' },
  ],
  ae: [
    { element: config.Elements.aeProjectBuildingsNumber, value: 6, suffix: '' },
    { element: config.Elements.aeProjectFloorsNumber, value: 9, suffix: '' },
    { element: config.Elements.aeProjectApartmentsNumber, value: 292, suffix: '' },
    { element: config.Elements.aeProjectParkingSpotsNumber, value: 320, suffix: '' },
    { element: config.Elements.aeProjectAreaNumber, value: 27955, suffix: 'area' },
    { element: config.Elements.aeProjectGreenAreaNumber, value: 5200, suffix: 'area' },
  ],
  ab: [
    { element: config.Elements.abProjectBuildingsNumber, value: 2, suffix: '' },
    { element: config.Elements.abProjectFloorsNumber, value: 8, suffix: '' },
    { element: config.Elements.abProjectApartmentsNumber, value: 93, suffix: '' },
    { element: config.Elements.abProjectParkingSpotsNumber, value: 106, suffix: '' },
    { element: config.Elements.abProjectAreaNumber, value: 9634, suffix: 'area' },
  ],
  ab2: [
    { element: config.Elements.ab2ProjectBuildingsNumber, value: 2, suffix: '' },
    { element: config.Elements.ab2ProjectApartmentsNumber, value: 225, suffix: '' },
    { element: config.Elements.ab2ProjectParkingSpotsNumber, value: 243, suffix: '' },
    { element: config.Elements.ab2ProjectAreaNumber, value: 7000, suffix: 'area' },
  ],
  azimuth: [
    { element: config.Elements.azimuthProjectBuildingsNumber, value: 12, suffix: '' },
    { element: config.Elements.azimuthProjectCommercialNumber, value: 6, suffix: '' },
    { element: config.Elements.azimuthProjectFloorsNumber, value: 10, suffix: '' },
    { element: config.Elements.azimuthProjectApartmentsNumber, value: 2000, suffix: '' },
    { element: config.Elements.azimuthProjectParkingSpotsNumber, value: 144, suffix: '' },
    { element: config.Elements.azimuthProjectAreaNumber, value: 68000, suffix: 'area' },
  ],
  villaMargarita: [
    { element: config.Elements.villaMargaritaProjectBuildingsNumber, value: 1, suffix: '' },
    { element: config.Elements.villaMargaritaProjectFloorsNumber, value: 4, suffix: '' },
    { element: config.Elements.villaMargaritaProjectApartmentsNumber, value: 72, suffix: '' },
  ],
  melliaFlorance: [
    { element: config.Elements.melliaFloranceProjectBuildingsNumber, value: 1, suffix: '' },
    { element: config.Elements.melliaFloranceProjectFloorsNumber, value: 5, suffix: '' },
    { element: config.Elements.melliaFloranceProjectApartmentsNumber, value: 29, suffix: '' },
  ],
  mountainResidence: [
    { element: config.Elements.mountainResidenceProjectBuildingsNumber, value: 1, suffix: '' },
    { element: config.Elements.mountainResidenceProjectFloorsNumber, value: 6, suffix: '' },
    { element: config.Elements.mountainResidenceProjectApartmentsNumber, value: 133, suffix: '' },
    { element: config.Elements.mountainResidenceProjectParkingSpotsNumber, value: 129, suffix: '' },
  ],
  mountainView: [
    { element: config.Elements.mountainViewProjectBuildingsNumber, value: 1, suffix: '' },
    { element: config.Elements.mountainViewProjectFloorsNumber, value: 4, suffix: '' },
    { element: config.Elements.mountainViewProjectApartmentsNumber, value: 67, suffix: '' },
    { element: config.Elements.mountainViewProjectParkingSpotsNumber, value: 68, suffix: '' },
  ],
  mountainBoutique: [
    { element: config.Elements.mountainBoutiqueProjectBuildingsNumber, value: 1, suffix: '' },
    { element: config.Elements.mountainBoutiqueProjectFloorsNumber, value: 6, suffix: '' },
    { element: config.Elements.mountainBoutiqueProjectApartmentsNumber, value: 46, suffix: '' },
    { element: config.Elements.mountainBoutiqueProjectParkingSpotsNumber, value: 51, suffix: '' },
  ],
  fortNoksSuites: [
    { element: config.Elements.fortNoksSuitesProjectBuildingsNumber, value: 2, suffix: '' },
    { element: config.Elements.fortNoksSuitesProjectFloorsNumber, value: 5, suffix: '' },
    { element: config.Elements.fortNoksSuitesProjectApartmentsNumber, value: 54, suffix: '' },
    { element: config.Elements.fortNoksSuitesProjectParkingSpotsNumber, value: 10, suffix: '' },
  ],
  greenFortSuites: [
    { element: config.Elements.greenFortSuitesProjectBuildingsNumber, value: 7, suffix: '' },
    { element: config.Elements.greenFortSuitesProjectFloorsNumber, value: 6, suffix: '' },
    { element: config.Elements.greenFortSuitesProjectApartmentsNumber, value: 47, suffix: '' },
    { element: config.Elements.greenFortSuitesProjectParkingSpotsNumber, value: 14, suffix: '' },
  ],
  premierFortBeach: [
    { element: config.Elements.premierFortBeachProjectBuildingsNumber, value: 6, suffix: '' },
    { element: config.Elements.premierFortBeachProjectFloorsNumber, value: 6, suffix: '' },
    { element: config.Elements.premierFortBeachProjectApartmentsNumber, value: 282, suffix: '' },
  ],
  prestigeFortBeach: [
    { element: config.Elements.prestigeFortBeachProjectBuildingsNumber, value: 3, suffix: '' },
    { element: config.Elements.prestigeFortBeachProjectFloorsNumber, value: 5, suffix: '' },
    { element: config.Elements.prestigeFortBeachProjectApartmentsNumber, value: 13, suffix: '' },
  ],
  nessebarFortResidence: [
    { element: config.Elements.nessebarFortResidenceProjectBuildingsNumber, value: 1, suffix: '' },
    { element: config.Elements.nessebarFortResidenceProjectFloorsNumber, value: 4, suffix: '' },
    { element: config.Elements.nessebarFortResidenceProjectApartmentsNumber, value: 84, suffix: '' },
  ],
  camelot: [
    { element: config.Elements.camelotProjectPriceNumber, value: 2800000, suffix: '€', format: true },
    { element: config.Elements.camelotProjectFloorsNumber, value: 4, suffix: '' },
    { element: config.Elements.camelotProjectAssetsNumber, value: 10, suffix: '' },
    { element: config.Elements.camelotProjectParkingSpotsNumber, value: 80, suffix: '' },
    { element: config.Elements.camelotProjectAreaNumber, value: 3390, suffix: 'area' },
    { element: config.Elements.camelotProjectBuiltAreaNumber, value: 6660, suffix: 'area' },
  ],
  sofiab5: [
    { element: config.Elements.sofiab5ProjectPriceNumber, value: 2800, suffix: '€/\u{33A1}', format: true },
    { element: config.Elements.sofiab5ProjectFloorsNumber, value: 3, suffix: '' },
    { element: config.Elements.sofiab5ProjectAssetsNumber, value: 3, suffix: '' },
    { element: config.Elements.sofiab5ProjectStoresNumber, value: 2, suffix: '' },
    { element: config.Elements.sofiab5ProjectBuiltAreaNumber, value: 267, suffix: 'area' },
  ],
  samokov: [{ element: config.Elements.samokovProjectAreaNumber, value: 93000, suffix: 'area' }],
  pomorie: [
    { element: config.Elements.pomorieProjectPriceNumber, value: 653350, suffix: '€', format: true },
    { element: config.Elements.pomorieProjectFloorsNumber, value: 3, suffix: '' },
    { element: config.Elements.pomorieProjectBuiltAreaNumber, value: 850, suffix: 'area' },
  ],
};

const getAreaSuffix = () => {
  const lang = JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) || config.DEFAULT_LANGUAGE;
  return lang === config.DEFAULT_LANGUAGE ? 'מ"ר' : '\u{33A1}';
};

const animateCounter = ({ element, value, suffix, format }) => {
  if (!element) return;

  let displayValue = value;
  let displaySuffix = suffix;

  if (format) {
    displayValue = new Intl.NumberFormat().format(value);
  } else if (suffix === 'area') {
    displaySuffix = getAreaSuffix();
  }

  animation.animateCounter(element, displayValue, displaySuffix);
};

const setupCounterAnimations = () => {
  Object.values(PROJECT_COUNTERS).forEach((project) => {
    project.forEach(animateCounter);
  });
};

// Initialize
setupCounterAnimations();

// Fade in animation
if (config.Elements.hotAssetsContainer || config.Elements.projectAssetsContainer) {
  animation.animateCardsFadeIn(config.Elements.assetCards);
} else if (config.Elements.searchResultsContainer || config.Elements.relatedAssetsContainer) {
  config.Elements.assetCards.forEach((card) => {
    card.style.opacity = 1;
  });
}

// Reviews carousel animation
if (config.Elements.reviewsCarousel) {
  animation.animateReviewsCarousel();
}
