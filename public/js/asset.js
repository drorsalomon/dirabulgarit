import axios from 'axios';
import * as config from './config';

export const filterAssets = async (filter, sort, type, pageNumber, resPerPage) => {
  try {
    const urlParams = `${sort}/${type}/${pageNumber}/${resPerPage}`;

    const res = await axios({
      method: 'POST',
      url: `/asset/search/${urlParams}`,
      data: { filter },
    });
    if (res.data.status === 'success') {
      const totalAssets = res.data.data.totalAssets;
      const totalPages = res.data.data.totalPages;
      const pageNumber = res.data.data.pageNumber;
      window.location.href =
        JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE
          ? `/asset/search-results?sort=${sort}&type=${type}&totalAssets=${totalAssets}&totalPages=${encodeURIComponent(JSON.stringify(totalPages))}&pageNumber=${pageNumber}`
          : `${config.baseDevUrl}${JSON.parse(localStorage.getItem(config.LANGUAGE_KEY))}/asset/search-results?sort=${sort}&type=${type}&totalAssets=${totalAssets}&totalPages=${encodeURIComponent(JSON.stringify(totalPages))}&pageNumber=${pageNumber}`;
    }
  } catch (err) {
    console.log(err);
  }
};
