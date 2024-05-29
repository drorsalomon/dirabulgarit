export const Elements = {
  // Buttons
  ctaBtn: document.querySelectorAll('.btn-cta'),
  ctaBtnWhite: document.querySelectorAll('.btn-cta-white'),
  pricingCtaBtn: document.querySelector('.pricing-cta-btn'),
  investGuideBtn: document.querySelector('.invest-guide-btn'),
  shareBtn: document.querySelector('.share-btn'),
  backToSearchResultsBtn: document.querySelector('.asset-back-to-results-btn'),
  errorBtn: document.querySelector('.error-btn'),
  // Navbar
  activeNavLinks: document.querySelectorAll('.nav-link'),
  navbarToggler: document.querySelector('.navbar-toggler'),
  homePageLink: document.querySelector('.homepage-link'),
  currencyDdBtn: document.querySelector('.currency-dropdown-btn'),
  currencyIcon: document.querySelectorAll('.navbar-currency-icon'),
  activeCurrencyIcon: document.querySelector('.navbar-active-currency-icon'),
  notActiveCurrencyIcon: document.querySelector('.navbar-not-active-currency-icon'),
  mobileNotActiveCurrencyIcon: document.querySelector('.mobile-navbar-not-active-currency-icon'),
  mobileActiveCurrencyIcon: document.querySelector('.mobile-navbar-active-currency-icon'),
  // Search Form
  searchForm: document.querySelector('.search-form'),
  searchDdBtn: document.querySelectorAll('.search-filter-dropdown--btn'),
  searchDdBtnCity: document.querySelector('.search-filter-dd--btn__city'),
  searchDdBtnRooms: document.querySelector('.search-filter-dd--btn__rooms'),
  searchDdBtnType: document.querySelector('.search-filter-dd--btn__type'),
  searchDdBtnProject: document.querySelector('.search-filter-dd--btn__project'),
  searchDdBtnOceanView: document.querySelector('.search-filter-dd--btn__oceanView'),
  searchDdBtnPrice: document.querySelector('.search-filter-dd--btn__price'),
  searchFilterBtn: document.querySelectorAll('.search-filter-options--btn'),
  searchFilterBtnCity: document.querySelectorAll('.search-filter--btn__city'),
  searchFilterBtnRooms: document.querySelectorAll('.search-filter--btn__rooms'),
  searchFilterBtnType: document.querySelectorAll('.search-filter--btn__type'),
  searchFilterBtnProject: document.querySelectorAll('.search-filter--btn__project'),
  searchFilterBtnOceanView: document.querySelectorAll('.search-filter--btn__oceanView'),
  searchInput: document.querySelectorAll('.search-input'),
  priceInput: document.querySelectorAll('.price-input'),
  priceInputMin: document.querySelector('.search-price-input-min'),
  priceInputMax: document.querySelector('.search-price-input-max'),
  searchInputId: document.querySelector('.search-input__id'),
  searchInputName: document.querySelector('.search-input__name'),
  searchClearFilters: document.querySelectorAll('.clear-search--text'),
  // Search Modal Form
  searchModalOpenBtn: document.querySelector('.search-modal-open-btn'),
  modalSearchForm: document.querySelector('.modal-search-form'),
  modalSearchFilterBtnCity: document.querySelectorAll('.modal-search-filter--btn__city'),
  modalSearchFilterBtnRooms: document.querySelectorAll('.modal-search-filter--btn__rooms'),
  modalSearchFilterBtnType: document.querySelectorAll('.modal-search-filter--btn__type'),
  modalSearchFilterBtnProject: document.querySelectorAll('.modal-search-filter--btn__project'),
  modalSearchFilterBtnOceanView: document.querySelectorAll('.modal-search-filter--btn__oceanView'),
  modalPriceInputMin: document.querySelector('.modal-search-price-input-min'),
  modalPriceInputMax: document.querySelector('.modal-search-price-input-max'),
  modalSearchInputId: document.querySelector('.modal-search-input__id'),
  modalSearchInputName: document.querySelector('.modal-search-input__name'),
  // Search Results
  searchResultsFiltersDdBtn: document.querySelector('.search-results-filters-sort--btn'),
  searchResultsFilters: document.querySelectorAll('.search-results-filters'),
  // Pagination
  paginationPrevPageBtn: document.querySelector('.pagination-prev-page-btn'),
  paginationNextPageBtn: document.querySelector('.pagination-next-page-btn'),
  paginationIconBtn: document.querySelectorAll('.pagination-icon-btn'),
  paginationPageBtn: document.querySelectorAll('.pagination-page-btn'),
  // Asset Page
  assetCards: document.querySelectorAll('.asset-card'),
  assetMainImg: document.querySelector('.asset-gallery-mainImage'),
  assetThumbnailImgs: document.querySelectorAll('.asset-gallery-thumbnail'),
  assetModalMainImg: document.querySelector('.asset-gallery-mainImage-modal'),
  carouselInner: document.querySelector('.carousel-inner'),
  mapBox: document.getElementById('map'),
  assetPrice: document.querySelectorAll('.asset-price'),
  // Blog
  blogCards: document.querySelectorAll('.blog-card'),
};

export const CURRENCY_KEY = 'currency';
export const DEFAULT_CURRENCY = 'euro';
export const NIS_CURRENCY = 'nis';

export const SORT_KEY = 'sort';
export const TYPE_KEY = 'type';
export const PAGE_NUMBER_KEY = 'pageNumber';
export const RES_PER_PAGE_KEY = 'resPerPage';
export const FILTER_KEY = 'filter';

export const DEFAULT_SORT = 'price';
export const DEFAULT_TYPE = 1;
export const DEFAULT_PAGE_NUM = 1;
export const DEFAULT_RES_PER_PAGE = 16;
export const DEFAULT_FILTER = {};
