import axios from 'axios';
import * as config from './config';
import { filterAssets } from './asset';
import { getBlogs } from './blog';

export const switchLang = async (language, href) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/select-language',
      data: { language },
    });
    if (res.data.status === 'success') {
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
        getBlogs(JSON.parse(localStorage.getItem(config.PAGE_NUMBER_KEY)), JSON.parse(localStorage.getItem(config.RES_PER_PAGE_KEY)));
      } else {
        window.location.href = href;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

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
