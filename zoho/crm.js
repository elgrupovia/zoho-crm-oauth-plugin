const axios = require('axios');

const getContacts = async (access_token) => {
  const url = "https://www.zohoapis.com/crm/v2/Contacts";
  const response = await axios.get(url, {
    headers: { Authorization: `Zoho-oauthtoken ${access_token}` }
  });
  return response.data;
};

module.exports = { getContacts };
