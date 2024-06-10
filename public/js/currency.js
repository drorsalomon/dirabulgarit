import axios from 'axios';
import * as config from './config';

export const setCurrency = async (activeCurrency, notActiveCurrency) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/${activeCurrency}`,
      data: { activeCurrency, notActiveCurrency },
    });
    if (res.data.status === 'success') {
      const currency = res.data.data.currency;
      const currencySymbol = currency.active === 'euro' ? '€' : '₪';
      if (config.Elements.assetPrice)
        config.Elements.assetPrice.forEach((el) => {
          if (currencySymbol === '₪') {
            el.innerText = el.dataset.nisprice;
          } else {
            el.innerText = el.dataset.europrice;
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
};
