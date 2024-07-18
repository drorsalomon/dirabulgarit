import axios from 'axios';
import * as config from './config';

export const getFavoriteAssets = async (favoriteAssets) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/asset/get-favorite-assets',
      data: { favoriteAssets },
    });
    if (res.data.status === 'success') {
      window.location.href =
        JSON.parse(localStorage.getItem(config.LANGUAGE_KEY)) === config.DEFAULT_LANGUAGE ? '/asset/favorite-assets' : '/en/asset/favorite-assets';
    }
  } catch (err) {
    console.log(err);
  }
};
