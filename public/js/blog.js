import axios from 'axios';
import * as config from './config';

export const getBlogs = async (pageNumber, resPerPage) => {
  try {
    const urlParams = `${pageNumber}/${resPerPage}`;

    const res = await axios({
      method: 'POST',
      url: `/blog/get-blogs/${urlParams}`,
    });
    if (res.data.status === 'success') {
      const data = {
        totalBlogs: res.data.data.totalBlogs,
        totalPages: res.data.data.totalPages,
        pageNumber: res.data.data.pageNumber,
      };

      localStorage.setItem('blogData', JSON.stringify(data));

      window.location.href =
        JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE
          ? `/blog`
          : `${config.baseProdUrl}${JSON.parse(localStorage.getItem(config.LANGUAGE_KEY))}/blog`;
    }
  } catch (err) {
    console.log(err);
  }
};
