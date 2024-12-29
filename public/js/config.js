export const Elements = {
  // Widgets
  whatsappWidget: document.querySelector('.whatsapp-widget-container'),
  enableWidget: document.getElementById('enable-toolbar-trigger'),
  // Buttons
  toContactUsBtn: document.querySelectorAll('.to-calendly-btn'),
  ctaBtnWhite: document.querySelectorAll('.btn-cta-white'),
  pricingCtaBtn: document.querySelector('.pricing-cta-btn'),
  investGuideBtn: document.querySelector('.invest-guide-btn'),
  toAboutBtn: document.querySelector('.to-about-btn'),
  mainPageBlogBtn: document.querySelectorAll('.mainpage-blog-card-btn '),
  toBlogBtn: document.querySelector('.to-blog-btn'),
  shareBtn: document.querySelector('.share-btn'),
  shareBtnWhite: document.querySelectorAll('.share-btn-white'),
  backToSearchResultsBtn: document.querySelector('.asset-back-to-results-btn'),
  errorBtn: document.querySelector('.error-btn'),
  // Spinner
  spinnerContainer: document.querySelector('.spinner-container'),
  // Navbar
  activeNavLinks: document.querySelectorAll('.nav-link'),
  navbarToggler: document.querySelector('.navbar-toggler'),
  homePageLink: document.querySelector('.homepage-link'),
  assetCatalogDdBtn: document.querySelector('.assets-catalog-dropdown-btn'),
  projectsDdBtn: document.querySelector('.projects-dropdown-btn'),
  projectBurgasDdBtn: document.querySelector('.project-burgas-dropdown-btn'),
  projectSofiaDdBtn: document.querySelector('.project-sofia-dropdown-btn'),
  projectSvetiDdBtn: document.querySelector('.project-sveti-dropdown-btn'),
  commercialDdBtn: document.querySelector('.commercial-dropdown-btn'),
  blogLink: document.querySelector('.blog-nav-link'),
  currencyDdBtn: document.querySelector('.currency-dropdown-btn'),
  currencyIcon: document.querySelectorAll('.navbar-currency-icon'),
  activeCurrencyIcon: document.querySelector('.navbar-active-currency-icon'),
  notActiveCurrencyIcon: document.querySelector('.navbar-not-active-currency-icon'),
  mobileCurrencyDdBtn: document.querySelector('.mobile-currency-dropdown-btn'),
  mobileActiveCurrencyIcon: document.querySelector('.mobile-navbar-active-currency-icon'),
  mobileNotActiveCurrencyIcon: document.querySelector('.mobile-navbar-not-active-currency-icon'),
  langDdBtn: document.querySelector('.lang-dropdown-btn'),
  langIcon: document.querySelector('.navbar-lang-icon'),
  activeLangIcon: document.querySelector('.navbar-active-lang-icon'),
  notActiveLangIcon: document.querySelector('.navbar-not-active-lang-icon'),
  mobileLangDdBtn: document.querySelector('.mobile-lang-dropdown-btn'),
  mobileActiveLangIcon: document.querySelector('.mobile-navbar-active-lang-icon'),
  mobileNotActiveLangIcon: document.querySelector('.mobile-navbar-not-active-lang-icon'),
  favoriteBtn: document.querySelector('.asset-favorite-btn'),
  mobileFavoriteBtn: document.querySelector('.mobile-asset-favorite-btn'),
  // Overview
  heroHeadline: document.querySelector('.hero-headline'),
  heroText: document.querySelector('.hero-text'),
  heroIcons: document.querySelector('.hero-icons-row'),
  hotAssetsContainer: document.querySelector('.mainpage-hot-assets-container'),
  // Footer
  footerContainer: document.querySelector('.footer-container'),
  footerCopyContainer: document.querySelector('.footer-copyright-text'),
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
  searchResultsContainer: document.querySelectorAll('.search-results-container'),
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
  assetId: document.querySelector('.asset-details-id'),
  assetName: document.querySelector('.asset-headline'),
  assetPrice: document.querySelectorAll('.asset-price'),
  assetProject: document.querySelector('.asset-details-project'),
  assetCity: document.querySelector('.asset-details-city'),
  assetType: document.querySelector('.asset-details-type'),
  assetSm: document.querySelector('.asset-details-sm'),
  assetOceanView: document.querySelector('.asset-details-oceanView'),
  assetRooms: document.querySelector('.asset-details-rooms'),
  assetBedrooms: document.querySelector('.asset-details-bedrooms'),
  assetBathrooms: document.querySelector('.asset-details-bathrooms'),
  assetTerraces: document.querySelector('.asset-details-terraces'),
  assetFloor: document.querySelector('.asset-details-floor'),
  assetParking: document.querySelector('.asset-details-parking'),
  assetWindDirections: document.querySelector('.asset-details-windDirections'),
  assetReadiness: document.querySelector('.asset-details-readiness'),
  assetMaintenanceFee: document.querySelector('.asset-details-maintenanceFee'),
  assetFurnished: document.querySelector('.asset-details-furnished'),
  assetYearBuilt: document.querySelector('.asset-details-yearBuilt'),
  assetDescription: document.querySelectorAll('.asset-details-description'),
  assetAmenities: document.querySelectorAll('.asset-amenity'),
  assetFavoriteBtn: document.querySelectorAll('.asset-favorite-btn-white'),
  assetFavoriteIcon: document.querySelectorAll('.favorite-btn-icon'),
  assetPdfBtn: document.querySelectorAll('.asset-pdf-btn'),
  relatedAssetsContainer: document.querySelectorAll('.asset-related-assets-container'),
  // Blog
  blogCards: document.querySelectorAll('.blog-card'),
  // Contact Us
  contactUsContainerFixed: document.querySelector('.contact-us-container-fixed'),
  contactUsMobileContainerFixed: document.querySelector('.contact-us-mobile-fixed-container'),
  contactUsExpandBtnContainer: document.querySelector('.contact-us-fixed-expand-container'),
  contactUsExpandBtn: document.querySelectorAll('.contact-us-fixed-expand-btn-container'),
  contactUsCloseBtnFixed: document.querySelectorAll('.close-contact-us-fixed-btn'),
  contactUsForm: document.querySelectorAll('.contact-us-form'),
  contactUsNameInput: document.querySelector('.contact-us-name-input'),
  contactUsPhoneInput: document.querySelector('.contact-us-phone-input'),
  contactUsEmailInput: document.querySelector('.contact-us-email-input'),
  contactUsDescriptionInput: document.querySelector('.contact-us-description-input'),
  contactUsPhoneInvalid: document.querySelector('.contact-us-phone-invalid '),
  contactUsEmailInvalid: document.querySelector('.contact-us-email-invalid '),
  calendlyAgentsBtn: document.querySelector('.calendly-agents-button'),
  calendlyAgentsChoices: document.querySelectorAll('.calendly-agents-choice'),
  calendlyWidgetYeheli: document.querySelector('.calendly-widget-yeheli'),
  calendlyWidgetShimon: document.querySelector('.calendly-widget-shimon'),
  calendlyAgentYeheli: document.querySelector('.calendly-agent-yeheli'),
  calendlyAgentShimon: document.querySelector('.calendly-agent-shimon'),
  // Webinar
  webinarForm: document.querySelector('.webinar-form'),
  webinarFormInputName: document.querySelector('.webinar-input-name'),
  webinarFormInputPhone: document.querySelector('.webinar-input-phone'),
  webinarFormInputEmail: document.querySelector('.webinar-input-email'),
  webinarFormCheck: document.querySelector('.webinar-form-check'),
  webinarFormBtn: document.querySelector('.landing-webinar-button'),
  // PROJECTS
  projectAssetsContainer: document.querySelector('.project-assets-container'),
  // Atlantis Aria 2
  aa2ProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-atlantis-aria-2'),
  aa2ProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-atlantis-aria-2'),
  // Atlantis Aria 3
  aa3ProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-atlantis-aria-3'),
  aa3ProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-atlantis-aria-3'),
  aa3ProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-atlantis-aria-3'),
  aa3ProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-atlantis-aria-3'),
  // Atlantis Euphoria
  aeProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-atlantis-euphoria'),
  aeProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-atlantis-euphoria'),
  aeProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-atlantis-euphoria'),
  aeProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-atlantis-euphoria'),
  aeProjectAreaNumber: document.querySelector('.project-numbers-area-number-atlantis-euphoria'),
  aeProjectGreenAreaNumber: document.querySelector('.project-numbers-green-area-number-atlantis-euphoria'),
  // Atlantis Barcode
  abProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-atlantis-barcode'),
  abProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-atlantis-barcode'),
  abProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-atlantis-barcode'),
  abProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-atlantis-barcode'),
  abProjectAreaNumber: document.querySelector('.project-numbers-area-number-atlantis-barcode'),
  // Atlantis Barcode 2
  ab2ProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-atlantis-barcode-2'),
  ab2ProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-atlantis-barcode-2'),
  ab2ProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-atlantis-barcode-2'),
  ab2ProjectAreaNumber: document.querySelector('.project-numbers-area-number-atlantis-barcode-2'),
  // Atlas Azimuth
  azimuthProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-atlas-azimuth'),
  azimuthProjectCommercialNumber: document.querySelector('.project-numbers-commercial-number-atlas-azimuth'),
  azimuthProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-atlas-azimuth'),
  azimuthProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-atlas-azimuth'),
  azimuthProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-atlas-azimuth'),
  azimuthProjectAreaNumber: document.querySelector('.project-numbers-area-number-atlas-azimuth'),
  // Villa Margarita
  villaMargaritaProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-villa-margarita'),
  villaMargaritaProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-villa-margarita'),
  villaMargaritaProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-villa-margarita'),
  // Mellia Florance
  melliaFloranceProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-mellia-florance'),
  melliaFloranceProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-mellia-florance'),
  melliaFloranceProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-mellia-florance'),
  // Mountain View Residence
  mountainResidenceProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-mountain-residence'),
  mountainResidenceProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-mountain-residence'),
  mountainResidenceProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-mountain-residence'),
  mountainResidenceProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-mountain-residence'),
  // Vitosah Mountain View
  mountainViewProjectBuildingsNumber: document.querySelector('.project-numbers-buildings-number-mountain-view'),
  mountainViewProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-mountain-view'),
  mountainViewProjectApartmentsNumber: document.querySelector('.project-numbers-apartments-number-mountain-view'),
  mountainViewProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-mountain-view'),
  // Camelot
  camelotProjectPriceNumber: document.querySelector('.project-numbers-price-number-camelot'),
  camelotProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-camelot'),
  camelotProjectAssetsNumber: document.querySelector('.project-numbers-assets-number-camelot'),
  camelotProjectParkingSpotsNumber: document.querySelector('.project-numbers-parking-spots-number-camelot'),
  camelotProjectAreaNumber: document.querySelector('.project-numbers-area-number-camelot'),
  camelotProjectBuiltAreaNumber: document.querySelector('.project-numbers-built-area-number-camelot'),
  // Sofia B5
  sofiab5ProjectPriceNumber: document.querySelector('.project-numbers-price-number-sofia-b5'),
  sofiab5ProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-sofia-b5'),
  sofiab5ProjectAssetsNumber: document.querySelector('.project-numbers-assets-number-sofia-b5'),
  sofiab5ProjectStoresNumber: document.querySelector('.project-numbers-stores-number-sofia-b5'),
  sofiab5ProjectBuiltAreaNumber: document.querySelector('.project-numbers-built-area-number-sofia-b5'),
  // Samokov
  samokovProjectAreaNumber: document.querySelector('.project-numbers-area-number-samokov'),
  // Pomorie
  pomorieProjectPriceNumber: document.querySelector('.project-numbers-price-number-pomorie'),
  pomorieProjectFloorsNumber: document.querySelector('.project-numbers-floors-number-pomorie'),
  pomorieProjectBuiltAreaNumber: document.querySelector('.project-numbers-built-area-number-pomorie'),
};

