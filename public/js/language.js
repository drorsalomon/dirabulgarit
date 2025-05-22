import axios from 'axios';
import * as config from './config';
import { filterAssets } from './asset';
import { getBlogs } from './blog';
import debounce from 'lodash.debounce';

export const switchLang = debounce(async (language, href) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/select-language',
      data: { language },
    });
    if (res.data.status === 'success') {
      if (href.includes('asset/search-results')) {
        filterAssets(
          JSON.parse(localStorage.getItem(config.FILTER_KEY)),
          JSON.parse(localStorage.getItem(config.SORT_KEY)),
          JSON.parse(localStorage.getItem(config.TYPE_KEY)),
          JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)),
          JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)),
        );
      } else if (href.includes('blog')) {
        getBlogs(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)), JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)));
      } else {
        window.location.href = href; // Redirect for homepage
      }
    }
  } catch (err) {
    console.log(err);
  }
}, 300);

export const loadLang = async (language) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/select-language',
      data: { language },
    });
    if (res.data.status === 'success') {
    }
  } catch (err) {
    console.log(err);
  }
};
