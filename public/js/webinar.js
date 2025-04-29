import axios from 'axios';
import * as config from './config';
import { showAlert } from './alerts';

export const webinarRegistration = async (userName, userPhone, userEmail, userIsSubscribed) => {
  try {
    const urlParams = `${userName}/${userPhone}/${userEmail}/${userIsSubscribed}`;

    const res = await axios({
      method: 'POST',
      url: `/user/webinar-registration/${urlParams}`,
    });
    if (res.data.status === 'success') {
      window.location.href = `${config.baseDevUrl}user/webinar-registered`;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