export const baseDevUrl = 'http://127.0.0.1:8000/';
export const baseProdUrl = 'https://www.dirabulgarit.com/';

export const euroIconSrc = '/img/icons/euro.svg';
export const mobileEuroIconSrc = '/img/icons/euro-white.svg';
export const euroIconAlt = 'אייקון של מטבע היורו';
export const nisIconSrc = '/img/icons/nis.svg';
export const mobileNisIconSrc = '/img/icons/nis-white.svg';
export const nisIconAlt = 'אייקון של מטבע השקל';
export const CURRENCY_KEY = 'currency';
export const DEFAULT_CURRENCY = 'euro';
export const NIS_CURRENCY = 'nis';

export const heIconSrc = '/img/icons/flag-for-flag-israel-svgrepo-com.svg';
export const heIconAlt = 'אייקון של דגל ישראל';
export const enIconSrc = '/img/icons/flag-for-flag-united-states-svgrepo-com.svg';
export const enIconAlt = 'אייקון של דגל ארצות הברית';
export const LANGUAGE_KEY = 'language';
export const DEFAULT_LANGUAGE = 'he';
export const EN_LANGUAGE = 'en';

export const FAVORITE_KEY = 'favorite';
export const assetFavoriteIconOutlineSrc = '/img/icons/heart-empty-svgrepo-com-outline.svg';
export const assetFavoriteIconFullSrc = '/img/icons/heart-svgrepo-com-full.svg';

export const SORT_KEY = 'sort';
export const TYPE_KEY = 'type';
export const PAGE_NUMBER_KEY = 'pageNumber';
export const RES_PER_PAGE_KEY = 'resPerPage';
export const FILTER_KEY = 'filter';

export const DEFAULT_SORT = 'price';
export const DEFAULT_TYPE = 1;
export const DEFAULT_PAGE_NUM = 1;
export const DEFAULT_RES_PER_PAGE = 16;
export const DEFAULT_BLOG_RES_PER_PAGE = 10;
export const DEFAULT_FILTER = {};
