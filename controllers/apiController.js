const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const processedEvents = new Set();

exports.getCalendlyLead = catchAsync(async (req, res) => {
  try {
    // Extract event URI from the request body
    const eventUri = req.body.payload.uri;

    // Check if the event has already been processed
    if (processedEvents.has(eventUri) && !req.body.payload.cancellation) {
      console.log(`Event with URI ${eventUri} has already been processed. Ignoring.`);
      return res.status(200).json({ status: 'success' }); // Respond with success status
    }

    // Mark the event as processed
    processedEvents.add(eventUri);

    const calendlyLeadName = req.body.payload.name;
    const calendlyLeadEmail = req.body.payload.email;
    const calendlyLeadQuestions = req.body.payload.questions_and_answers;
    const calendlyLeadEventTime = req.body.payload.scheduled_event.start_time;

    // Map the Calendly data to Zoho CRM Lead fields
    const leadData = {
      data: [
        {
          Last_Name: calendlyLeadName,
          Email: calendlyLeadEmail,
          Phone: calendlyLeadQuestions[0].answer,
          Description: `Meeting time: ${calendlyLeadEventTime} /// Additional Information: ${calendlyLeadQuestions[1] === undefined ? '-' : calendlyLeadQuestions[1].answer}`,
          Lead_Source: 'Calendly',
          Lead_Status: 'Active - Meeting Set',
        },
      ],
    };

    if (req.body.payload.cancellation) {
      const response = await axios({
        method: 'GET',
        url: process.env.ZOHO_GET_LEAD_URL,
        headers: {
          Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      const leadsArray = response.data.data;
      let leadID = '';

      for (lead of leadsArray) {
        if (lead.Last_Name === calendlyLeadName && lead.Email === calendlyLeadEmail && lead.Phone === calendlyLeadQuestions[0].answer) leadID = lead.id;
      }

      if (!leadID) {
        console.error('Lead ID not found.');
        return res.status(404).json({ status: 'error', message: 'Lead not found' });
      }

      console.log(`Updating lead with ID: ${leadID}`);

      await axios({
        method: 'PUT',
        url: `${process.env.ZOHO_URL}/${leadID}`,
        data: {
          data: [
            {
              id: leadID,
              Lead_Status: 'Meeting Canceled',
            },
          ],
        },
        headers: {
          Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      return res.status(200).json({ status: 'success' });
    }

    // Send a POST request to Zoho CRM to create a new lead
    await axios({
      method: 'POST',
      url: process.env.ZOHO_URL,
      data: leadData,
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error creating lead in Zoho CRM:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    console.error('Stack:', error.stack);
    res.status(500).send('Internal Server Error');
  }
});
