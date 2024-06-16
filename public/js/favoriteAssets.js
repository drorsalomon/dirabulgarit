import axios from 'axios';

export const getFavoriteAssets = async (favoriteAssets) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/asset/get-favorite-assets',
      data: { favoriteAssets },
    });
    if (res.data.status === 'success') {
      window.location.href = '/asset/favorite-assets';
    }
  } catch (err) {
    console.log(err);
  }
};
