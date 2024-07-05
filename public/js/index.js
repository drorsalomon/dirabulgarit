import { filterAssets } from './asset';
import { getFavoriteAssets } from './favoriteAssets';
import { displayMap } from './mapbox';
import * as config from './config';
import * as utils from './utils';
import * as animation from './animation';

window.onload = function () {
  // Widgets
  if (config.Elements.whatsappWidget) {
    const href = window.location.href;
    const enableWidget = document.getElementById('enable-toolbar-trigger');
    const enableWidgetIcon = document.getElementById('enable-toolbar-trigger-svg');
    if (href.includes('asset') || href.includes('project')) {
      if (window.innerWidth >= 300 && window.innerWidth < 576) {
        config.Elements.whatsappWidget.style.display = 'block';
        config.Elements.whatsappWidget.style.bottom = '250px';

        enableWidget.style.display = 'block';
        enableWidget.style.top = '-230px';
        enableWidget.style.left = '-3px !important';
        enableWidgetIcon.style.height = '40px';
        enableWidgetIcon.style.width = '40px';
      } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
        config.Elements.whatsappWidget.style.display = 'block';
        config.Elements.whatsappWidget.style.bottom = '255px';

        enableWidget.style.display = 'block';
        enableWidget.style.left = '-3px !important';
        enableWidgetIcon.style.height = '50px';
        enableWidgetIcon.style.width = '50px';
      } else if (window.innerWidth >= 768) {
        config.Elements.whatsappWidget.style.display = 'block';
        config.Elements.whatsappWidget.style.bottom = '160px';

        enableWidget.style.display = 'block';
        enableWidget.style.top = '-145px';
        enableWidget.style.left = '-3px !important';
        enableWidgetIcon.style.height = '50px';
        enableWidgetIcon.style.width = '50px';
      }
    } else {
      if (window.innerWidth >= 300 && window.innerWidth < 576) {
        config.Elements.whatsappWidget.style.display = 'block';
        config.Elements.whatsappWidget.style.bottom = '35px';

        enableWidget.style.display = 'block';
        enableWidget.style.top = '-15px';
        enableWidgetIcon.style.height = '40px';
        enableWidgetIcon.style.width = '40px';
      } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
        config.Elements.whatsappWidget.style.display = 'block';
        config.Elements.whatsappWidget.style.bottom = '35px';

        enableWidget.style.display = 'block';
        enableWidget.style.top = '-15px';
        enableWidgetIcon.style.height = '50px';
        enableWidgetIcon.style.width = '50px';
      } else if (window.innerWidth >= 768) {
        config.Elements.whatsappWidget.style.display = 'block';
        config.Elements.whatsappWidget.style.bottom = '35px';

        enableWidget.style.display = 'block';
        enableWidget.style.top = '-15px';
        enableWidgetIcon.style.height = '50px';
        enableWidgetIcon.style.width = '50px';
      }
    }
  }
  // If currency isn't set or currency is Euro
  if (!JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) || JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === config.DEFAULT_CURRENCY) {
    // Set default currency
    if (!JSON.parse(localStorage.getItem(config.CURRENCY_KEY))) {
      localStorage.setItem(config.CURRENCY_KEY, JSON.stringify(config.DEFAULT_CURRENCY));
    }
    utils.switchCurrencyIconsSrc();
    utils.switchAssetPriceCurrency();
    utils.switchSearchPriceCurrencyHtmlOnLoad(config.Elements.priceInput);
  }
  // If currency is Nis
  else if (JSON.parse(localStorage.getItem(config.CURRENCY_KEY)) === config.NIS_CURRENCY) {
    utils.switchCurrencyIconsSrc(false);
    utils.switchAssetPriceCurrency(false);
    utils.switchSearchPriceCurrencyHtmlOnLoad(config.Elements.priceInput, false);
  }

  // Header dropdown menu click (project catalog)
  let dropdownSubmenus = document.querySelectorAll('.projects-dropdown .dropdown-toggle');
  dropdownSubmenus.forEach(function (dropdownToggle) {
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

  // Set 'active-link' class on navbar links every time the page is loaded
  let href = window.location.href;
  href = href.substring(href.lastIndexOf('/') + 1);
  // For homepage link
  if (!href && !config.Elements.homePageLink.classList.contains('active-link')) {
    config.Elements.homePageLink.classList.toggle('active-link');
  }
  config.Elements.activeNavLinks.forEach((link) => {
    let linkString = link.toString();
    if (linkString.includes(href) && href) {
      link.classList.toggle('active-link');
      if ((href && href.includes('search-results')) || linkString.includes('search') || linkString.includes('project')) {
        config.Elements.assetCatalogDdBtn.classList.toggle('active-link');
      }
      if (href && linkString.includes('project')) config.Elements.projectsDdBtn.classList.toggle('active-link');
    }
  });

  // Search from and search modal user input
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

// Set 'offcanvas-active-link' class on offcanvas links every time the offcanvas toggler is clicked
if (config.Elements.navbarToggler)
  config.Elements.navbarToggler.addEventListener('click', async (e) => {
    e.preventDefault();
    let href = window.location.href;
    let subHref = href.substring(href.lastIndexOf('/') - 7);
    href = href.substring(href.lastIndexOf('/') + 1);
    config.Elements.assetCatalogDdBtn.classList.remove('offcanvas-active-link');
    config.Elements.projectsDdBtn.classList.remove('offcanvas-active-link');
    // For homepage link
    if (!href && !config.Elements.homePageLink.classList.contains('offcanvas-active-link')) {
      config.Elements.homePageLink.classList.remove('active-link');
      config.Elements.homePageLink.classList.toggle('offcanvas-active-link');
    }
    config.Elements.activeNavLinks.forEach((link) => {
      let linkString = link.toString();
      link.style.color = 'white';
      if (href && linkString.includes(href) && !link.classList.contains('offcanvas-active-link')) {
        link.classList.toggle('offcanvas-active-link');
        link.classList.toggle('active-link');
      }
      if ((href && href.includes('search-results')) || href.includes('search') || subHref.includes('project')) {
        config.Elements.assetCatalogDdBtn.classList.remove('active-link');
        config.Elements.assetCatalogDdBtn.classList.add('offcanvas-active-link');
      }
      if (href && subHref.includes('project')) {
        config.Elements.projectsDdBtn.classList.remove('active-link');
        config.Elements.projectsDdBtn.classList.add('offcanvas-active-link');
      }
    });
  });

// Currency switch on large screen
if (config.Elements.notActiveCurrencyIcon)
  config.Elements.notActiveCurrencyIcon.addEventListener('click', async (e) => {
    utils.switchCurrency(config.Elements.notActiveCurrencyIcon.src);
  });

if (config.Elements.mobileNotActiveCurrencyIcon)
  config.Elements.mobileNotActiveCurrencyIcon.addEventListener('click', async (e) => {
    utils.switchCurrency(config.Elements.mobileNotActiveCurrencyIcon.src);
    config.Elements.mobileCurrencyDdBtn.click();
  });

if (config.Elements.favoriteBtn)
  config.Elements.favoriteBtn.addEventListener('click', async (e) => {
    getFavoriteAssets(JSON.parse(localStorage.getItem(config.FAVORITE_KEY)));
  });

if (config.Elements.mobileFavoriteBtn)
  config.Elements.mobileFavoriteBtn.addEventListener('click', async (e) => {
    getFavoriteAssets(JSON.parse(localStorage.getItem(config.FAVORITE_KEY)));
  });

if (config.Elements.assetFavoriteBtn)
  config.Elements.assetFavoriteBtn.forEach((el) => {
    el.addEventListener('click', function (e) {
      if (config.Elements.assetId) {
        const assetId = config.Elements.assetId.textContent;
        config.Elements.assetFavoriteIcon.forEach((icon) => {
          if (icon.src.includes(config.assetFavoriteIconOutlineSrc)) {
            utils.addToFavorite(assetId);
            icon.src = config.assetFavoriteIconFullSrc;
          } else {
            utils.removeFromFavorite(assetId);
            icon.src = config.assetFavoriteIconOutlineSrc;
          }
        });
      }
    });
  });

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

// CTA Button to Calendly
if (config.Elements.toCalendlyBtn)
  config.Elements.toCalendlyBtn.forEach((el) => {
    el.addEventListener('click', function (e) {
      window.location.pathname = '/contact-us';
    });
  });

// To About btn
if (config.Elements.toAboutBtn)
  config.Elements.toAboutBtn.addEventListener('click', function (e) {
    window.location.pathname = '/about';
  });

// To blog btn
if (config.Elements.toBlogBtn)
  config.Elements.toBlogBtn.addEventListener('click', function (e) {
    window.location.pathname = '/blog';
  });

// Invest guide btn
if (config.Elements.investGuideBtn)
  config.Elements.investGuideBtn.addEventListener('click', function (e) {
    window.location.pathname = '/invest';
  });

// Back to search results from asset page
if (config.Elements.backToSearchResultsBtn)
  config.Elements.backToSearchResultsBtn.addEventListener('click', function (e) {
    window.history.go(-1);
  });

// Error 404 Page Button
if (config.Elements.errorBtn)
  config.Elements.errorBtn.addEventListener('click', function (e) {
    window.location.pathname = '/';
  });

// Asset Card
if (config.Elements.assetCards) utils.getPageBySlug(config.Elements.assetCards, 'asset');

// Main Page Blog Buttons
if (config.Elements.mainPageBlogBtn) utils.getPageBySlug(config.Elements.mainPageBlogBtn, 'blog');

// Blog Cards
if (config.Elements.blogCards) utils.getPageBySlug(config.Elements.blogCards, 'blog');

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

// Search Form
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
    if (parseInt(el.dataset.page) === JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY))) {
      el.classList.add('pagination-btn-active');
    }
    el.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(parseInt(el.dataset.page)));

      filterAssets(
        JSON.parse(localStorage.getItem(config.FILTER_KEY)),
        JSON.parse(localStorage.getItem(config.SORT_KEY)),
        JSON.parse(localStorage.getItem(config.TYPE_KEY)),
        JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
        JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
      );
    });
  });

