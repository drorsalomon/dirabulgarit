import axios from 'axios';
import * as config from './config';

export const generatePDF = async (pdfData) => {
  config.Elements.spinnerContainer.style.display = 'flex';
  try {
    const res = await axios({
      method: 'POST',
      url: '/asset/generate-pdf',
      data: pdfData,
    });

    if (res.status === 200) {
      console.log('PDF generation successful');

      // Open the generated PDF URL in a new tab
      const pdfUrl = res.data.pdfUrl;
      window.open(pdfUrl, '_blank');
    } else {
      console.error('Unexpected response status:', res.status);
    }
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    // Hide the spinner after the request completes
    config.Elements.spinnerContainer.style.display = 'none';
  }
};
