import axios from 'axios';

export const switchLang = async (language, href) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/select-language',
      data: { language },
    });
    if (res.data.status === 'success') {
      window.location.href = href;
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