if (config.Elements.paginationPrevPageBtn && config.Elements.paginationNextPageBtn) {
  if (JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) === config.DEFAULT_PAGE_NUM) {
    config.Elements.paginationPrevPageBtn.disabled = true;

    config.Elements.paginationNextPageBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) + 1));

      filterAssets(
        JSON.parse(localStorage.getItem(config.FILTER_KEY)),
        JSON.parse(localStorage.getItem(config.SORT_KEY)),
        JSON.parse(localStorage.getItem(config.TYPE_KEY)),
        JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
        JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
      );
    });
  } else if (JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) === parseInt(config.Elements.paginationNextPageBtn.dataset.lastpage)) {
    config.Elements.paginationNextPageBtn.disabled = true;

    config.Elements.paginationPrevPageBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      localStorage.setItem(config.PAGE_NUMBER_KEY, JSON.stringify(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)) - 1));
      filterAssets(
        JSON.parse(localStorage.getItem(config.FILTER_KEY)),
        JSON.parse(localStorage.getItem(config.SORT_KEY)),
        JSON.parse(localStorage.getItem(config.TYPE_KEY)),
        JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
        JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
      );
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
        filterAssets(
          JSON.parse(localStorage.getItem(config.FILTER_KEY)),
          JSON.parse(localStorage.getItem(config.SORT_KEY)),
          JSON.parse(localStorage.getItem(config.TYPE_KEY)),
          JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
          JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
        );
      });
    });
  }
}

if (config.Elements.contactUsForm)
  config.Elements.contactUsForm.addEventListener(
    'submit',
    function (event) {
      if (!config.Elements.contactUsForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      config.Elements.contactUsForm.classList.add('was-validated');
    },
    false,
  );

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

// Scroll event listener for animations
if (window.innerWidth >= 992) {
  document.addEventListener('scroll', () => {
    animation.debounce(animation.handleScroll());
  });
}

// Counter animation
// Atlantis Aria 2
if (config.Elements.aa2ProjectApartmentsNumber) animation.animateCounter(config.Elements.aa2ProjectApartmentsNumber, 159);
if (config.Elements.aa2ProjectParkingSpotsNumber) animation.animateCounter(config.Elements.aa2ProjectParkingSpotsNumber, 174);
// Atlantis Aria 3
if (config.Elements.aa3ProjectBuildingsNumber) animation.animateCounter(config.Elements.aa3ProjectBuildingsNumber, 3);
if (config.Elements.aa3ProjectFloorsNumber) animation.animateCounter(config.Elements.aa3ProjectFloorsNumber, 9);
if (config.Elements.aa3ProjectApartmentsNumber) animation.animateCounter(config.Elements.aa3ProjectApartmentsNumber, 210);
if (config.Elements.aa3ProjectParkingSpotsNumber) animation.animateCounter(config.Elements.aa3ProjectParkingSpotsNumber, 250);
// Atlantis Euphoria
if (config.Elements.aeProjectBuildingsNumber) animation.animateCounter(config.Elements.aeProjectBuildingsNumber, 6);
if (config.Elements.aeProjectFloorsNumber) animation.animateCounter(config.Elements.aeProjectFloorsNumber, 9);
if (config.Elements.aeProjectApartmentsNumber) animation.animateCounter(config.Elements.aeProjectApartmentsNumber, 292);
if (config.Elements.aeProjectParkingSpotsNumber) animation.animateCounter(config.Elements.aeProjectParkingSpotsNumber, 320);
if (config.Elements.aeProjectAreaNumber) animation.animateCounter(config.Elements.aeProjectAreaNumber, 27955, 'מ"ר');
if (config.Elements.aeProjectGreenAreaNumber) animation.animateCounter(config.Elements.aeProjectGreenAreaNumber, 5200, 'מ"ר');
// Atlantis Barcode
if (config.Elements.abProjectBuildingsNumber) animation.animateCounter(config.Elements.abProjectBuildingsNumber, 2);
if (config.Elements.abProjectFloorsNumber) animation.animateCounter(config.Elements.abProjectFloorsNumber, 8);
if (config.Elements.abProjectApartmentsNumber) animation.animateCounter(config.Elements.abProjectApartmentsNumber, 93);
if (config.Elements.abProjectParkingSpotsNumber) animation.animateCounter(config.Elements.abProjectParkingSpotsNumber, 106);
if (config.Elements.abProjectAreaNumber) animation.animateCounter(config.Elements.abProjectAreaNumber, 9634, 'מ"ר');
// Atlantis L6
if (config.Elements.al6ProjectBuildingsNumber) animation.animateCounter(config.Elements.al6ProjectBuildingsNumber, 3);
if (config.Elements.al6ProjectFloorsNumber) animation.animateCounter(config.Elements.al6ProjectFloorsNumber, 9);
if (config.Elements.al6ProjectApartmentsNumber) animation.animateCounter(config.Elements.al6ProjectApartmentsNumber, 183);
if (config.Elements.al6ProjectParkingSpotsNumber) animation.animateCounter(config.Elements.al6ProjectParkingSpotsNumber, 181);
if (config.Elements.al6ProjectAreaNumber) animation.animateCounter(config.Elements.al6ProjectAreaNumber, 19063, 'מ"ר');
if (config.Elements.al6ProjectGreenAreaNumber) animation.animateCounter(config.Elements.al6ProjectGreenAreaNumber, 16187, 'מ"ר');
// Fade in animation
if (config.Elements.hotAssetsContainer || config.Elements.projectAssetsContainer) {
  animation.animateFadeIn(config.Elements.assetCards);
} else if (config.Elements.searchResultsContainer || config.Elements.relatedAssetsContainer) {
  config.Elements.assetCards.forEach((card) => {
    card.style.opacity = 1;
  });
}
